

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Categorias", path: "/categorias" },
    { label: "Esportes SESI", path: "/categorias/esportes" },
  ];

  return (
    <header className={styles.header}>
      {/* Top Bar Institucional SESI/SENAI */}
      <div className={styles.topbar}>
        <div className={styles.topbarContainer}>
          <div className={styles.institutionalBadges}>
            <span className={styles.sesiTag}>SESI</span>
            <span className={styles.divider}>|</span>
            <span className={styles.senaiTag}>SENAI</span>
            <span className={styles.subtext}>Serviço Social da Indústria</span>
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.portalDate}>Portal de Notícias e Eventos 2026</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          {/* Logo Brand */}
          <Link href="/" className={styles.brand}>
            <div className={styles.logoBadge}>
              <span>SESI</span>
            </div>
            <div className={styles.brandTitleGroup}>
              <span className={styles.brandTitle}>NEWS</span>
              <span className={styles.brandSubtitle}>INFORMAÇÃO & INOVAÇÃO</span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                return (
                  <li key={item.path} className={styles.navItem}>
                    <Link
                      href={item.path}
                      className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className={styles.menuToggle}
            aria-label="Abrir menu de navegação"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}