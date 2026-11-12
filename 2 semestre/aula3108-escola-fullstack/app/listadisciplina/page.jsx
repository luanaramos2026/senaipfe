'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "../listnota/page.module.css";

export default function ListaDisciplina() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [idEmEdicao, setIdEmEdicao] = useState(null);
    const [valoresEditados, setValoresEditados] = useState({});
    const [salvando, setSalvando] = useState(false);
    const [idExcluindo, setIdExcluindo] = useState(null);

    useEffect(() => {
        async function listarDisciplinas() {
            try {
                const resposta = await fetch("/api/disciplinas");
                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados.erro || "Erro ao carregar disciplinas.");
                }

                setDisciplinas(dados);
            } catch (error) {
                setErro(error.message || "Erro ao carregar disciplinas.");
            } finally {
                setCarregando(false);
            }
        }

        listarDisciplinas();
    }, []);

    function editarDisciplina(disciplina) {
        setIdEmEdicao(disciplina.id_disciplina);
        setValoresEditados({
            nome: disciplina.nome,
            pontuacao_minima: String(disciplina.pontuacao_minima),
        });
    }

    async function salvarDisciplina(disciplina) {
        const nome = valoresEditados.nome.trim();
        const pontuacaoMinima = Number(valoresEditados.pontuacao_minima);

        if (
            !nome ||
            valoresEditados.pontuacao_minima.trim() === "" ||
            !Number.isFinite(pontuacaoMinima) ||
            pontuacaoMinima < 0 ||
            pontuacaoMinima > 10
        ) {
            alert("Informe o nome e uma pontuação mínima entre 0 e 10.");
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch("/api/disciplinas", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_disciplina: disciplina.id_disciplina,
                    nome,
                    pontuacao_minima: pontuacaoMinima,
                }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao salvar disciplina.");
            }

            setDisciplinas((atuais) =>
                atuais.map((item) =>
                    item.id_disciplina === disciplina.id_disciplina
                        ? { ...item, nome, pontuacao_minima: pontuacaoMinima }
                        : item
                ).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
            );
            setIdEmEdicao(null);
            setValoresEditados({});
            alert(dados.mensagem || "Disciplina atualizada com sucesso!");
        } catch (error) {
            alert(error.message || "Erro ao salvar disciplina.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirDisciplina(disciplina) {
        if (!confirm(`Tem certeza que deseja excluir a disciplina ${disciplina.nome}?`)) {
            return;
        }

        setIdExcluindo(disciplina.id_disciplina);

        try {
            const resposta = await fetch("/api/disciplinas", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_disciplina: disciplina.id_disciplina }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao excluir disciplina.");
            }

            setDisciplinas((atuais) =>
                atuais.filter((item) => item.id_disciplina !== disciplina.id_disciplina)
            );
            if (idEmEdicao === disciplina.id_disciplina) {
                setIdEmEdicao(null);
                setValoresEditados({});
            }
            alert(dados.mensagem || "Disciplina excluída com sucesso!");
        } catch (error) {
            alert(error.message || "Erro ao excluir disciplina.");
        } finally {
            setIdExcluindo(null);
        }
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.listPanel}>
                    <h2>Listagem de Disciplinas</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>Pontuação mínima</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carregando ? (
                                    <tr><td colSpan="3">Carregando disciplinas...</td></tr>
                                ) : erro ? (
                                    <tr><td colSpan="3">{erro}</td></tr>
                                ) : disciplinas.length === 0 ? (
                                    <tr><td colSpan="3">Nenhuma disciplina cadastrada.</td></tr>
                                ) : disciplinas.map((disciplina) => (
                                    <tr key={disciplina.id_disciplina}>
                                        <td>
                                            {idEmEdicao === disciplina.id_disciplina ? (
                                                <input
                                                    className={styles.textInput}
                                                    aria-label="Nome da disciplina"
                                                    type="text"
                                                    required
                                                    value={valoresEditados.nome}
                                                    onChange={(evento) =>
                                                        setValoresEditados((valores) => ({
                                                            ...valores,
                                                            nome: evento.target.value,
                                                        }))
                                                    }
                                                />
                                            ) : disciplina.nome}
                                        </td>
                                        <td>
                                            {idEmEdicao === disciplina.id_disciplina ? (
                                                <input
                                                    className={styles.gradeInput}
                                                    aria-label={`Pontuação mínima de ${disciplina.nome}`}
                                                    type="number"
                                                    min="0"
                                                    max="10"
                                                    step="0.1"
                                                    required
                                                    value={valoresEditados.pontuacao_minima}
                                                    onChange={(evento) =>
                                                        setValoresEditados((valores) => ({
                                                            ...valores,
                                                            pontuacao_minima: evento.target.value,
                                                        }))
                                                    }
                                                />
                                            ) : Number(disciplina.pontuacao_minima).toLocaleString("pt-BR")}
                                        </td>
                                        <td className={styles.actions}>
                                            {idEmEdicao === disciplina.id_disciplina ? (
                                                <>
                                                    <button
                                                        className={styles.saveButton}
                                                        type="button"
                                                        disabled={salvando}
                                                        onClick={() => salvarDisciplina(disciplina)}
                                                    >
                                                        {salvando ? "Salvando..." : "Salvar"}
                                                    </button>
                                                    <button
                                                        className={styles.cancelButton}
                                                        type="button"
                                                        disabled={salvando}
                                                        onClick={() => {
                                                            setIdEmEdicao(null);
                                                            setValoresEditados({});
                                                        }}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className={styles.editButton}
                                                        type="button"
                                                        disabled={idEmEdicao !== null || idExcluindo !== null}
                                                        onClick={() => editarDisciplina(disciplina)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        type="button"
                                                        disabled={idEmEdicao !== null || idExcluindo !== null}
                                                        onClick={() => excluirDisciplina(disciplina)}
                                                    >
                                                        {idExcluindo === disciplina.id_disciplina ? "Excluindo..." : "Excluir"}
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
