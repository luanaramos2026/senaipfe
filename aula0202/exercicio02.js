let op = '+'
const calcular = function (num1, num2, op){
    if (op == '+') console.log(num1 + num2);
    else if (op == '-') console.log(num1 - num2);
    else if (op == '*') console.log(num1 * num2);
    else if (op == '/') console.log(num1 / num2);
    else console.log('Operação inválida');
         }

calcular(30, 20, '*')
