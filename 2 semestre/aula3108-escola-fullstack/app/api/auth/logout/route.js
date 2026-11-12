import db from "../../../db/banco.js";
import { gerarHashToken, NOME_COOKIE_SESSAO } from "../../../lib/sessao.js";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const token = request.cookies.get(NOME_COOKIE_SESSAO)?.value;

        if (token) {
            db.prepare("DELETE FROM sessoes WHERE token_hash = ?")
                .run(gerarHashToken(token));
        }

        const resposta = NextResponse.json({ mensagem: "Sessão encerrada." });
        resposta.cookies.set(NOME_COOKIE_SESSAO, "", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 0,
        });

        return resposta;
    } catch (error) {
        console.error("Erro ao encerrar sessão:", error);

        return NextResponse.json(
            { erro: "Erro ao encerrar sessão." },
            { status: 500 }
        );
    }
}
