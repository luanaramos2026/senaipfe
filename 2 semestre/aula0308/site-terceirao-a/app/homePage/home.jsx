import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import Turma from "../img/turma.jpg";

export default function(){
    return(
        <>
        <Header />
        <main>
            <section>
                <Image src={Turma}/>
            </section>
            <section>
                <h3>Informações</h3>
                <div>
                    <h6>Formatura 18/12/2026</h6>                
                    <p>Todos estarao reunidos para viver
                    esse momento especial em nossas vidas</p>
                </div>
                <div>
                    <h6>Próximo trote 11/08/2026</h6>
                    <p>Tema do trote: personagens</p>
                </div>
            </section>
        </main>
        </>
    )
}