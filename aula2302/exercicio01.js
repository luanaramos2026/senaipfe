class Livros {
    // atributos
    titulo = 'Dom Casmurro';
    autor = 'Machado de Assis';
    editora = 'Editora XYZ';
    ano = 1899;
    paginas = 256;
    genero = 'Romance';
    idioma = 'Português';
    preco = 39.90;

    // métodos
    ler() {
        console.log('Estou lendo o livro!');
    }

    mostrar() {
        console.log('Livro: ' + this.titulo + ' Autor: ' + this.autor +  ' Editora: ' + this.editora +  ' Ano: ' + this.ano + 
            ' Páginas: ' + this.paginas + ' Gênero: ' + this.genero + ' Idioma: ' + this.idioma + ' Preço: R$ ' + this.preco); 
    }
}

// criando o objeto
const livro1 = new Livros();
livro1.ler();
livro1.mostrar();