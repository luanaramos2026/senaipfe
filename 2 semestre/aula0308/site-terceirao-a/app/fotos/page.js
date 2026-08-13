import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";

import foto1 from "../img/foto1.jpg";
import foto2 from "../img/foto2.jpg";

export default function Fotos() {
  return (
    <>
      <Header />

      <main className="fotos">
        <h3>Galeria da Turma</h3>
        <p>Confira alguns dos nossos melhores momentos.</p>

        <div className="galeria">
          <div className="foto">
            <Image
              src={foto1}
              alt="Primeiro dia de aula"
              width={350}
              height={250}
              style={{ objectFit: "cover" }}
            />
            <div className="legenda">Primeiro dia de aula</div>
          </div>

          <div className="foto">
            <Image
              src={foto2}
              alt="SENAI"
              width={350}
              height={250}
              style={{ objectFit: "cover" }}
            />
            <div className="legenda">SENAI</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}