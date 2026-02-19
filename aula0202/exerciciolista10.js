let peso = 70;      // kg
let altura = 1.75; // metros

let imc = peso / (altura ** 2);
let classificacao;

if (imc < 18.5) {
    classificacao = "Abaixo do peso";
} else if (imc < 25) {
    classificacao = "Normal";
} else if (imc < 30) {
    classificacao = "Sobrepeso";
} else {
    classificacao = "Obesidade";
}

console.log("IMC:", imc.toFixed(2));
console.log("Classificação:", classificacao);
