

import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Coluna 1: Marca e Descrição */}
        <div className={styles.colBrand}>
          <div className={styles.footerLogo}>
            <span className={styles.logoBadge}>SESI</span>
            <span className={styles.logoText}>NEWS</span>
          </div>
          <p className={styles.brandDesc}>
            Portal oficial de informação, inovação, educação e esportes do Serviço Social da Indústria (SESI).
          </p>
          <div className={styles.badgeLine}>
            <span className={styles.pillBadge}>SESI - Transformando Vidas</span>
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className={styles.colLinks}>
          <h4 className={styles.colTitle}>Navegação rápida</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/categorias">Categorias de Notícias</Link></li>
            <li><Link href="/categorias/esportes">Central de Esportes SESI</Link></li>
            <li><a href="#cursos">Cursos & Capacitação</a></li>
          </ul>
        </div>

        {/* Coluna 3: Categorias Populares */}
        <div className={styles.colLinks}>
          <h4 className={styles.colTitle}>Destaques</h4>
          <ul className={styles.linkList}>
            <li><a href="#robotica">Robótica & STEM</a></li>
            <li><a href="#jogos">Jogos do SESI 2026</a></li>
            <li><a href="#saude">Saúde do Trabalhador</a></li>
            <li><a href="#industria">Indústria 4.0</a></li>
          </ul>
        </div>

        {/* Coluna 4: Contato & Atendimento */}
        <div className={styles.colContact}>
          <h4 className={styles.colTitle}>Atendimento SESI</h4>
          <p className={styles.contactItem}>📍 Av. Paulista, 1313 - São Paulo/SP</p>
          <p className={styles.contactItem}>📞 Central: 0800 055 2300</p>
          <p className={styles.contactItem}>✉️ contato@sesinews.com.br</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {new Date().getFullYear()} SESI - Serviço Social da Indústria. Todos os direitos reservados.</p>
          <div className={styles.legalLinks}>
            <a href="#privacidade">Política de Privacidade</a>
            <span>•</span>
            <a href="#termos">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}