import { createContext, useState } from "react";

export const TemaContexto = createContext(null);

export function TemaProvedor({ children }) {
    const [tema, setTema] = useState("light");

    function mudarTema() {
        setTema((prev) => (prev === "light" ? "dark" : "light"));
    }

    return (
        <TemaContexto.Provider value={{ tema, mudarTema }}>
            {children}
        </TemaContexto.Provider>
    );
}