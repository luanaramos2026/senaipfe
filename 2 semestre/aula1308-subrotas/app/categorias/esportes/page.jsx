import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";
import NewsCard from "../../components/newsCard";
import styles from "./esportes.module.css";

export default function Esportes() {
  const mockSportsArticles = [
    {
      id: 201,
      title: "SESI Vôlei vence partida decisiva e avança para a grande final da Liga Nacional",
      category: "Vôlei SESI",
      categoryColor: "red",
      date: "13 de Agosto, 2026",
      readTime: "4",
      excerpt: "Em ginásio lotado, a equipe do SESI dominou o placar por 3 sets a 1 com atuação brilhante da torcida.",
      image: "/images/sesi_sports.jpg",
    },
    {
      id: 202,
      title: "Inscrições abertas para o Circuito SESI de Corridas de Rua 2026",
      category: "Atletismo",
      categoryColor: "red",
      date: "11 de Agosto, 2026",
      readTime: "3",
      excerpt: "Etapa da capital terá percursos de 5km e 10km, além de caminhada da saúde para toda a família.",
      image: "/images/sesi_sports.jpg",
    },
    {
      id: 203,
      title: "Torneio Inter-Empresas de Futsal reúne 64 equipes da indústria paulista",
      category: "Futsal",
      categoryColor: "blue",
      date: "09 de Agosto, 2026",
      readTime: "5",
      excerpt: "Competição tradicional promove integração e incentivo à prática esportiva entre os trabalhadores.",
      image: "/images/sesi_sports.jpg",
    },
  ];

  const mockMatchScores = [
    { id: 1, sport: "Vôlei Masculino", teamA: "SESI-SP", scoreA: 3, teamB: "Sada Cruzeiro", scoreB: 1, status: "Encerrado" },
    { id: 2, sport: "Basquete Masculino", teamA: "SESI Franca", scoreA: 89, teamB: "Flamengo", scoreB: 82, status: "Encerrado" },
    { id: 3, sport: "Vôlei Feminino", teamA: "SESI Bauru", scoreA: 3, teamB: "Osasco", scoreB: 2, status: "Encerrado" },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/categorias">Categorias</Link>
          <span>/</span>
          <span className={styles.currentBreadcrumb}>Esportes</span>
        </nav>

        <div className="page-title-section">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="badge badge-red">Sub-rota Ativa</span>
            <h1 className="page-title">Portal Esportes SESI</h1>
          </div>
          <p className="page-subtitle">
            O canal oficial do esporte de rendimento, formação de atletas e saúde corporativa da indústria.
          </p>
        </div>

        {/* Banner Esportes Hero */}
        <section className={styles.sportsHero}>
          <div className={styles.sportsHeroGrid}>
            <div className={styles.sportsHeroContent}>
              <span className="badge badge-red">🏆 Liga Nacional de Vôlei</span>
              <h2>SESI Esporte: Tradição e Excelência no Formação de Campeões</h2>
              <p>
                Com infraestrutura de ponta e centros de treinamento modernos, o SESI fomenta o esporte desde as categorias de base até as grandes ligas profissionais.
              </p>
              <div className={styles.heroButtons}>
                <button className="btn btn-primary">Conhecer Modalidades</button>
                <button className="btn btn-outline">Calendário de Jogos 2026</button>
              </div>
            </div>
            <div className={styles.heroImageCard}>
              <img src="/images/sesi_sports.jpg" alt="Vôlei SESI" className={styles.sportsImg} />
            </div>
          </div>
        </section>

        {/* Tabela de Placares Recentes */}
        <section className={styles.scoresSection}>
          <h3 className={styles.scoresTitle}>⚡ Resultados Recentes do SESI</h3>
          <div className={styles.scoresGrid}>
            {mockMatchScores.map((match) => (
              <div key={match.id} className={styles.scoreCard}>
                <span className={styles.sportBadge}>{match.sport}</span>
                <div className={styles.matchTeams}>
                  <div className={styles.team}>
                    <span className={styles.teamName}>{match.teamA}</span>
                    <span className={`${styles.score} ${match.scoreA > match.scoreB ? styles.winner : ''}`}>{match.scoreA}</span>
                  </div>
                  <span className={styles.vs}>vs</span>
                  <div className={styles.team}>
                    <span className={styles.teamName}>{match.teamB}</span>
                    <span className={`${styles.score} ${match.scoreB > match.scoreA ? styles.winner : ''}`}>{match.scoreB}</span>
                  </div>
                </div>
                <span className={styles.matchStatus}>{match.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Grid de Notícias de Esportes */}
        <section className={styles.newsSection}>
          <div className="page-title-section" style={{ marginTop: "2rem" }}>
            <h2 className="page-title">Notícias & Coberturas Esportivas</h2>
            <p className="page-subtitle">Acompanhe os bastidores, entrevistas e conquistas dos atletas SESI.</p>
          </div>

          <div className="news-grid">
            {mockSportsArticles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}