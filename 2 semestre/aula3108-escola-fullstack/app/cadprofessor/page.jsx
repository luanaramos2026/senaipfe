'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "../components/cadastro.module.css";

const diasSemana = [
    { valor: "segunda", rotulo: "Segunda-feira" },
    { valor: "terca", rotulo: "Terça-feira" },
    { valor: "quarta", rotulo: "Quarta-feira" },
    { valor: "quinta", rotulo: "Quinta-feira" },
    { valor: "sexta", rotulo: "Sexta-feira" },
    { valor: "sabado", rotulo: "Sábado" },
    { valor: "domingo", rotulo: "Domingo" },
];

export default function CadProfessor() {
    const [nome, setNome] = useState("");
    const [nif, setNif] = useState("");
    const [dias, setDias] = useState([]);
    const [idDisciplina, setIdDisciplina] = useState("");
    const [totalAulas, setTotalAulas] = useState("");
    const [disciplinas, setDisciplinas] = useState([]);
    const [carregandoDisciplinas, setCarregandoDisciplinas] = useState(true);
    const [erroDisciplinas, setErroDisciplinas] = useState("");

    useEffect(() => {
        async function carregarDisciplinas() {
            try {
                const resposta = await fetch("/api/disciplinas");
                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados.erro || "Erro ao carregar disciplinas.");
                }

                setDisciplinas(dados);
            } catch (error) {
                setErroDisciplinas(error.message || "Erro ao carregar disciplinas.");
            } finally {
                setCarregandoDisciplinas(false);
            }
        }

        carregarDisciplinas();
    }, []);

    function alternarDia(dia) {
        setDias((diasAtuais) =>
            diasAtuais.includes(dia)
                ? diasAtuais.filter((diaAtual) => diaAtual !== dia)
                : [...diasAtuais, dia]
        );
    }

    async function cadastrarProfessor(evento) {
        evento.preventDefault();

        if (dias.length === 0) {
            alert("Selecione ao menos um dia da semana.");
            return;
        }

        try {
            const resposta = await fetch("/api/professores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    nif,
                    dias_semana: dias,
                    id_disciplina: idDisciplina,
                    total_aulas_semana: Number(totalAulas),
                }),
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao cadastrar professor.");
            }

            alert(dados.mensagem);
            setNome("");
            setNif("");
            setDias([]);
            setIdDisciplina("");
            setTotalAulas("");
        } catch (error) {
            alert(error.message || "Erro ao cadastrar professor.");
        }
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.formPanel}>
                    <div className={styles.heading}>
                        <h2>Cadastro de Professor</h2>
                    </div>
                    <form className={styles.form} onSubmit={cadastrarProfessor}>
                        <div className={styles.field}>
                            <label htmlFor="nome">Nome do professor</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(evento) => setNome(evento.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="nif">Matrícula (NIF)</label>
                            <input
                                id="nif"
                                type="text"
                                value={nif}
                                onChange={(evento) => setNif(evento.target.value)}
                                required
                            />
                        </div>
                        <fieldset className={styles.days}>
                            <legend>Dias que ministra aula</legend>
                            <div className={styles.daysGrid}>
                                {diasSemana.map((dia) => (
                                    <label className={styles.dayOption} key={dia.valor}>
                                        <input
                                            type="checkbox"
                                            checked={dias.includes(dia.valor)}
                                            onChange={() => alternarDia(dia.valor)}
                                        />
                                        {dia.rotulo}
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <div className={styles.field}>
                            <label htmlFor="disciplina">Disciplina responsável</label>
                            <select
                                id="disciplina"
                                value={idDisciplina}
                                onChange={(evento) => setIdDisciplina(evento.target.value)}
                                disabled={carregandoDisciplinas || disciplinas.length === 0}
                                required
                            >
                                <option value="">
                                    {carregandoDisciplinas
                                        ? "Carregando disciplinas..."
                                        : disciplinas.length === 0
                                            ? "Nenhuma disciplina cadastrada"
                                            : "Selecione uma disciplina"}
                                </option>
                                {disciplinas.map((disciplina) => (
                                    <option
                                        key={disciplina.id_disciplina}
                                        value={disciplina.id_disciplina}
                                    >
                                        {disciplina.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="totalAulas">Total de aulas na semana</label>
                            <input
                                id="totalAulas"
                                type="number"
                                min="1"
                                step="1"
                                value={totalAulas}
                                onChange={(evento) => setTotalAulas(evento.target.value)}
                                required
                            />
                        </div>
                        {erroDisciplinas ? (
                            <p className={styles.hint} role="alert">{erroDisciplinas}</p>
                        ) : disciplinas.length === 0 && !carregandoDisciplinas ? (
                            <p className={styles.hint}>
                                Cadastre uma disciplina antes de continuar.{" "}
                                <Link href="/caddisciplina">Cadastrar disciplina</Link>
                            </p>
                        ) : null}
                        {dias.length === 0 && (
                            <p className={styles.hint}>Selecione ao menos um dia da semana.</p>
                        )}
                        <button
                            type="submit"
                            disabled={carregandoDisciplinas || disciplinas.length === 0 || Boolean(erroDisciplinas)}
                        >
                            Cadastrar professor
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
