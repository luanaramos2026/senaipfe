import { useState } from "react";
import { Link } from "react-router-dom";
import imgEstacao from '../../assets/estacao.jpg';
import './principal.css'

export default function Register() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    return (
        <section className="login-container">
            <div className="login-box">
                <div className="login-image">
                    <img src={imgEstacao} alt="Estação" />
                    <div className="image-overlay">
                        <h1> Bem-vindo à Estação Meterológica SESI SENAI </h1>
                    </div>
                </div>

                <div className="login-form-side">
                    <div className="form-wrapper">
                        <h2> Cadastro </h2>
                        <p> Acesse sua conta para continuar. </p>
                       
                        <form className="login-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="usuario"
                                    placeholder="Usuário "
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                                <label htmlFor="usuario"> Usuário </label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    id="senha"
                                    placeholder="Senha "
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                                <label htmlFor="senha"> Senha </label>
                            </div>
                            <div className="input-group">
                                <input
                                    type="password"
                                    id="confsenha"
                                    placeholder="Confirme sua senha "
                                    value={confirmaSenha}
                                    onChange={(e) => setConfirmaSenha(e.target.value)}
                                />
                                <label htmlFor="confsenha"> Confirme a Senha </label>
                            </div>

                            <button type="submit" className="btn-login"> Cadastro </button>
                           
                            <div className="form-footer">
                                <span>Não tem conta? <button to="/signup"> Cadastre-se </button></span>
                            </div>
                           
                        </form>
                        <Link to='/' className="btn-voltar">Voltar</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}