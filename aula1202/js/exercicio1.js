
const titulo = document.createElement('h1');
titulo.textContent = 'Ontem ganhei flores';
document.body.appendChild(titulo);

const novaDiv = document.createElement('div');
document.body.appendChild(novaDiv);

novaDiv.style.width = '94%';
novaDiv.style.margin = '0 auto';
novaDiv.style.height = '100px';
novaDiv.style.backgroundColor = '#a70011';
novaDiv.style.textAlign = 'center';
novaDiv.style.paddingTop = '20px';



novaDiv.innerHTML = '<h2>Flores</h2>';

const tituloUC = document.createElement('h2');
tituloUC.innerText = 'Flores';
novaDiv.appendChild(tituloUC);

const divImagem = document.querySelector('#divImagem');

divImagem.style.width = '94%';
divImagem.style.margin = '20px auto';
divImagem.style.textAlign = 'center';

divImagem.innerHTML = `
    <img src="https://realfloresatelie.com.br/wp-content/uploads/2022/01/buque-de-rosas-line.jpg"
         alt="Imagem exemplo"
         style="width:300px; border-radius:10px;">
`;
