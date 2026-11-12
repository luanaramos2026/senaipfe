import Link from "next/link";
import LogoutButton from "./logout-button";
import styles from "./header.module.css";

export default function Header({ hideLogout = false }){
    return(
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link className={styles.brand} href='/'>
                    <span>Projeto Escola</span>
                </Link>
                {!hideLogout && (
                    <nav className={styles.nav}>
                        <ul>
                            <li><Link className={styles.navLink} href='/'>Início</Link></li>
                            <li><Link className={styles.navLink} href='/cadaluno'>Alunos - Cadastro</Link></li>
                            <li><Link className={styles.navLink} href='/listaluno'>Alunos - Lista</Link></li>
                            <li><Link className={styles.navLink} href='/cadnota'>Alunos - Cadastro de Notas</Link></li>
                            <li><Link className={styles.navLink} href='/listnota'>Alunos - Lista de Notas</Link></li>
                            <li><Link className={styles.navLink} href='/caddisciplina'>Disciplinas - Cadastro</Link></li>
                            <li><Link className={styles.navLink} href='/listadisciplina'>Disciplinas - Lista</Link></li>
                            <li><Link className={styles.navLink} href='/cadprofessor'>Professores - Cadastro</Link></li>
                            <li><Link className={styles.navLink} href='/listaprofessor'>Professores - Lista</Link></li>
                            <li><LogoutButton /></li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    )
}
