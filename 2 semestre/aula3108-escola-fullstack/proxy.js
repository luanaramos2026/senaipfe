import db from "./app/db/banco.js";
import { gerarHashToken, NOME_COOKIE_SESSAO } from "./app/lib/sessao.js";
import { NextResponse } from "next/server";

const rotasPublicas = new Set([
    "/login",
    "/registro",
    "/api/auth/login",
    "/api/auth/registro",
    "/api/auth/logout",
]);

export function proxy(request) {
    const { pathname } = request.nextUrl;

    if (
        rotasPublicas.has(pathname) ||
        pathname.startsWith("/_next/") ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get(NOME_COOKIE_SESSAO)?.value;

    if (!token) {
        return pathname.startsWith("/api/")
            ? NextResponse.json({ erro: "Autenticação necessária." }, { status: 401 })
            : NextResponse.redirect(new URL("/login", request.url));
    }

    const sessao = db.prepare(`
        SELECT expira_em
        FROM sessoes
        WHERE token_hash = ?
    `).get(gerarHashToken(token));

    if (!sessao || sessao.expira_em <= Math.floor(Date.now() / 1000)) {
        if (sessao) {
            db.prepare("DELETE FROM sessoes WHERE token_hash = ?")
                .run(gerarHashToken(token));
        }

        const resposta = pathname.startsWith("/api/")
            ? NextResponse.json({ erro: "Sessão expirada. Faça login novamente." }, { status: 401 })
            : NextResponse.redirect(new URL("/login", request.url));
        resposta.cookies.delete(NOME_COOKIE_SESSAO);
        return resposta;
    }

    if (pathname === "/") {
        return NextResponse.redirect(new URL("/principal", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
