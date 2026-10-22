'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../components/header";
import styles from "./page.module.css";

export default function EditarAluno() {

    const router = useRouter();
    const params = useParams();

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");

    const [carregando, setCarregando] = useState(true);


    // Buscar os dados do aluno
    useEffect(() => {

        async function buscarAluno() {

            try {

                const resposta = await fetch("/api/alunos");

                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(
                        dados.erro || "Erro ao buscar alunos."
                    );
                }

                const aluno = dados.find(
                    (item) =>
                        String(item.id_aluno) === String(params.id)
                );

                if (!aluno) {
                    alert("Aluno não encontrado.");
                    return;
                }

                setNome(aluno.nome);
                setIdade(aluno.idade);
                setSerie(aluno.serie);
                setRa(aluno.ra);

            } catch (error) {

                alert(error.message);

            } finally {

                setCarregando(false);

            }
        }

        if (params.id) {
            buscarAluno();
        }

    }, [params.id]);


    // Editar aluno
    async function editarAluno(evento) {

        evento.preventDefault();

        const resposta = await fetch("/api/alunos", {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id_aluno: params.id,
                nome,
                idade,
                serie,
                ra
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        // Depois de salvar, volta para a lista
        if (resposta.ok) {
            router.push("/listaluno");
        }
    }


    if (carregando) {
        return <p>Carregando aluno...</p>;
    }


    return (
        <div className={styles.page}>

            <Header />

            <main className={styles.main}>

                <section className={styles.formPanel}>

                    <div className={styles.heading}>
                        <h2>Editar Aluno</h2>
                    </div>

                    <form
                        action=""
                        className={styles.form}
                        onSubmit={editarAluno}
                    >

                        <div className={styles.field}>

                            <label htmlFor="nome">
                                Nome
                            </label>

                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) =>
                                    setNome(e.target.value)
                                }
                            />

                        </div>


                        <div className={styles.field}>

                            <label htmlFor="idade">
                                Idade
                            </label>

                            <input
                                id="idade"
                                type="number"
                                value={idade}
                                onChange={(e) =>
                                    setIdade(e.target.value)
                                }
                            />

                        </div>


                        <div className={styles.field}>

                            <label htmlFor="serie">
                                Série
                            </label>

                            <input
                                id="serie"
                                type="text"
                                value={serie}
                                onChange={(e) =>
                                    setSerie(e.target.value)
                                }
                            />

                        </div>


                        <div className={styles.field}>

                            <label htmlFor="ra">
                                RA
                            </label>

                            <input
                                id="ra"
                                type="text"
                                value={ra}
                                onChange={(e) =>
                                    setRa(e.target.value)
                                }
                            />

                        </div>


                        <button
                            className={styles.button}
                            type="submit"
                        >
                            Salvar Alterações
                        </button>

                    </form>

                </section>

            </main>

        </div>
    );
}