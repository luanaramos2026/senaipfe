import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export async function criarHashSenha(senha) {
    const salt = randomBytes(16).toString("hex");
    const hash = await scrypt(senha, salt, 64);

    return `${salt}:${Buffer.from(hash).toString("hex")}`;
}

export async function verificarSenha(senha, senhaArmazenada) {
    const [salt, hashArmazenado] = senhaArmazenada.split(":");

    if (!salt || !hashArmazenado) {
        return false;
    }

    const hash = Buffer.from(await scrypt(senha, salt, 64));
    const hashSalvo = Buffer.from(hashArmazenado, "hex");

    return hash.length === hashSalvo.length && timingSafeEqual(hash, hashSalvo);
}
