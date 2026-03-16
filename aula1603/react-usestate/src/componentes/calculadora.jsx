import { useState } from "react";

export default function Calculadora({ titulo }) {

const [num1, setNum1] = useState("");
const [num2, setNum2] = useState("");
const [resultado, setResultado] = useState("");
const [erro, setErro] = useState("");

function validar(){
 if(num1 <= 0 || num2 <= 0){
  setErro("Não são permitidos números zero ou negativos");
  return false;
 }
 setErro("");
 return true;
}

function somar(e){
 e.preventDefault();
 if(!validar()) return;
 setResultado(Number(num1) + Number(num2));
}

function subtrair(e){
 e.preventDefault();
 if(!validar()) return;
 setResultado(Number(num1) - Number(num2));
}

function multiplicar(e){
 e.preventDefault();
 if(!validar()) return;
 setResultado(Number(num1) * Number(num2));
}

function dividir(e){
 e.preventDefault();
 if(!validar()) return;
 setResultado(Number(num1) / Number(num2));
}

function potencia(e){
 e.preventDefault();
 if(!validar()) return;
 setResultado(Number(num1) ** Number(num2));
}

function raiz(e){
 e.preventDefault();
 if(num1 <= 0){
  setErro("Não pode raiz de zero ou negativo");
  return;
 }
 setErro("");
 setResultado(Math.sqrt(Number(num1)));
}

function limpar(){
 setNum1("");
 setNum2("");
 setResultado("");
 setErro("");
}

return(
<>
<h1 className="titulo">{titulo}</h1>

<div className="container">

<form>

<label>Número 1</label>
<input
type="number"
value={num1}
onChange={(e)=>setNum1(e.target.value)}
/>

<label>Número 2</label>
<input
type="number"
value={num2}
onChange={(e)=>setNum2(e.target.value)}
/>

<div className="botoes">

<button onClick={somar}>+</button>
<button onClick={subtrair}>-</button>
<button onClick={multiplicar}>*</button>
<button onClick={dividir}>/</button>
<button onClick={potencia}>x²</button>
<button onClick={raiz}>√</button>
<button type="button" onClick={limpar}>Limpar</button>

</div>

{erro && <p className="erro">{erro}</p>}

<h2>Resultado: {resultado}</h2>

</form>

</div>
</>
)

}
