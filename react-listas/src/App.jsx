import ListaSimples from "./components/listaSimples"
import ListaMap from "./components/listaMap"
import ListaFrutas from "./components/ListaFrutas"
import ListaFilter from "./components/listaFilter"


function App() {

  return (
    <>
      <ListaFrutas título='Lista de Frutas' />
      <ListaFilter título='filtro'/>
    </>
  )
}

export default App
