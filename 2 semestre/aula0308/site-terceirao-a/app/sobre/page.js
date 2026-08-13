import Header from "../components/header";
import Footer from "../components/footer";

export default function Sobre() {
  return (
    <>
      <Header />

      <main className="sobre">
        <h3>Sobre a Turma</h3>

        <div className="cardSobre">
          <h6>Terceiro A - SESI Mirandópolis</h6>

          <p>
            Este site foi criado para reunir os melhores momentos da turma
            Terceiro A. Aqui você encontrará fotos, recordações e informações
            sobre nossa trajetória durante o Ensino Médio.
          </p>

          <h6 style={{ marginTop: "30px" }}>Informações da Turma</h6>

          <div className="informacoes">
            <div className="item">
              <span>🏫 Escola</span>
              <p>SESI Mirandópolis</p>
            </div>

            <div className="item">
              <span>🎓 Turma</span>
              <p>Terceiro A</p>
            </div>

            <div className="item">
              <span>📅 Ano</span>
              <p>2026</p>
            </div>

            <div className="item">
              <span>🎯 Objetivo</span>
              <p>Guardar nossas melhores lembranças.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}