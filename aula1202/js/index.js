const corpo = document.querySelector('body')
const titulo = document.querySelector('.titulo')
const container = document.querySelector('#container')
const imagem = document.querySelector('#imagem')
const botao = document.querySelector('#botao')

corpo.style.backgroundColor = 'rgb(0, 3, 158)';
corpo.style.color = 'white';
titulo.textContent= 'Adicionando elemento via JS';
container.style.width='94%';
container.style.margin='0 auto';
container.style.backgroundColor = '#5a76a6'

let anuncio = '<h2>Curso dev com ia - novidade !!!<h2>';
container.innerHTML += anuncio;

//adicionando atributos
imagem.setAttribute('src','./img/cidade-tech.jpg');
//imagem.removeAttribute('src)//remove atributos

//adicionando classes
imagem.classList.add('imagem')

//eventos
botao.addEventListener('click', () => {
    console.lo('clique no botão' + contador ++)
})