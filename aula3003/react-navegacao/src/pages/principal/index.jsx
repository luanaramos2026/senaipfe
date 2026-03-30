import { Link } from 'react-router-dom'
import './principal.css'

export default function Principal() {
    return (
        <div className="principal">

            
            <header className="header">
                <h1>Meu Site Exemplo</h1>
                <nav>
                    <ul className="menu">
                        <li><Link to="/">Principal</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                    </ul>
                </nav>
            </header>


            <section className="banner">
                <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                    alt="Banner do site"
                />
                <div className="banner-text">
                    <h2>Bem-vindo ao React DOM</h2>
                    <p>Exemplo de página criada com React + Vite</p>
                </div>
            </section>


            <section className="cards">
                <div className="card">
                    <h3>Card 1</h3>
                    <p>Um exemplo simples de card com conteúdo ilustrativo.</p>
                </div>

                <div className="card">
                    <h3>Card 2</h3>
                    <p>Outro card demonstrando estrutura com CSS separado.</p>
                </div>
            </section>


            <footer className="footer">
                <p>© 2026 - Meu Site Exemplo | Desenvolvido em React</p>
            </footer>

        </div>
    )
}