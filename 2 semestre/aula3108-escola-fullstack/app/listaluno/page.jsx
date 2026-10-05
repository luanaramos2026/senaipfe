
'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [pesquisa, setPesquisa] = useState("");

    // Buscar alunos no banco de dados
    async function listarAlunos() {
        try {
            const resposta = await fetch("/api/alunos");
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error("Erro ao buscar alunos.");
            }

            setAlunos(dados);
        } catch (error) {
            alert(error.message);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        listarAlunos();
    }, []);

    // Pesquisa somente a partir do 3º caractere
    const alunosFiltrados =
        pesquisa.length >= 3
            ? alunos.filter((aluno) =>
                aluno.nome
                    .toLowerCase()
                    .includes(pesquisa.toLowerCase())
            )
            : alunos;

    // Editar aluno
    async function editarAluno(aluno) {
        const nome = prompt("Nome:", aluno.nome);
        if (nome === null) return;

        const idade = prompt("Idade:", aluno.idade);
        if (idade === null) return;

        const serie = prompt("Série:", aluno.serie);
        if (serie === null) return;

        const ra = prompt("RA:", aluno.ra);
        if (ra === null) return;

        if (
            !nome.trim() ||
            !idade.trim() ||
            !serie.trim() ||
            !ra.trim()
        ) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            const resposta = await fetch("/api/alunos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_aluno: aluno.id_aluno,
                    nome,
                    idade,
                    serie,
                    ra
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || "Erro ao editar aluno."
                );
            }

            alert(dados.mensagem || "Aluno atualizado!");

            await listarAlunos();

        } catch (error) {
            alert(error.message);
        }
    }

    // Excluir aluno
    async function excluirAluno(id) {
        if (!confirm("Tem certeza que deseja excluir este aluno?")) {
            return;
        }

        try {
            const resposta = await fetch("/api/alunos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_aluno: id
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || "Erro ao excluir aluno."
                );
            }

            alert(dados.mensagem || "Aluno excluído!");

            await listarAlunos();

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <section className={styles.listPanel}>

                    <h2>Listagem de Alunos</h2>

                    {/* CAMPO DE PESQUISA */}
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Pesquisar aluno..."
                            value={pesquisa}
                            onChange={(e) =>
                                setPesquisa(e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>

                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Série</th>
                                    <th>RA</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {carregando ? (

                                    <tr>
                                        <td colSpan="5">
                                            Carregando alunos...
                                        </td>
                                    </tr>

                                ) : alunosFiltrados.length === 0 ? (

                                    <tr>
                                        <td colSpan="5">
                                            Nenhum aluno encontrado.
                                        </td>
                                    </tr>

                                ) : (

                                    alunosFiltrados.map((aluno) => (

                                        <tr key={aluno.id_aluno}>

                                            <td>{aluno.nome}</td>
                                            <td>{aluno.idade}</td>
                                            <td>{aluno.serie}</td>
                                            <td>{aluno.ra}</td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className={styles.btnEditar}
                                                    onClick={() =>
                                                        editarAluno(aluno)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className={styles.btnExcluir}
                                                    onClick={() =>
                                                        excluirAluno(
                                                            aluno.id_aluno
                                                        )
                                                    }
                                                >
                                                    Excluir
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>
                    </div>

                </section>
            </main>
        </div>
    );
}

