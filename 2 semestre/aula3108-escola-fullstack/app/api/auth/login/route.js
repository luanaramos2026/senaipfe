import db from "../../../db/banco.js";
import {
    criarTokenSessao,
    DURACAO_SESSAO_SEGUNDOS,
    gerarHashToken,
    NOME_COOKIE_SESSAO,
} from "../../../lib/sessao.js";
import { verificarSenha } from "../../../lib/senhas.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const dados = await request.json();
        const usuario = typeof dados.usuario === "string" ? dados.usuario.trim() : "";
        const senha = typeof dados.senha === "string" ? dados.senha : "";

        if (!usuario || !senha) {
            return NextResponse.json(
                { erro: "Informe usuário e senha." },
                { status: 400 }
            );
        }

        const conta = db.prepare(`
            SELECT id_usuario, nome, senha_hash
            FROM usuarios
            WHERE usuario = ?
        `).get(usuario);

        if (!conta || !(await verificarSenha(senha, conta.senha_hash))) {
            return NextResponse.json(
                { erro: "Usuário ou senha inválidos." },
                { status: 401 }
            );
        }

        const token = criarTokenSessao();
        const expiraEm = Math.floor(Date.now() / 1000) + DURACAO_SESSAO_SEGUNDOS;
        db.prepare(`
            INSERT INTO sessoes (token_hash, id_usuario, expira_em)
            VALUES (?, ?, ?)
        `).run(gerarHashToken(token), conta.id_usuario, expiraEm);

        const resposta = NextResponse.json({
            mensagem: `Bem-vindo(a), ${conta.nome}!`,
        });
        resposta.cookies.set(NOME_COOKIE_SESSAO, token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: DURACAO_SESSAO_SEGUNDOS,
        });

        return resposta;
    } catch (error) {
        console.error("Erro ao entrar no sistema:", error);

        return NextResponse.json(
            { erro: "Erro ao realizar login." },
            { status: 500 }
        );
    }
}
