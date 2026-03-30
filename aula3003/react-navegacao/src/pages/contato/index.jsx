import { Link } from 'react-router-dom'
import './contato.css'

export default function Contato() {
    return (
        <section className="container">
            <h2 className="titulo">Contato</h2>

            <form className="formulario">
                <input
                    type="text"
                    placeholder="Seu nome"
                    required
                />

                <input
                    type="email"
                    placeholder="Seu email"
                    required
                />

                <input
                    type="tel"
                    placeholder="Seu número"
                    required
                />

                <button type="submit" className="botao">
                    Enviar
                </button>
            </form>

            <Link to="/" className="botao-voltar">Voltar</Link>
        </section>
    )
}