import Database from "better-sqlite3";

const db = new Database("./app/db/escola.db"); //cria banco

db.pragma("foreign_keys = ON");//habilita chave estrangeira

db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        serie TEXT NOT NULL,
        ra TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS notas (
        id_nota INTEGER PRIMARY KEY AUTOINCREMENT,
        id_aluno INTEGER NOT NULL UNIQUE,
        t1 REAL NOT NULL,
        t2 REAL NOT NULL,
        n1 REAL NOT NULL,
        n2 REAL NOT NULL,
        n3 REAL NOT NULL,
        FOREIGN KEY (id_aluno)
            REFERENCES alunos(id_aluno)
            ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS disciplinas (
        id_disciplina INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        pontuacao_minima REAL NOT NULL
            CHECK (pontuacao_minima >= 0 AND pontuacao_minima <= 10)
    );

    CREATE TABLE IF NOT EXISTS professores (
        id_professor INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        nif TEXT NOT NULL UNIQUE,
        dias_semana TEXT NOT NULL,
        id_disciplina INTEGER NOT NULL,
        total_aulas_semana INTEGER NOT NULL CHECK (total_aulas_semana > 0),
        FOREIGN KEY (id_disciplina)
            REFERENCES disciplinas(id_disciplina)
    );

    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL COLLATE NOCASE UNIQUE,
        nome TEXT NOT NULL,
        senha_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessoes (
        token_hash TEXT PRIMARY KEY,
        id_usuario INTEGER NOT NULL,
        expira_em INTEGER NOT NULL,
        FOREIGN KEY (id_usuario)
            REFERENCES usuarios(id_usuario)
            ON DELETE CASCADE
    );
`)
console.log('Banco criado com sucesso!');

export default db