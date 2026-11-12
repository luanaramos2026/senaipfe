import db from "../../db/banco.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const disciplinas = db.prepare(`
            SELECT id_disciplina, nome, pontuacao_minima
            FROM disciplinas
            ORDER BY nome
        `).all();

        return NextResponse.json(disciplinas);
    } catch (error) {
        console.error("Erro ao listar disciplinas:", error);

        return NextResponse.json(
            { erro: "Erro ao listar disciplinas." },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
        const pontuacaoMinima = Number(dados.pontuacao_minima);

        if (
            !nome ||
            !Number.isFinite(pontuacaoMinima) ||
            pontuacaoMinima < 0 ||
            pontuacaoMinima > 10
        ) {
            return NextResponse.json(
                { erro: "Informe o nome e uma pontuação mínima entre 0 e 10." },
                { status: 400 }
            );
        }

        db.prepare(`
            INSERT INTO disciplinas (nome, pontuacao_minima)
            VALUES (?, ?)
        `).run(nome, pontuacaoMinima);

        return NextResponse.json(
            { mensagem: "Disciplina cadastrada com sucesso!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao cadastrar disciplina:", error);

        return NextResponse.json(
            { erro: "Erro ao cadastrar disciplina." },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const dados = await request.json();
        const idDisciplina = Number(dados.id_disciplina);
        const nome = typeof dados.nome === "string" ? dados.nome.trim() : "";
        const pontuacaoMinima = Number(dados.pontuacao_minima);

        if (
            !Number.isInteger(idDisciplina) ||
            idDisciplina <= 0 ||
            !nome ||
            !Number.isFinite(pontuacaoMinima) ||
            pontuacaoMinima < 0 ||
            pontuacaoMinima > 10
        ) {
            return NextResponse.json(
                { erro: "Informe uma disciplina válida e pontuação mínima entre 0 e 10." },
                { status: 400 }
            );
        }

        const resultado = db.prepare(`
            UPDATE disciplinas
            SET nome = ?, pontuacao_minima = ?
            WHERE id_disciplina = ?
        `).run(nome, pontuacaoMinima, idDisciplina);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { erro: "Disciplina não encontrada." },
                { status: 404 }
            );
        }

        return NextResponse.json({ mensagem: "Disciplina atualizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao editar disciplina:", error);

        return NextResponse.json(
            { erro: "Erro ao editar disciplina." },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const dados = await request.json();
        const idDisciplina = Number(dados.id_disciplina);

        if (!Number.isInteger(idDisciplina) || idDisciplina <= 0) {
            return NextResponse.json(
                { erro: "Informe uma disciplina válida." },
                { status: 400 }
            );
        }

        const resultado = db.prepare(`
            DELETE FROM disciplinas
            WHERE id_disciplina = ?
        `).run(idDisciplina);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { erro: "Disciplina não encontrada." },
                { status: 404 }
            );
        }

        return NextResponse.json({ mensagem: "Disciplina excluída com sucesso!" });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
            return NextResponse.json(
                { erro: "Não é possível excluir uma disciplina vinculada a um professor." },
                { status: 409 }
            );
        }

        console.error("Erro ao excluir disciplina:", error);

        return NextResponse.json(
            { erro: "Erro ao excluir disciplina." },
            { status: 500 }
        );
    }
}
