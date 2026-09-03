'use client';
import Header from "../components/header";
import styles from "./page.module.css";

export default function ListAluno() {
   
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <section className={styles.listPanel}>
                    <h2>Listagem de Alunos</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Série</th>
                                    <th>RA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Luana Ramos</td>
                                    <td>18</td>
                                    <td>3A</td>
                                    <td>232300</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div> 
    )
   }