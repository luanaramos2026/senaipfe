class Bicicleta {
    modelo;
    marca;
    cor;
    #velocidadeMaxima; // atributo privado

    // setter da velocidade máxima (com validação)
    setVelocidadeMaxima(valor) {
        if (valor > 35) {
            console.log('Erro: a velocidade máxima não pode ser superior a 35 km/h.');
        } else {
            this.#velocidadeMaxima = valor;
        }
    }

    // getter da velocidade máxima
    getVelocidadeMaxima() {
        return this.#velocidadeMaxima;
    }

    // setters
    setModelo(valor) {
        this.modelo = valor;
    }

    setMarca(valor) {
        this.marca = valor;
    }

    setCor(valor) {
        this.cor = valor;
    }

    // getters
    getModelo() {
        return this.modelo;
    }

    getMarca() {
        return this.marca;
    }

    getCor() {
        return this.cor;
    }
}

// usando a classe
const bike = new Bicicleta();
bike.setModelo('Speed X');
bike.setMarca('Caloi');
bike.setCor('Vermelha');

bike.setVelocidadeMaxima(40); // não permitido
bike.setVelocidadeMaxima(30); // permitido

console.log(bike.getModelo());
console.log(bike.getMarca());
console.log(bike.getCor());
console.log('Velocidade máxima: ' + bike.getVelocidadeMaxima() + ' km/h');