// Classe JogadorFutebolAmericano
class JogadorFutebolAmericano {
  constructor(nome, numero, listaJogadas = [], jardasConquistadas = 0) {
    this.nome = nome;
    this.numero = numero;
    this.listaJogadas = listaJogadas;
    this.jardasConquistadas = jardasConquistadas;
  }

  fazerTouchDown() {
    return `O jogador ${this.nome}, número ${this.numero}, fez touchdown`;
  }

  bloquear() {
    return `O jogador ${this.nome}, número ${this.numero}, realizou um bloqueio`;
  }

  correrJardas(valor) {
    this.jardasConquistadas += valor;
    return `O jogador ${this.nome}, número ${this.numero}, correu ${valor} jardas`;
  }
}

// Classe JogadorBasquete
class JogadorBasquete {
  constructor(nome, numero, alturaSalto = 0, totalCestas = 0) {
    this.nome = nome;
    this.numero = numero;
    this.alturaSalto = alturaSalto;
    this.totalCestas = totalCestas;
  }

  arremessar() {
    return `O jogador ${this.nome}, número ${this.numero} arremessou a bola`;
  }

  fazerEnterrada() {
    this.totalCestas++;
    return `O jogador ${this.nome} fez uma enterrada`;
  }
}

// Exemplos de uso
const jogadorFA = new JogadorFutebolAmericano("Pedro", 12);
console.log(jogadorFA.fazerTouchDown());

const jogadorBasquete = new JogadorBasquete("Lucas", 23);
console.log(jogadorBasquete.arremessar());