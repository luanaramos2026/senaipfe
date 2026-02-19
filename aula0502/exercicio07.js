let prompt= require('prompt-sync')();
let numero = Number(prompt("Digite um número com casas decimais:"));

let arredondado = Math.round(numero);

console.log("Número original:", numero);
console.log("Número arredondado:", arredondado);