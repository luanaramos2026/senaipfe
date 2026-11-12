'use client';

import { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "../listnota/page.module.css";

const diasSemana = [
    { valor: "segunda", rotulo: "Segunda" },
    { valor: "terca", rotulo: "Terça" },
    { valor: "quarta", rotulo: "Quarta" },
    { valor: "quinta", rotulo: "Quinta" },
    { valor: "sexta", rotulo: "Sexta" },
    { valor: "sabado", rotulo: "Sábado" },
    { valor: "domingo", rotulo: "Domingo" },
];

export default function ListaProfessor() {
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [idEmEdicao, setIdEmEdicao] = useState(null);
    const [valoresEditados, setValoresEditados] = useState({});
    const [salvando, setSalvando] = useState(false);
    const [idExcluindo, setIdExcluindo] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [respostaProfessores, respostaDisciplinas] = await Promise.all([
                    fetch("/api/professores"),
                    fetch("/api/disciplinas"),
                ]);
                const [dadosProfessores, dadosDisciplinas] = await Promise.all([
                    respostaProfessores.json(),
                    respostaDisciplinas.json(),
                ]);

                if (!respostaProfessores.ok) {
                    throw new Error(dadosProfessores.erro || "Erro ao carregar professores.");
                }
                if (!respostaDisciplinas.ok) {
                    throw new Error(dadosDisciplinas.erro || "Erro ao carregar disciplinas.");
                }

                setProfessores(dadosProfessores);
                setDisciplinas(dadosDisciplinas);
            } catch (error) {
                setErro(error.message || "Erro ao carregar professores.");
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    function editarProfessor(professor) {
        setIdEmEdicao(professor.id_professor);
        setValoresEditados({
            nome: professor.nome,
            nif: professor.nif,
            dias_semana: [...professor.dias_semana],
            id_disciplina: String(professor.id_disciplina),
            total_aulas_semana: String(professor.total_aulas_semana),
        });
    }

    function alternarDia(dia) {
        setValoresEditados((valores) => ({
            ...valores,
            dias_semana: valores.dias_semana.includes(dia)
                ? valores.dias_semana.filter((diaAtual) => diaAtual !== dia)
                : [...valores.dias_semana, dia],
        }));
    }

    async function salvarProfessor(professor) {
        const nome = valoresEditados.nome.trim();
        const nif = valoresEditados.nif.trim();
        const totalAulas = Number(valoresEditados.total_aulas_semana);
        const idDisciplina = Number(valoresEditados.id_disciplina);

        if (
            !nome ||
            !nif ||
            valoresEditados.dias_semana.length === 0 ||
            !Number.isInteger(totalAulas) ||
            totalAulas <= 0 ||
            !Number.isInteger(idDisciplina) ||
            idDisciplina <= 0
        ) {
            alert("Preencha os dados, selecione ao menos um dia e informe uma disciplina e total de aulas válidos.");
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch("/api/professores", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_professor: professor.id_professor,
                    nome,
                    nif,
                    dias_semana: valoresEditados.dias_semana,
                    id_disciplina: idDisciplina,
                    total_aulas_semana: totalAulas,
                }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao salvar professor.");
            }

            const disciplina = disciplinas.find((item) => item.id_disciplina === idDisciplina);
            setProfessores((atuais) =>
                atuais.map((item) =>
                    item.id_professor === professor.id_professor
                        ? {
                            ...item,
                            nome,
                            nif,
                            dias_semana: valoresEditados.dias_semana,
                            id_disciplina: idDisciplina,
                            disciplina: disciplina.nome,
                            total_aulas_semana: totalAulas,
                        }
                        : item
                ).sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
            );
            setIdEmEdicao(null);
            setValoresEditados({});
            alert(dados.mensagem || "Professor atualizado com sucesso!");
        } catch (error) {
            alert(error.message || "Erro ao salvar professor.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirProfessor(professor) {
        if (!confirm(`Tem certeza que deseja excluir o professor ${professor.nome}?`)) {
            return;
        }

        setIdExcluindo(professor.id_professor);

        try {
            const resposta = await fetch("/api/professores", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_professor: professor.id_professor }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao excluir professor.");
            }

            setProfessores((atuais) =>
                atuais.filter((item) => item.id_professor !== professor.id_professor)
            );
            if (idEmEdicao === professor.id_professor) {
                setIdEmEdicao(null);
                setValoresEditados({});
            }
            alert(dados.mensagem || "Professor excluído com sucesso!");
        } catch (error) {
            alert(error.message || "Erro ao excluir professor.");
        } finally {
            setIdExcluindo(null);
        }
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.listPanel}>
                    <h2>Listagem de Professores</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Professor</th>
                                    <th>Matrícula (NIF)</th>
                                    <th>Dias de aula</th>
                                    <th>Disciplina</th>
                                    <th>Aulas/semana</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carregando ? (
                                    <tr><td colSpan="6">Carregando professores...</td></tr>
                                ) : erro ? (
                                    <tr><td colSpan="6">{erro}</td></tr>
                                ) : professores.length === 0 ? (
                                    <tr><td colSpan="6">Nenhum professor cadastrado.</td></tr>
                                ) : professores.map((professor) => (
                                    <tr key={professor.id_professor}>
                                        <td>
                                            {idEmEdicao === professor.id_professor ? (
                                                <input
                                                    className={styles.textInput}
                                                    aria-label="Nome do professor"
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
                                            ) : professor.nome}
                                        </td>
                                        <td>
                                            {idEmEdicao === professor.id_professor ? (
                                                <input
                                                    className={styles.textInput}
                                                    aria-label="Matrícula NIF"
                                                    type="text"
                                                    required
                                                    value={valoresEditados.nif}
                                                    onChange={(evento) =>
                                                        setValoresEditados((valores) => ({
                                                            ...valores,
                                                            nif: evento.target.value,
                                                        }))
                                                    }
                                                />
                                            ) : professor.nif}
                                        </td>
                                        <td>
                                            {idEmEdicao === professor.id_professor ? (
                                                <div className={styles.daysEditor}>
                                                    {diasSemana.map((dia) => (
                                                        <label key={dia.valor}>
                                                            <input
                                                                type="checkbox"
                                                                checked={valoresEditados.dias_semana.includes(dia.valor)}
                                                                onChange={() => alternarDia(dia.valor)}
                                                            />
                                                            {dia.rotulo}
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : professor.dias_semana
                                                .map((dia) => diasSemana.find((item) => item.valor === dia)?.rotulo || dia)
                                                .join(", ")}
                                        </td>
                                        <td>
                                            {idEmEdicao === professor.id_professor ? (
                                                <select
                                                    className={styles.selectInput}
                                                    aria-label="Disciplina responsável"
                                                    required
                                                    value={valoresEditados.id_disciplina}
                                                    onChange={(evento) =>
                                                        setValoresEditados((valores) => ({
                                                            ...valores,
                                                            id_disciplina: evento.target.value,
                                                        }))
                                                    }
                                                >
                                                    <option value="">Selecione</option>
                                                    {disciplinas.map((disciplina) => (
                                                        <option key={disciplina.id_disciplina} value={disciplina.id_disciplina}>
                                                            {disciplina.nome}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : professor.disciplina}
                                        </td>
                                        <td>
                                            {idEmEdicao === professor.id_professor ? (
                                                <input
                                                    className={styles.gradeInput}
                                                    aria-label="Total de aulas na semana"
                                                    type="number"
                                                    min="1"
                                                    step="1"
                                                    required
                                                    value={valoresEditados.total_aulas_semana}
                                                    onChange={(evento) =>
                                                        setValoresEditados((valores) => ({
                                                            ...valores,
                                                            total_aulas_semana: evento.target.value,
                                                        }))
                                                    }
                                                />
                                            ) : professor.total_aulas_semana}
                                        </td>
                                        <td className={styles.actions}>
                                            {idEmEdicao === professor.id_professor ? (
                                                <>
                                                    <button
                                                        className={styles.saveButton}
                                                        type="button"
                                                        disabled={salvando}
                                                        onClick={() => salvarProfessor(professor)}
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
                                                        onClick={() => editarProfessor(professor)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className={styles.deleteButton}
                                                        type="button"
                                                        disabled={idEmEdicao !== null || idExcluindo !== null}
                                                        onClick={() => excluirProfessor(professor)}
                                                    >
                                                        {idExcluindo === professor.id_professor ? "Excluindo..." : "Excluir"}
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
