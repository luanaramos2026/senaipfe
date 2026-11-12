import db from "../../db/banco.js";
import { NextResponse } from "next/server";

const diasPermitidos = new Set([
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
    "domingo",
]);

export async function GET() {
    try {
        const professores = db.prepare(`
            SELECT
                professores.id_professor,
                professores.nome,
                professores.nif,
                professores.dias_semana,
                professores.id_disciplina,
                professores.total_aulas_semana,
                disciplinas.nome AS disciplina
            FROM professores
            INNER JOIN disciplinas
                ON professores.id_disciplina = disciplinas.id_disciplina
            ORDER BY professores.nome
        `).all().map((professor) => ({
            ...professor,
            dias_semana: JSON.parse(professor.dias_semana),
        }));

        return NextResponse.json(professores);
    } catch (error) {
        console.error("Erro ao listar professores:", error);

        return NextResponse.json(
            { erro: "Erro ao listar professores." },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
        const nif = typeof dados.nif === "string" ? dados.nif.trim() : "";
        const idDisciplina = Number(dados.id_disciplina);
        const totalAulas = Number(dados.total_aulas_semana);
        const dias = dados.dias_semana;

        if (
            !nome ||
            !nif ||
            !Array.isArray(dias) ||
            dias.length === 0 ||
            dias.some((dia) => !diasPermitidos.has(dia)) ||
            new Set(dias).size !== dias.length ||
            !Number.isInteger(idDisciplina) ||
            idDisciplina <= 0 ||
            !Number.isInteger(totalAulas) ||
            totalAulas <= 0
        ) {
            return NextResponse.json(
                { erro: "Informe os dados do professor, ao menos um dia de aula, uma disciplina e um total de aulas válido." },
                { status: 400 }
            );
        }

        const disciplina = db.prepare(`
            SELECT id_disciplina
            FROM disciplinas
            WHERE id_disciplina = ?
        `).get(idDisciplina);

        if (!disciplina) {
            return NextResponse.json(
                { erro: "A disciplina selecionada não existe." },
                { status: 400 }
            );
        }

        db.prepare(`
            INSERT INTO professores
                (nome, nif, dias_semana, id_disciplina, total_aulas_semana)
            VALUES (?, ?, ?, ?, ?)
        `).run(nome, nif, JSON.stringify(dias), idDisciplina, totalAulas);

        return NextResponse.json(
            { mensagem: "Professor cadastrado com sucesso!" },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Já existe um professor cadastrado com esse NIF." },
                { status: 409 }
            );
        }

        console.error("Erro ao cadastrar professor:", error);

        return NextResponse.json(
            { erro: "Erro ao cadastrar professor." },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const dados = await request.json();
        const idProfessor = Number(dados.id_professor);
        const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
        const nif = typeof dados.nif === "string" ? dados.nif.trim() : "";
        const idDisciplina = Number(dados.id_disciplina);
        const totalAulas = Number(dados.total_aulas_semana);
        const dias = dados.dias_semana;

        if (
            !Number.isInteger(idProfessor) ||
            idProfessor <= 0 ||
            !nome ||
            !nif ||
            !Array.isArray(dias) ||
            dias.length === 0 ||
            dias.some((dia) => !diasPermitidos.has(dia)) ||
            new Set(dias).size !== dias.length ||
            !Number.isInteger(idDisciplina) ||
            idDisciplina <= 0 ||
            !Number.isInteger(totalAulas) ||
            totalAulas <= 0
        ) {
            return NextResponse.json(
                { erro: "Informe os dados do professor, ao menos um dia de aula, uma disciplina e um total de aulas válido." },
                { status: 400 }
            );
        }

        const disciplina = db.prepare(`
            SELECT id_disciplina
            FROM disciplinas
            WHERE id_disciplina = ?
        `).get(idDisciplina);

        if (!disciplina) {
            return NextResponse.json(
                { erro: "A disciplina selecionada não existe." },
                { status: 400 }
            );
        }

        const resultado = db.prepare(`
            UPDATE professores
            SET nome = ?, nif = ?, dias_semana = ?, id_disciplina = ?, total_aulas_semana = ?
            WHERE id_professor = ?
        `).run(nome, nif, JSON.stringify(dias), idDisciplina, totalAulas, idProfessor);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { erro: "Professor não encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({ mensagem: "Professor atualizado com sucesso!" });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return NextResponse.json(
                { erro: "Já existe um professor cadastrado com esse NIF." },
                { status: 409 }
            );
        }

        console.error("Erro ao editar professor:", error);

        return NextResponse.json(
            { erro: "Erro ao editar professor." },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const dados = await request.json();
        const idProfessor = Number(dados.id_professor);

        if (!Number.isInteger(idProfessor) || idProfessor <= 0) {
            return NextResponse.json(
                { erro: "Informe um professor válido." },
                { status: 400 }
            );
        }

        const resultado = db.prepare(`
            DELETE FROM professores
            WHERE id_professor = ?
        `).run(idProfessor);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { erro: "Professor não encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({ mensagem: "Professor excluído com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir professor:", error);

        return NextResponse.json(
            { erro: "Erro ao excluir professor." },
            { status: 500 }
        );
    }
}
