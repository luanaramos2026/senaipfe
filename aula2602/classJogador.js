class Jogador{//class mae
    #nome;
    #numero;
    constructor(nome, numero){
        this.#nome = nome;
        this.#numero = numero;
    }
    treinar(){
        return '3 vezesnna semana'
    }
     getNome(){
        return this.#nome;
    }
    getNumero(){
        return this.#numero
    }
}

//classe jogadorFutebol - filha
class jogadorFutebol extends Jogador{
    #peDominante;
    #totalGols;
    constructor(peDominante, totalGols, nome, numero){
        this.#peDominante = peDominante;
        this.#totalGols = totalGols;
        super(nome,numero);
    }
    driblar(){
        return 'Tomou uma caneta';
    }
    fazerGol(qntsGols){
        return this.#totalGols += qntsGols;

    }
    mostrar(){
        return 'O jogador ' +super.getNome() + 'número ' + super.getNumero() + 'pé dominante ' + this.#peDominante + 'tem ' + this.#totalGols + 'gols ';
    }
}

const jogador = new jogadorFutebol('esquerdo', 11, 'Estevan', 10);
jogador.fazerGol(2);
console.log(jogador.mostrar());