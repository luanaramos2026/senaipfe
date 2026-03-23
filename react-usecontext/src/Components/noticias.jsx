import "./noticias.css";

const noticias = [
  {
    titulo: "Tecnologia na Educação",
    descricao: "Escolas estão usando tecnologia para melhorar o aprendizado dos alunos.",
    imagem: "https://i0.wp.com/blog.portaleducacao.com.br/wp-content/uploads/2022/02/365-O-que-e%CC%81-tecnologia_.jpg"
  },
  {
    titulo: "Sustentabilidade em Alta",
    descricao: "Projetos ecológicos ganham destaque no mundo todo.",
    imagem: "https://observatorio3setor.org.br/wp-content/uploads/2022/08/AdobeStock_505564014_Preview-e1661529353259.jpeg"
  },
  {
    titulo: "Avanços na Medicina",
    descricao: "Novas pesquisas prometem revolucionar tratamentos.",
    imagem: "https://wordpress-cms-revista-prod-assets.quero.space/uploads/2024/10/2149611222.jpg"
  }
];

export default function Noticias({ tema }) {
  return (
    <section className={`noticias-${tema}`}>
      <h2>Notícias</h2>

      <div className="cards">
        {noticias.map((n, index) => (
          <div key={index} className="card">
            <img src={n.imagem} alt={n.titulo} />
            <h3>{n.titulo}</h3>
            <p>{n.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
