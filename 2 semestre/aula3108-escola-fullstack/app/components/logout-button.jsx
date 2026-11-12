'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./header.module.css";

export default function LogoutButton() {
    const router = useRouter();
    const [saindo, setSaindo] = useState(false);

    async function encerrarSessao() {
        setSaindo(true);

        try {
            const resposta = await fetch("/api/auth/logout", { method: "POST" });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao encerrar sessão.");
            }

            router.replace("/login");
        } catch (error) {
            alert(error.message || "Erro ao encerrar sessão.");
        } finally {
            setSaindo(false);
        }
    }

    return (
        <button
            className={styles.logoutButton}
            type="button"
            disabled={saindo}
            onClick={encerrarSessao}
        >
            {saindo ? "Saindo..." : "Sair"}
        </button>
    );
}
