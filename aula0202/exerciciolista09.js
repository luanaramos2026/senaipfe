let preco = 200;
let cupom = "PRATA"; // BRONZE, PRATA, OURO

let desconto = 0;

if (cupom === "BRONZE") {
    desconto = 0.05;
} else if (cupom === "PRATA") {
    desconto = 0.10;
} else if (cupom === "OURO") {
    desconto = 0.15;
}

let precoFinal = preco - (preco * desconto);

console.log(precoFinal);
