import db from "../../db/banco.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const notas = db.prepare(`
            SELECT
                notas.id_nota,
                notas.id_aluno,
                notas.t1,
                notas.t2,
                notas.n1,
                notas.n2,
                notas.n3,
                alunos.nome,
                alunos.ra
            FROM notas
            INNER JOIN alunos
                ON notas.id_aluno = alunos.id_aluno
            ORDER BY alunos.nome
        `).all();

        return NextResponse.json(notas);
    } catch (error) {
        console.error("Erro ao listar notas:", error);

        return NextResponse.json(
            { erro: "Erro ao listar notas." },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const idAluno = Number(dados.id_aluno);
        const notas = [dados.t1, dados.t2, dados.n1, dados.n2, dados.n3].map(Number);

        if (
            !Number.isInteger(idAluno) ||
            idAluno <= 0 ||
            notas.some((nota) => !Number.isFinite(nota) || nota < 0 || nota > 10)
        ) {
            return NextResponse.json(
                { erro: "Selecione um aluno e informe todas as notas entre 0 e 10." },
                { status: 400 }
            );
        }

        const sql = db.prepare(`
            INSERT INTO notas 
            (id_aluno, t1, t2, n1, n2, n3) 
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(id_aluno) DO UPDATE SET
                t1 = excluded.t1,
                t2 = excluded.t2,
                n1 = excluded.n1,
                n2 = excluded.n2,
                n3 = excluded.n3
        `);

        sql.run(
            idAluno,
            ...notas
        );

        return NextResponse.json({
            mensagem: "Notas salvas com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao realizar cadastro:", error);

        return NextResponse.json(
            { erro: "Erro ao cadastrar nota!" },
            { status: 500 }
        );
    }
}


// EDITAR NOTA PELO ID
export async function PUT(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            UPDATE notas
            SET 
                id_aluno = ?,
                t1 = ?,
                t2 = ?,
                n1 = ?,
                n2 = ?,
                n3 = ?
            WHERE id_nota = ?
        `);

        const resultado = sql.run(
            dados.id_aluno,
            dados.t1,
            dados.t2,
            dados.n1,
            dados.n2,
            dados.n3,
            dados.id_nota
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Nota não encontrada." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Nota atualizada com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao editar a nota:", error);

        return NextResponse.json(
            { mensagem: "Erro ao editar a nota." },
            { status: 500 }
        );
    }
}


// EXCLUIR NOTA PELO ID
export async function DELETE(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            DELETE FROM notas 
            WHERE id_nota = ?
        `);

        const resultado = sql.run(dados.id_nota);

        if (resultado.changes === 0) {
            return NextResponse.json(
                { mensagem: "Nota não encontrada." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Nota excluída com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao excluir a nota:", error);

        return NextResponse.json(
            { mensagem: "Erro ao excluir a nota." },
            { status: 500 }
        );
    }
}