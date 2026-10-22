'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function ListNota() {
    const [notas, setNotas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [notaEmEdicao, setNotaEmEdicao] = useState(null);
    const [valoresEditados, setValoresEditados] = useState({});
    const [salvando, setSalvando] = useState(false);
    const [notaExcluindo, setNotaExcluindo] = useState(null);

    useEffect(() => {
        async function listarNotas() {
            try {
                const resposta = await fetch("/api/notas");
                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados.erro || "Erro ao carregar notas.");
                }

                setNotas(dados);
            } catch (error) {
                setErro(error.message || "Erro ao carregar notas.");
            } finally {
                setCarregando(false);
            }
        }

        listarNotas();
    }, []);

    function editarNota(nota) {
        setNotaEmEdicao(nota.id_nota);
        setValoresEditados({
            t1: String(nota.t1),
            t2: String(nota.t2),
            n1: String(nota.n1),
            n2: String(nota.n2),
            n3: String(nota.n3),
        });
    }

    async function salvarNota(nota) {
        if (Object.values(valoresEditados).some((valor) => valor.trim() === "")) {
            alert("Preencha todas as notas.");
            return;
        }

        const valoresNumericos = Object.fromEntries(
            Object.entries(valoresEditados).map(([campo, valor]) => [
                campo,
                Number(valor),
            ])
        );

        if (
            Object.values(valoresNumericos).some(
                (valor) => !Number.isFinite(valor) || valor < 0 || valor > 10
            )
        ) {
            alert("Digite notas entre 0 e 10.");
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch("/api/notas", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_nota: nota.id_nota,
                    id_aluno: nota.id_aluno,
                    ...valoresNumericos,
                }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || dados.mensagem || "Erro ao salvar nota.");
            }

            setNotas((notasAtuais) =>
                notasAtuais.map((notaAtual) =>
                    notaAtual.id_nota === nota.id_nota
                        ? { ...notaAtual, ...valoresNumericos }
                        : notaAtual
                )
            );
            setNotaEmEdicao(null);
            setValoresEditados({});
            alert(dados.mensagem || "Nota atualizada com sucesso!");
        } catch (error) {
            alert(error.message || "Erro ao salvar nota.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirNota(nota) {
        if (!confirm(`Tem certeza que deseja excluir as notas de ${nota.nome}?`)) {
            return;
        }

        setNotaExcluindo(nota.id_nota);

        try {
            const resposta = await fetch("/api/notas", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_nota: nota.id_nota }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || dados.mensagem || "Erro ao excluir nota.");
            }

            setNotas((notasAtuais) =>
                notasAtuais.filter((notaAtual) => notaAtual.id_nota !== nota.id_nota)
            );
            if (notaEmEdicao === nota.id_nota) {
                setNotaEmEdicao(null);
                setValoresEditados({});
            }
            alert(dados.mensagem || "Nota excluída com sucesso!");
        } catch (error) {
            alert(error.message || "Erro ao excluir nota.");
        } finally {
            setNotaExcluindo(null);
        }
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.listPanel}>
                    <h2>Listagem de Notas</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>T1</th>
                                    <th>T2</th>
                                    <th>N1</th>
                                    <th>N2</th>
                                    <th>N3</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carregando ? (
                                    <tr>
                                        <td colSpan="7">Carregando notas...</td>
                                    </tr>
                                ) : erro ? (
                                    <tr>
                                        <td colSpan="7">{erro}</td>
                                    </tr>
                                ) : notas.length === 0 ? (
                                    <tr>
                                        <td colSpan="7">Nenhuma nota cadastrada.</td>
                                    </tr>
                                ) : notas.map((nota) => (
                                    <tr key={nota.id_nota}>
                                        <td>{nota.nome}</td>
                                        {["t1", "t2", "n1", "n2", "n3"].map((campo) => (
                                            <td key={campo}>
                                                {notaEmEdicao === nota.id_nota ? (
                                                    <input
                                                        className={styles.gradeInput}
                                                        aria-label={`${campo.toUpperCase()} de ${nota.nome}`}
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        step="0.01"
                                                        required
                                                        value={valoresEditados[campo]}
                                                        onChange={(evento) =>
                                                            setValoresEditados((valores) => ({
                                                                ...valores,
                                                                [campo]: evento.target.value,
                                                            }))
                                                        }
                                                    />
                                                ) : (
                                                    Number(nota[campo]).toLocaleString("pt-BR")
                                                )}
                                            </td>
                                        ))}
                                        <td className={styles.actions}>
                                            {notaEmEdicao === nota.id_nota ? (
                                                <>
                                                    <button
                                                        className={styles.saveButton}
                                                        type="button"
                                                        disabled={salvando}
                                                        onClick={() => salvarNota(nota)}
                                                    >
                                                        {salvando ? "Salvando..." : "Salvar"}
                                                    </button>
                                                    <button
                                                        className={styles.cancelButton}
                                                        type="button"
                                                        disabled={salvando}
                                                        onClick={() => {
                                                            setNotaEmEdicao(null);
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
                                                        disabled={notaEmEdicao !== null || notaExcluindo !== null}
                                                        onClick={() => editarNota(nota)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        type="button"
                                                        disabled={notaEmEdicao !== null || notaExcluindo !== null}
                                                        onClick={() => excluirNota(nota)}
                                                    >
                                                        {notaExcluindo === nota.id_nota ? "Excluindo..." : "Excluir"}
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
