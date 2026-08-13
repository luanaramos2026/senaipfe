import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import NewsCard from "../components/newsCard";
import styles from "./categorias.module.css";

export default function Categorias() {
  const categoriesList = [
    {
      id: "esportes",
      name: "Esportes SESI",
      icon: "🏆",
      count: "24 Matérias",
      description: "Liga de Vôlei, Jogos do SESI, natação, corridas corporativas e incentivo aos atletas da indústria.",
      link: "/categorias/esportes",
      badgeColor: "red",
      featured: true,
    },
    {
      id: "robotica",
      name: "Robótica & STEM",
      icon: "🤖",
      count: "18 Matérias",
      description: "Competições FLL, programação, soluções tecnológicas desenvolvidas por estudantes SESI.",
      link: "#robotica",
      badgeColor: "red",
    },
    {
      id: "educacao",
      name: "Educação & Cursos",
      icon: "🎓",
      count: "32 Matérias",
      description: "Ensino Fundamental, Médio, EJA e cursos de qualificação profissional gratuitos.",
      link: "#educacao",
      badgeColor: "blue",
    },
    {
      id: "saude",
      name: "Saúde & Bem-Estar",
      icon: "🩺",
      count: "15 Matérias",
      description: "Ergonomia no trabalho, exames preventivos, ginástica laboral e saúde emocional.",
      link: "#saude",
      badgeColor: "gold",
    },
    {
      id: "cultura",
      name: "Cultura & Lazer",
      icon: "🎭",
      count: "12 Matérias",
      description: "Teatro SESI, exposições de arte, shows musicais gratuitos e oficinas culturais.",
      link: "#cultura",
      badgeColor: "blue",
    },
    {
      id: "industria",
      name: "Indústria 4.0",
      icon: "🏭",
      count: "20 Matérias",
      description: "Tendências de mercado, automação, sustentabilidade e inovação industrial.",
      link: "#industria",
      badgeColor: "red",
    },
  ];

  const categoryArticles = [
    {
      id: 101,
      title: "Atletas SESI garantem 5 medalhas de ouro no Campeonato Paulista de Natação",
      category: "Esportes",
      categoryColor: "red",
      date: "12 de Agosto, 2026",
      readTime: "3",
      excerpt: "Equipe de alto rendimento do SESI-SP se destaca na competição estadual na categoria sênior.",
      image: "/images/sesi_sports.jpg",
    },
    {
      id: 102,
      title: "Novo laboratório de Inteligência Artificial é inaugurado no campus SESI-SENAI",
      category: "Tecnologia",
      categoryColor: "blue",
      date: "10 de Agosto, 2026",
      readTime: "4",
      excerpt: "Espaço conta com supercomputadores e ferramentas avançadas para aprendizado prático.",
      image: "/images/sesi_robotics.jpg",
    },
    {
      id: 103,
      title: "SESI lança cartilha de Saúde Mental e Gestão de Estresse nas empresas",
      category: "Saúde",
      categoryColor: "gold",
      date: "08 de Agosto, 2026",
      readTime: "6",
      excerpt: "Material educativo gratuito traz orientações práticas para gestores e colaboradores da indústria.",
      image: "/images/sesi_education.jpg",
    },
  ];

  return (
    <>
      <Header />
      <main>
        <div className="page-title-section">
          <h1 className="page-title">Categorias de Notícias</h1>
          <p className="page-subtitle">
            Explore os conteúdos organizados por eixos temáticos da rede SESI.
          </p>
        </div>

        {/* Grid de Categorias */}
        <section className={styles.categoryGrid}>
          {categoriesList.map((cat) => (
            <div key={cat.id} className={`${styles.categoryCard} ${cat.featured ? styles.featuredCard : ''}`}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span className={`badge badge-${cat.badgeColor}`}>{cat.count}</span>
              </div>
              <h3 className={styles.categoryName}>{cat.name}</h3>
              <p className={styles.categoryDesc}>{cat.description}</p>
              <div className={styles.categoryFooter}>
                <Link href={cat.link} className={cat.featured ? "btn btn-primary" : "btn btn-outline"}>
                  Acessar Categoria {cat.featured && "✨ Sub-rota"} →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Artigos Selecionados */}
        <section className={styles.articlesSection}>
          <div className="page-title-section" style={{ marginTop: "3rem" }}>
            <h2 className="page-title">Em Destaque nas Categorias</h2>
            <p className="page-subtitle">Principais notícias selecionadas em cada área de atuação.</p>
          </div>

          <div className="news-grid">
            {categoryArticles.map((article) => (
              <NewsCard key={article.id} {...article} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}