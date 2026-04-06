import { useState } from "react";
import { Link } from "react-router-dom";
import imgEstacao from '../../assets/estacao.jpg';
import './principal.css';

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

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
                        <h2> Login </h2>
                        <p> Acesse sua conta para continuar. </p>
                       
                        <form className="login-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="usuario"
                                    placeholder=" "
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
                                    placeholder=" "
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                                <label htmlFor="senha"> Senha </label>
                            </div>

                            <button type="submit" className="btn-login"> Entrar </button>
                           
                            <div className="form-footer">
                                <span>Não tem conta? <Link to="/signup"> Cadastre-se </Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
