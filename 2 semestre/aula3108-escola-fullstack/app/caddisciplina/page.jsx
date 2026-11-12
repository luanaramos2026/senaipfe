'use client';

import { useState } from "react";
import Header from "../components/header";
import styles from "../components/cadastro.module.css";

export default function CadDisciplina() {
    const [nome, setNome] = useState("");
    const [pontuacaoMinima, setPontuacaoMinima] = useState("");

    async function cadastrarDisciplina(evento) {
        evento.preventDefault();

        try {
            const resposta = await fetch("/api/disciplinas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    pontuacao_minima: Number(pontuacaoMinima),
                }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao cadastrar disciplina.");
            }

            alert(dados.mensagem);
            setNome("");
            setPontuacaoMinima("");
        } catch (error) {
            alert(error.message || "Erro ao cadastrar disciplina.");
        }
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.formPanel}>
                    <div className={styles.heading}>
                        <h2>Cadastro de Disciplina</h2>
                    </div>
                    <form className={styles.form} onSubmit={cadastrarDisciplina}>
                        <div className={styles.field}>
                            <label htmlFor="nome">Nome da disciplina</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(evento) => setNome(evento.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="pontuacaoMinima">Pontuação mínima para passar (0 a 10)</label>
                            <input
                                id="pontuacaoMinima"
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={pontuacaoMinima}
                                onChange={(evento) => setPontuacaoMinima(evento.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Cadastrar disciplina</button>
                    </form>
                </section>
            </main>
        </div>
    );
}
