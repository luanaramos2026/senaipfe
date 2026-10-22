 'use client';

 import { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function CadNotas() {
    const [id_aluno, setIdAluno] = useState("");
     const [alunos, setAlunos] = useState([]);
     const [carregandoAlunos, setCarregandoAlunos] = useState(true);
     const [t1, setT1] = useState("");
     const [t2, setT2] = useState("");
     const [n1, setN1] = useState("");
     const [n2, setN2] = useState("");
     const [n3, setN3] = useState("");

     useEffect(() => {
         async function carregarAlunos() {
             try {
                 const resposta = await fetch("/api/alunos");
                 const dados = await resposta.json();

                 if (!resposta.ok) {
                     throw new Error(dados.erro || "Erro ao carregar alunos.");
                 }

                 setAlunos(dados);
             } catch (error) {
                 alert(error.message || "Erro ao carregar alunos.");
             } finally {
                 setCarregandoAlunos(false);
             }
         }

         carregarAlunos();
     }, []);

     async function cadastrarNotas(evento) {
         evento.preventDefault();

         try {
             const resposta = await fetch("/api/notas", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({
                     id_aluno,
                     t1: Number(t1),
                     t2: Number(t2),
                     n1: Number(n1),
                     n2: Number(n2),
                     n3: Number(n3),
                 }),
             });

             const dados = await resposta.json();

             if (!resposta.ok) {
                 throw new Error(dados.erro || dados.mensagem || "Erro ao cadastrar nota.");
             }

             alert(dados.mensagem || "Notas salvas com sucesso!");
             setIdAluno("");
             setT1("");
             setT2("");
             setN1("");
             setN2("");
             setN3("");
         } catch (error) {
             alert(error.message || "Erro ao cadastrar nota.");
         }
     }

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <section className={styles.formPanel}>
                    <div className={styles.heading}>
                        <h2>Cadastro de Notas</h2>
                    </div>

                    <form
                        className={styles.form}
                        onSubmit={cadastrarNotas}
                    >
                        <div className={styles.field}>
                            <label htmlFor="aluno">Aluno</label>
                            <select
                                id="aluno"
                                value={id_aluno}
                                onChange={(e) =>
                                    setIdAluno(e.target.value)
                                }
                                disabled={carregandoAlunos || alunos.length === 0}
                                required
                            >
                                <option value="">
                                    {carregandoAlunos
                                        ? "Carregando alunos..."
                                        : alunos.length === 0
                                            ? "Nenhum aluno cadastrado"
                                            : "Selecione um aluno"}
                                </option>
                                {alunos.map((aluno) => (
                                    <option
                                        key={aluno.id_aluno}
                                        value={aluno.id_aluno}
                                    >
                                        {aluno.nome} (RA: {aluno.ra})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className={styles.gradeHint}>
                            Digite as notas desejadas de 0 a 10. Se o aluno já tiver notas cadastradas,
                            os novos valores substituirão os anteriores.
                        </p>

                        <div className={styles.fieldsGrid}>
                            <div className={styles.field}>
                                <label htmlFor="t1">
                                    T1 (trabalho 1)
                                </label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={t1}
                                    onChange={(e) =>
                                        setT1(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="t2">
                                    T2 (trabalho 2)
                                </label>
                                <input
                                    id="t2"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={t2}
                                    onChange={(e) =>
                                        setT2(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="n1">
                                    N1 (nota 1)
                                </label>
                                <input
                                    id="n1"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={n1}
                                    onChange={(e) =>
                                        setN1(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="n2">
                                    N2 (nota 2)
                                </label>
                                <input
                                    id="n2"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={n2}
                                    onChange={(e) =>
                                        setN2(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="n3">
                                    N3 (nota 3)
                                </label>
                                <input
                                    id="n3"
                                    type="number"
                                    step="0.01"
                                min="0"
                                    max="10"
                                    placeholder="0 a 10"
                                    value={n3}
                                    onChange={(e) =>
                                        setN3(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className={styles.button}
                            type="submit"
                            disabled={carregandoAlunos || alunos.length === 0}
                        >
                            Cadastrar
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}