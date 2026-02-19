
let dataAtual = new Date();

let fimDoAno = new Date(dataAtual.getFullYear(), 11, 31);

let diferencaMs = fimDoAno - dataAtual;

let diasRestantes = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

console.log("Faltam", diasRestantes, "dias para o fim do ano.");