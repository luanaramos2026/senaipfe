import { createHash, randomBytes } from "node:crypto";

export const NOME_COOKIE_SESSAO = "escola_sessao";
export const DURACAO_SESSAO_SEGUNDOS = 60 * 60 * 8;

export function criarTokenSessao() {
    return randomBytes(32).toString("base64url");
}

export function gerarHashToken(token) {
    return createHash("sha256").update(token).digest("hex");
}
