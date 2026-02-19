let prompt= require('prompt-sync')();
let anoNascimento = Number(prompt("Informe seu ano de nascimento:"));

let anoAtual = new Date().getFullYear();

let idade = anoAtual - anoNascimento;

console.log("Você tem", idade, "anos.");