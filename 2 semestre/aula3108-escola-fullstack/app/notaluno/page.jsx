'use client';
import { useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function NotaAluno() {
    const [aluno, setAluno] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.formPanel}>
                    <h2>Cadastro de Notas</h2>
                    <form action="" className={styles.form}>
                        <div className={`${styles.field} ${styles.fullField}`}>
                            <label htmlFor="aluno">Aluno</label>
                            <input id="aluno" type="text" value={aluno} onChange={(e) => setAluno(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="t1">T1 (trabalho 1)</label>
                            <input id="t1" type="number" min="0" max="10" step="0.1" value={t1} onChange={(e) => setT1(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="t2">T2 (trabalho 2)</label>
                            <input id="t2" type="number" min="0" max="10" step="0.1" value={t2} onChange={(e) => setT2(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="n1">N1 (nota 1)</label>
                            <input id="n1" type="number" min="0" max="10" step="0.1" value={n1} onChange={(e) => setN1(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="n2">N2 (nota 2)</label>
                            <input id="n2" type="number" min="0" max="10" step="0.1" value={n2} onChange={(e) => setN2(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="n3">N3 (nota 3)</label>
                            <input id="n3" type="number" min="0" max="10" step="0.1" value={n3} onChange={(e) => setN3(e.target.value)} />
                        </div>
                        <button type="submit">Cadastrar</button>
                    </form>
                </section>
            </main>
        </div>
    );
}
