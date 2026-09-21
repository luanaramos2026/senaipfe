// editar aluno pelo id_aluno
export async function EditAluno(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra, dados.id_aluno);
        return NextResponse.json({
            message: "Aluno atualizado com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao editar o aluno ', error);
        return NextResponse.json({ message: "Erro ao editar o aluno." }, { status: 500 });
    };
}

// excluir aluno pelo id_aluno
export async function DeleteAluno(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`DELETE FROM alunos WHERE id_aluno = ?`);
        sql.run(dados.id_aluno);
        return NextResponse.json({
            message: "Aluno excluído com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao excluir o aluno ', error);
        return NextResponse.json({ message: "Erro ao excluir o aluno." }, { status: 500 });
    };
}
