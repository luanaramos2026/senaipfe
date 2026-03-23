import { useContext } from "react";
import { TemaContexto } from "../contexts/TemaContexto.jsx";

export default function Header() {
    const { tema, mudarTema } = useContext(TemaContexto);

    return (
        <header className={`header-${tema}`}>
            <h1>Meu primeiro site com tema de contexto</h1>
            <button onClick={mudarTema}>
                Mudar tema para {tema === 'light' ? 'escuro' : 'claro'}
            </button>
        </header>
    );
}
