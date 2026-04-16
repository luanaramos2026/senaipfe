import "./perfil.css";

export default function Perfil() {
  return (
    <div className="perfil-container">
      
      {/* HEADER */}
      <div className="perfil-header">
        <div className="banner"></div>

        <div className="perfil-info">
          <img
            className="avatar"
            src="https://i.pravatar.cc/150"
            alt="foto"
          />

          <div className="dados">
            <h2>Nome Sobrenome</h2>
            <p>Desenvolvedora | HTML | CSS | Typescript | Node</p>
            <span>Cidade, Estado, País</span>

            <div className="botoes">
              <button className="btn-primario">Mensagem</button>
              <button className="btn-secundario">Mais</button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="perfil-body">
        
        {/* ESQUERDA */}
        <div className="col-esquerda">

          {/* DESTAQUES */}
          <section className="card">
            <h3>Destaques</h3>
            <div className="grid">
              {[1,2,3].map((item) => (
                <div className="post" key={item}>
                  <img src="https://picsum.photos/300/200" />
                  <p>Legenda da publicação...</p>
                </div>
              ))}
            </div>
          </section>

          {/* ATIVIDADES */}
          <section className="card">
            <h3>Atividades</h3>

            <div className="atividade">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
            </div>

            <div className="atividade">
              <p>
                Outra atividade aqui simulando postagem...
              </p>
            </div>
          </section>

          {/* SOBRE */}
          <section className="card">
            <h3>Sobre</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </section>

          {/* EXPERIÊNCIA */}
          <section className="card">
            <h3>Experiências</h3>

            <div className="experiencia">
              <h4>Empresa</h4>
              <p>Fullstack Developer</p>
              <span>2022 - atual</span>
            </div>

            <div className="experiencia">
              <h4>Empresa</h4>
              <p>Front-end Developer</p>
              <span>2021 - 2022</span>
            </div>
          </section>

          {/* FORMAÇÃO */}
          <section className="card">
            <h3>Formação acadêmica</h3>
            <p>Instituição de ensino</p>
            <span>2015 - 2019</span>
          </section>

        </div>

        {/* DIREITA */}
        <div className="col-direita">
          <section className="card">
            <h3>Pessoas que talvez você conheça</h3>

            {[1,2,3,4].map((item) => (
              <div className="pessoa" key={item}>
                <img src="https://i.pravatar.cc/100" />
                <div>
                  <p>Nome Sobrenome</p>
                  <button>Conectar</button>
                </div>
              </div>
            ))}
          </section>
        </div>

      </div>
    </div>
  );
}