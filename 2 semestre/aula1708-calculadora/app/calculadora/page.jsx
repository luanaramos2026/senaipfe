'use client';
import { useState } from "react";
import Header from "../components/header";
import styles from './page.module.css';

export default function Calculadora(){
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [result, setResult] = useState('0');
    const [error, setError] = useState('');

    function formatResult(val){
        if (typeof val === 'number'){
            if (Number.isInteger(val)) return String(val);
            return String(parseFloat(val.toFixed(6)).toString());
        }
        return String(val);
    }

    function Somar(a, b){
        setError('');
        setResult(formatResult(Number(a) + Number(b)));
    }

    function Subtrair(a, b){
        setError('');
        setResult(formatResult(Number(a) - Number(b)));
    }

    function Multiplicar(a, b){
        setError('');
        setResult(formatResult(Number(a) * Number(b)));
    }

    function Dividir(a, b){
        setError('');
        if (Number(b) === 0){
            setError('Erro: divisão por zero');
            setResult('0');
            return;
        }
        setResult(formatResult(Number(a) / Number(b)));
    }

    function RaizQuadrada(a){
        setError('');
        if (Number(a) < 0){
            setError('Erro: raiz quadrada de número negativo');
            setResult('0');
            return;
        }
        setResult(formatResult(Math.sqrt(Number(a))));
    }

return(
    <>
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <div className={styles.inputs}>
          <label htmlFor="n1">Número 1</label>
          <input type="number" value={n1} onChange={(e) => setN1(e.target.value)}/>
          <label htmlFor="n2">Número 2</label>
          <input type="number" value={n2} onChange={(e) => setN2(e.target.value)}/>
        </div>

        <div className={styles.resultBox}>
          <span className={styles.resultLabel}>Resultado</span>
          <div className={styles.result}>{error ? error : result}</div>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => Somar(n1, n2)}>Somar</button>
          <button onClick={() => Subtrair(n1, n2)}>Subtrair</button>
          <button onClick={() => Multiplicar(n1, n2)}>Multiplicar</button>
          <button onClick={() => Dividir(n1, n2)}>Dividir</button>
          <button onClick={() => RaizQuadrada(n1)}>Raiz (n1)</button>
          <button onClick={() => { setN1(0); setN2(0); setResult('0'); setError(''); }}>Limpar</button>
        </div>
      </main>
    </div>
    </>
)
}