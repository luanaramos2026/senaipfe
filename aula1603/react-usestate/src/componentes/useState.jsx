import { useState } from "react";

export default function UseState({ titulo }) {

  const [nome] = useState("Luana");
  const [idade] = useState("17");
  const [ra] = useState("2202100001");
  const [bolsa] = useState("500");

  return (
    <>
      <h1>{titulo}</h1>

      <h3>Nome: {nome}</h3>
      <h4>Idade: {idade}</h4>
      <h4>RA: {ra}</h4>
      <h4>Bolsa: {bolsa}</h4>
    </>
  );
}