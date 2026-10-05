'use client';
import { useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function CadAluno() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");

    async function cadastrarAluno(evento) {
        evento.preventDefault();
        const resposta = await fetch("/api/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, idade, serie, ra }),
        }); 
        const dados = await resposta.json();
        alert(dados.mensagem  || dados.erro);
        if (resposta.ok) {
            setNome("");
            setIdade("");
            setSerie("");
            setRa("");
        }

}

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.formPanel}>
                    <div className={styles.heading}>
                        <h2>Cadastro de Aluno</h2>
                    </div>
                    <form action="" className={styles.form} onSubmit={cadastrarAluno}>
                        <div className={styles.field}>
                            <label htmlFor="nome">Nome</label>
                            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="idade">Idade</label>
                            <input id="idade" type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="serie">Série</label>
                            <input id="serie" type="text" value={serie} onChange={(e) => setSerie(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="ra">RA</label>
                            <input id="ra" type="text" value={ra} onChange={(e) => setRa(e.target.value)} />
                        </div>
                        <button className={styles.button} type="submit">
                            Cadastrar
                        </button>
                    </form>
                </section>
            </main>
        </div>
    )
   }