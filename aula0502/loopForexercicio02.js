let prompt= require('prompt-sync')();
let idade = prompt("Digite sua idade:");

if (idade >=16){
    console.log("Você pode pegar livro. ");
}
else {
    console.log("Você não tem idade para pegar livro. ");
}
if(idade >=18){
    console.log("Você é maior de idade. ")
}
else{
    console.log("Você não é maior de idade.")
}