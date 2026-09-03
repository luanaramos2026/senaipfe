import Link from "next/link";
import styles from "./header.module.css";

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link className={styles.brand} href='/'>
                    <span>Projeto Escola</span>
                </Link>
                <nav className={styles.nav}>
                <ul>
                    <li><Link className={styles.navLink} href='/'>Início</Link></li>
                    <li><Link className={styles.navLink} href='/cadaluno'>Alunos - Cadastro</Link></li>
                    <li><Link className={styles.navLink} href='/listaluno'>Alunos - Lista</Link></li>
                    <li><Link className={styles.navLink} href='/notaluno'>Alunos - Cadastro de Notas</Link></li>
                    <li><Link className={styles.navLink} href='/listnota'>Alunos - Lista de Notas</Link></li>
                </ul>
                </nav>
            </div>
        </header>
    )
}

