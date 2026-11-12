import db from "../../../db/banco.js";
import { criarHashSenha } from "../../../lib/senhas.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const dados = await request.json();
        const usuario = typeof dados.usuario === "string" ? dados.usuario.trim() : "";
        const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
        const senha = typeof dados.senha === "string" ? dados.senha : "";

        if (!usuario || !nome || !senha) {
            return NextResponse.json(
                { erro: "Preencha usuário, nome e senha." },
                { status: 400 }
            );
        }

        const senhaHash = await criarHashSenha(senha);

        db.prepare(`
            INSERT INTO usuarios (usuario, nome, senha_hash)
            VALUES (?, ?, ?)
        `).run(usuario, nome, senhaHash);

        return NextResponse.json(
            { mensagem: "Registro salvo com sucesso. Faça login para continuar." },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Este usuário já está cadastrado." },
                { status: 409 }
            );
        }

        console.error("Erro ao registrar usuário:", error);

        return NextResponse.json(
            { erro: "Erro ao salvar o registro." },
            { status: 500 }
        );
    }
}
