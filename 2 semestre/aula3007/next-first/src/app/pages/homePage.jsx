import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import Hotel from "../img/hotel.jpeg";

export default function HomePage() {
  return (
    <>
      <Header titulo="Hotel Inn Terraço" />

      <main className="home">
        <section className="banner">
          <Image
            src={Hotel}
            alt="Hotel Inn Terraço"
            className="imagem"
            priority
          />

          <div className="texto">
            <h2>Bem-vindo ao melhor hotel da região!</h2>

            <p>
              Viva uma experiência única com conforto, elegância e atendimento
              de qualidade. Aqui você encontra quartos aconchegantes,
              restaurante, piscina e uma vista incrível para tornar sua estadia
              inesquecível.
            </p>

            <button>Reserve Agora</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}