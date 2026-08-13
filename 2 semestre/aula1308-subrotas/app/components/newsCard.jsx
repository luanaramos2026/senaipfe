import styles from "./newsCard.module.css";

export default function NewsCard({ title, category, date, readTime, excerpt, image, categoryColor = "red" }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
        <span className={`badge badge-${categoryColor} ${styles.cardBadge}`}>
          {category}
        </span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.metaRow}>
          <span className={styles.date}>📅 {date}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.readTime}>⏱️ {readTime} min de leitura</span>
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.cardFooter}>
          <button className="btn btn-outline" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}>
            Ler Matéria →
          </button>
        </div>
      </div>
    </article>
  );
}
