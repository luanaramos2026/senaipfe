import Header from "../components/header";
import styles from "./page.module.css";


export default function Principal(){
    return(
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <h2>Bem vindo ao Sistema Escolar - Sesi Mirandópolis</h2>
                </div>
            </main>
        </div>
    )
}