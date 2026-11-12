'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/header";
import styles from "../auth/auth.module.css";

export default function Login() {
    const router = useRouter();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [entrando, setEntrando] = useState(false);

    async function entrarNoSistema(evento) {
        evento.preventDefault();
        setEntrando(true);

        try {
            const resposta = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, senha }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                if (resposta.status === 401) {
                    throw new Error(
                        "Usuário ou senha inválidos. Se ainda não tem cadastro, clique em Ir para registro."
                    );
                }

                throw new Error(dados.erro || "Erro ao realizar login.");
            }

            router.push("/principal");
        } catch (error) {
            alert(error.message || "Erro ao realizar login.");
        } finally {
            setEntrando(false);
        }
    }

    return (
        <div className={styles.page}>
            <Header hideLogout />
            <main className={styles.main}>
                <section className={styles.panel}>
                    <div className={styles.heading}>
                        <h2>Login</h2>
                        <p>Entre com seu usuário e senha para acessar o sistema.</p>
                    </div>
                    <form className={styles.form} onSubmit={entrarNoSistema}>
                        <div className={styles.field}>
                            <label htmlFor="usuario">Usuário</label>
                            <input
                                id="usuario"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={usuario}
                                onChange={(evento) => setUsuario(evento.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={senha}
                                onChange={(evento) => setSenha(evento.target.value)}
                                required
                            />
                        </div>
                        <button className={styles.primaryButton} type="submit" disabled={entrando}>
                            {entrando ? "Entrando..." : "Entrar no sistema"}
                        </button>
                    </form>
                    <Link className={styles.secondaryButton} href="/registro">
                        Ir para registro
                    </Link>
                </section>
            </main>
        </div>
    );
}
