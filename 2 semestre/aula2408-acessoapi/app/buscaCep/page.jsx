'use client';

import { useState } from "react";
import styles from "./page.module.css";
import Header from "../components/header";

export default function BuscaCep() {
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleCepChange = (event) => {
        const somenteNumeros = event.target.value.replace(/\D/g, '').slice(0, 8);
        setCep(somenteNumeros);
        setMensagem('');
        setEndereco(null);
    };

    const search = async () => {
        if (cep.length !== 8) {
            setMensagem('Digite um CEP com 8 números para continuar.');
            setEndereco(null);
            return;
        }

        setCarregando(true);
        setMensagem('');

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!resposta.ok) throw new Error('Falha na resposta da API');

            const dados = await resposta.json();
            if (dados.erro) {
                setEndereco(null);
                setMensagem('Não encontramos um endereço para esse CEP.');
                return;
            }

            setEndereco(dados);
        } catch (err) {
            console.error("Não foi possível acessar a API", err);
            setEndereco(null);
            setMensagem('Não foi possível consultar agora. Tente novamente em instantes.');
        } finally {
            setCarregando(false);
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        search();
    };

    const cepFormatado = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.heroCopy}>
                        <p className={styles.eyebrow}>CONSULTA DE ENDERECO</p>
                        <h1>Encontre um lugar pelo CEP.</h1>
                        <p className={styles.subtitle}>Consulte endereços de todo o Brasil com rapidez e precisão.</p>
                    </div>
                    <div className={styles.heroMark} aria-hidden="true">BR</div>
                </section>

                <section className={styles.contentGrid}>
                    <form className={styles.searchPanel} onSubmit={handleSubmit}>
                        <div className={styles.panelHeading}>
                            <span className={styles.step}>01</span>
                            <div>
                                <h2>Qual CEP você procura?</h2>
                                <p>Informe somente os 8 números do código postal.</p>
                            </div>
                        </div>
                        <label className={styles.label} htmlFor="cep">Código postal</label>
                        <div className={styles.inputRow}>
                            <input
                                id="cep"
                                inputMode="numeric"
                                autoComplete="postal-code"
                                value={cepFormatado}
                                onChange={handleCepChange}
                                placeholder="00000-000"
                                aria-describedby={mensagem ? 'form-message' : undefined}
                            />
                            <button type="submit" disabled={carregando}>
                                {carregando ? 'Buscando...' : 'Buscar CEP'}
                            </button>
                        </div>
                        <div className={styles.formFooter}>
                            <span className={styles.counter}>{cep.length}/8</span>
                            <span>Fonte: ViaCEP</span>
                        </div>
                        {mensagem && <p id="form-message" className={styles.message} role="alert">{mensagem}</p>}
                    </form>

                    {endereco ? (
                        <section className={styles.resultPanel} aria-live="polite">
                            <div className={styles.resultTopline}><span className={styles.step}>02</span><span>ENDERECO ENCONTRADO</span></div>
                            <h2>{endereco.localidade}<span>, {endereco.uf}</span></h2>
                            <p className={styles.addressLine}>{endereco.logradouro || 'Logradouro nao informado'}</p>
                            <div className={styles.details}>
                                <div><span>Bairro</span><strong>{endereco.bairro || 'Nao informado'}</strong></div>
                                <div><span>CEP</span><strong>{endereco.cep}</strong></div>
                                <div><span>Complemento</span><strong>{endereco.complemento || 'Nao informado'}</strong></div>
                            </div>
                        </section>
                    ) : (
                        <section className={styles.emptyState} aria-live="polite">
                            <span className={styles.emptyNumber}>02</span>
                            <p>Seu resultado<br />aparecera aqui.</p>
                        </section>
                    )}
                </section>
            </main>
            <footer className={styles.footer}><span>BUSCA CEP</span><span>Enderecos brasileiros, em um so lugar.</span></footer>
        </div>
    );
}