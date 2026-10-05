import db from "../../db/banco.js";
import { NextResponse } from "next/server";

// Listar notas


   export async function GET() {
    try {
        const alunos = db.prepare(`
            SELECT id_aluno, nome, idade, serie, ra
            FROM alunos
            ORDER BY nome
        `).all();

        return NextResponse.json(alunos);
    } catch (error) {
        console.error("Erro ao listar alunos:", error);

        return NextResponse.json(
            { erro: "Erro ao listar alunos." },
            { status: 500 }
        );
    }
}


// Cadastrar aluno
export async function POST(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            INSERT INTO alunos (nome, idade, serie, ra)
            VALUES (?, ?, ?, ?)
        `);

        sql.run(dados.nome, dados.idade, dados.serie, dados.ra);

        return NextResponse.json({
            mensagem: "Aluno cadastrado com sucesso!"
        }, { status: 201 });

    } catch (error) {
        console.error("Erro ao realizar cadastro:", error);

        return NextResponse.json(
            { erro: "Erro ao cadastrar aluno!" },
            { status: 500 }
        );
    }
}

// Editar aluno
export async function PUT(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);

        sql.run(
            dados.nome,
            dados.idade,
            dados.serie,
            dados.ra,
            dados.id_aluno
        );

        return NextResponse.json({
            mensagem: "Aluno atualizado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao editar o aluno:", error);

        return NextResponse.json(
            { erro: "Erro ao editar o aluno." },
            { status: 500 }
        );
    }
}

// Excluir aluno
export async function DELETE(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            DELETE FROM alunos WHERE id_aluno = ?
        `);

        sql.run(dados.id_aluno);

        return NextResponse.json({
            mensagem: "Aluno excluído com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao excluir o aluno:", error);

        return NextResponse.json(
            { erro: "Erro ao excluir o aluno." },
            { status: 500 }
        );
    }
}