import Header from "../components/header";
import styles from "./page.module.css";

export default function ListNota() {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.listPanel}>
                    <h2>Listagem de Notas</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>T1</th>
                                    <th>T2</th>
                                    <th>N1</th>
                                    <th>N2</th>
                                    <th>N3</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Luana Ramos</td>
                                    <td>8,0</td>
                                    <td>9,0</td>
                                    <td>8,5</td>
                                    <td>9,0</td>
                                    <td>8,5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
