class Estudante{
    nome;
    #ra;
    #cpf;

    constructor(nome, ra, cpf){
        this.nome = nome;
        this.#ra = ra;
        this.#cpf = cpf;
    }
}
const Noemi = new Estudante ('Noemi da Silva', 3333332, 34534534556);
console.log(Noemi);