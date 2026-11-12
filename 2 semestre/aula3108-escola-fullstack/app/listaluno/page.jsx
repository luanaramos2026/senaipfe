'use client';

import { useState, useEffect } from "react";
import Header from "../components/header";
import styles from "./page.module.css";
import Link from "next/link";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [pesquisa, setPesquisa] = useState("");

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

    const termoPesquisa = pesquisa.trim().toLowerCase();

    const alunosFiltrados =
        termoPesquisa.length >= 3
            ? alunos.filter((aluno) =>
                [
                    aluno.nome,
                    aluno.serie,
                    aluno.ra,
                    String(aluno.idade)
                ].some((valor) =>
                    String(valor).toLowerCase().includes(termoPesquisa)
                )
            )
            : alunos;


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
[]
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

                    {/* =================================================
                        PESQUISA
                    ================================================= */}

                    <div className={styles.searchBox}>
                        <label className={styles.searchLabel} htmlFor="pesquisa-aluno">
                            Pesquisar aluno
                        </label>

                        <input
                            id="pesquisa-aluno"
                            type="text"
                            placeholder="Pesquisar aluno..."
                            value={pesquisa}
                            onChange={(e) =>
                                setPesquisa(e.target.value)
                            }
                        />

                    </div>

                    {/* =================================================
                        TABELA
                    ================================================= */}

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
                                            <td>
                                                {aluno.nome}
                                            </td>
                                            <td>
                                                {aluno.idade}
                                            </td>
                                            <td>
                                                {aluno.serie}
                                            </td>
                                            <td>
                                                {aluno.ra}
                                            </td>
                                            <td>

                                                <Link
                                                    className={styles.btnEditar}
                                                    href={`/editaluno/${aluno.id_aluno}`}
                                                >
                                                    Editar
                                                </Link>

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