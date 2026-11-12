'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/header";
import styles from "../auth/auth.module.css";

export default function Registro() {
    const router = useRouter();
    const [usuario, setUsuario] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [salvando, setSalvando] = useState(false);

    async function salvarRegistro(evento) {
        evento.preventDefault();
        setSalvando(true);

        try {
            const resposta = await fetch("/api/auth/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, nome, senha }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao salvar o registro.");
            }

            alert(dados.mensagem);
            router.push("/login");
        } catch (error) {
            alert(error.message || "Erro ao salvar o registro.");
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className={styles.page}>
            <Header hideLogout />
            <main className={styles.main}>
                <section className={styles.panel}>
                    <div className={styles.heading}>
                        <h2>Criar registro</h2>
                        <p>Preencha seus dados para criar um usuário.</p>
                    </div>
                    <form className={styles.form} onSubmit={salvarRegistro}>
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
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={nome}
                                onChange={(evento) => setNome(evento.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={senha}
                                onChange={(evento) => setSenha(evento.target.value)}
                                required
                            />
                        </div>
                        <button className={styles.primaryButton} type="submit" disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar registro"}
                        </button>
                    </form>
                    <Link className={styles.secondaryButton} href="/login">
                        Ir para login
                    </Link>
                </section>
            </main>
        </div>
    );
}
