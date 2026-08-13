"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import NewsCard from "../components/newsCard";
import styles from "./inicio.module.css";

export default function Inicio() {
  const mockFeaturedNews = {
    title: "Equipe de Robótica SESI Conquista Primeiro Lugar no Torneio Mundial de Inovação 2026",
    category: "Robótica & STEM",
    categoryColor: "red",
    date: "13 de Agosto, 2026",
    readTime: "4",
    excerpt: "Estudantes da rede SESI apresentaram um projeto revolucionário de automação sustentável para a indústria automotiva e conquistaram o prêmio principal em competição internacional.",
    image: "/images/sesi_robotics.jpg",
  };

  const mockNewsList = [
    {
      id: 1,
      title: "Jogos do SESI 2026: Mais de 10 mil atletas da indústria participam da fase estadual",
      category: "Esportes",
      categoryColor: "red",
      date: "12 de Agosto, 2026",
      readTime: "3",
      excerpt: "A cerimônia de abertura reuniu trabalhadores-atletas de centenas de empresas em um final de semana repleto de superação e espírito esportivo.",
      image: "/images/sesi_sports.jpg",
    },
    {
      id: 2,
      title: "SESI abre 5.000 vagas para cursos gratuitos de Capacitação e Indústria 4.0",
      category: "Educação",
      categoryColor: "blue",
      date: "11 de Agosto, 2026",
      readTime: "5",
      excerpt: "Oportunidades em inteligência artificial aplicada, programação e automação industrial para trabalhadores e comunidade em geral.",
      image: "/images/sesi_education.jpg",
    },
    {
      id: 3,
      title: "Programa SESI Viva Mais impulsiona qualidade de vida e saúde nas fábricas",
      category: "Saúde & Bem-Estar",
      categoryColor: "gold",
      date: "10 de Agosto, 2026",
      readTime: "4",
      excerpt: "Iniciativa de ergonomia, nutrição e apoio psicológico atinge a marca de 500 empresas parceiras atendidas neste semestre.",
      image: "/images/sesi_education.jpg",
    },
  ];

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        {/* Banner Hero principal */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrapper}>
            <img src={mockFeaturedNews.image} alt={mockFeaturedNews.title} className={styles.heroImage} />
            <div className={styles.heroOverlay}>
              <span className="badge badge-red" style={{ backgroundColor: "#E30613", color: "#FFF" }}>
                🔥 Destaque Principal
              </span>
              <h1 className={styles.heroTitle}>{mockFeaturedNews.title}</h1>
              <p className={styles.heroExcerpt}>{mockFeaturedNews.excerpt}</p>
              <div className={styles.heroMeta}>
                <span>📅 {mockFeaturedNews.date}</span>
                <span>•</span>
                <span>⏱️ {mockFeaturedNews.readTime} min de leitura</span>
                <button className="btn btn-primary" style={{ marginLeft: "auto" }}>
                  Ler Matéria Completa →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Faixa de Estatísticas SESI */}
        <section className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>150+</span>
            <span className={styles.statLabel}>Unidades Escolares</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Aprovação na Formação STEM</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>45 mil</span>
            <span className={styles.statLabel}>Atletas Beneficiados</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Compromisso com o Trabalhador</span>
          </div>
        </section>

        {/* Seção Notícias Recentes */}
        <section className={styles.newsSection}>
          <div className="page-title-section">
            <h2 className="page-title">Últimas Notícias da Indústria</h2>
            <p className="page-subtitle">Acompanhe as novidades sobre educação, esportes, robótica e tecnologia no SESI.</p>
          </div>

          <div className="news-grid">
            {mockNewsList.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </section>

        {/* Banner Newsletter */}
        <section className={styles.newsletterBanner}>
          <div className={styles.newsLetterContent}>
            <h3>Fique por dentro das novidades do SESI News!</h3>
            <p>Receba resumos semanais de eventos esportivos, vagas em cursos e conquistas da robótica.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Digite seu e-mail corporativo ou pessoal" className={styles.newsInput} />
            <button type="submit" className="btn btn-primary">Inscrever-se</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

