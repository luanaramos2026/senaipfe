class Caneta{
    cor = 'Preta';
    marca = 'Faber Castel';
    ponta = 'Fina';
    qntdTinta = '5';
    tampa = false;

//metodo tem parenteses
    escrever(){
        return 'Começou a escrever';
    }
    sublinhar(qntdTinta){
        this.qntdTinta -= valor;
        return 'Quantidade restante de tinta' + this.qntdTinta;
    }
}
const canetaFina = new Caneta();
console.log(canetaFina.escrever());
console.log(canetaFina.sublinhar(2));