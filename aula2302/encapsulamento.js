class Pessoa {
    nome; // atributo público
    #cpf = '00100200304'; // atributo privado

    // métodos getter e setter
    setCpf(valor) {
        this.#cpf = valor;
    }

    getCpf() {
        return this.#cpf;
    }
}

const livia = new Pessoa();
livia.nome = 'Livia';
livia.setCpf('22222222220');

console.log('O CPF é: ' + livia.getCpf());
console.log(livia.nome);