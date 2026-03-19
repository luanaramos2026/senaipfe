import { useEffect, useState } from "react";

function ConectaAPI() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0]);
      });
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>Meus Dados</h2>

      {/* SUA IMAGEM */}
      <img 
        src="https://png.pngtree.com/png-vector/20240125/ourmid/pngtree-pink-butterfly-flying-png-image_11549629.png" 

      />

      {/* SEUS DADOS */}
      <p>Nome: Luana Ramos</p>
      <p>Email: luanaramos@gmail.com</p>
      <p>País: Brasil</p>
    </div>
  );
}

export default ConectaAPI;