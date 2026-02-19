let prompt= require('prompt-sync')();
let numeroUsuario = Number(prompt("Digite um número:"));


let numeroAleatorio = Math.floor(Math.random() * 10) + 1;

if (numeroUsuario === numeroAleatorio) {
  console.log("Parabéns! Você acertou.");
} else {
  console.log("Você errou. ");
}

console.log("Número digitado:", numeroUsuario);
console.log("Número aleatório:", numeroAleatorio);