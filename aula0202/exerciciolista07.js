let num1 = 10;
let num2 = 5;
let operador = "+"; // + - * /

let resultado;

if (operador === "+") {
    resultado = num1 + num2;
} else if (operador === "-") {
    resultado = num1 - num2;
} else if (operador === "*") {
    resultado = num1 * num2;
} else if (operador === "/") {
    resultado = num1 / num2;
} else {
    resultado = "Operador inválido";
}

console.log(resultado);
