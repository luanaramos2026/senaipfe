"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function JurosSimples() {
  const [capital, setCapital] = useState("");
  const [txJuros, setTxJuros] = useState("");
  const [tempo, setTempo] = useState("");
  const [periodo, setPeriodo] = useState("meses");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const calcularJuros = (e) => {
    e.preventDefault();

    const cap = parseFloat(capital);
    const tax = parseFloat(txJuros) / 100;
    const temp = parseFloat(tempo);

    if (!Number.isFinite(cap) || !Number.isFinite(tax) || !Number.isFinite(temp) || cap <= 0 || tax < 0 || temp <= 0) {
      setError("Preencha valores válidos: capital e tempo devem ser maiores que zero.");
      setResult(null);
      return;
    }

    const juros = cap * tax * temp;
    const montante = cap + juros;

    setError("");
    setResult({ juros, montante });
  };

  const limparFormulario = () => {
    setCapital("");
    setTxJuros("");
    setTempo("");
    setPeriodo("meses");
    setResult(null);
    setError("");
  };

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>FINANÇAS DO DIA A DIA</span>
          <h1>Entenda o crescimento do seu dinheiro.</h1>
          <p>Simule juros simples em poucos segundos e veja exatamente quanto seu investimento pode render.</p>
          <div className={styles.formula} aria-label="Fórmula de juros simples">
            <span>J = C × i × t</span>
            <small>juros = capital × taxa × tempo</small>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.step}>SIMULAÇÃO</span>
              <h2>Preencha os dados</h2>
            </div>
            <span className={styles.cardIcon}>R$</span>
          </div>

          <form onSubmit={calcularJuros}>
            <div className={styles.fields}>
              <label>
                Capital inicial
                <div className={styles.inputWrap}><span>R$</span><input type="number" min="0" step="0.01" placeholder="0,00" value={capital} onChange={(e) => setCapital(e.target.value)} /></div>
              </label>
              <label>
                Taxa de juros
                <div className={styles.inputWrap}><input type="number" min="0" step="0.01" placeholder="0,00" value={txJuros} onChange={(e) => setTxJuros(e.target.value)} /><span>%</span></div>
              </label>
              <label>
                Tempo aplicado
                <div className={styles.inputWrap}><input type="number" min="0" step="1" placeholder="0" value={tempo} onChange={(e) => setTempo(e.target.value)} /><select value={periodo} onChange={(e) => setPeriodo(e.target.value)} aria-label="Unidade de tempo"><option value="meses">meses</option><option value="anos">anos</option><option value="dias">dias</option></select></div>
              </label>
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <div className={styles.actions}>
              <button className={styles.primaryButton} type="submit">Calcular resultado <span aria-hidden="true">→</span></button>
              <button className={styles.clearButton} type="button" onClick={limparFormulario}>Limpar</button>
            </div>
          </form>

          {result ? (
            <div className={styles.result} aria-live="polite">
              <div className={styles.resultTitle}><span>RESULTADO DA SIMULAÇÃO</span><strong>✓ calculado</strong></div>
              <div className={styles.total}><small>Montante final</small><strong>{formatCurrency(result.montante)}</strong></div>
              <div className={styles.resultGrid}><div><span>Capital investido</span><strong>{formatCurrency(parseFloat(capital))}</strong></div><div><span>Juros gerados</span><strong className={styles.highlight}>{formatCurrency(result.juros)}</strong></div></div>
            </div>
          ) : (
            <div className={styles.emptyResult}><span>↗</span><p>Seu resultado aparecerá aqui<br /><small>Preencha os dados acima para começar.</small></p></div>
          )}
        </div>
      </section>
      <footer>Uma ferramenta simples para decisões mais conscientes.</footer>
    </main>
  );
}