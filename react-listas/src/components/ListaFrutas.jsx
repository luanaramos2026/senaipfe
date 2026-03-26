const frutas = [
    {id: 1, nome: 'maça'},
    {id: 2, nome: 'banana'},
    {id: 3, nome: 'uva'},
    {id: 4, nome: 'abacaxi'},
    {id: 5, nome: 'morango'},
]
export default function ListaFrutas({título}){
    const listaFrutas = frutas.map((fruta) =>{
        return <li key={fruta.id}>
            <p>{fruta.nome}</p>
        </li>
    })
    return(
        <>
            <h1>{título}</h1>
            <ul>
                {listaFrutas}
            </ul>
        </>
        
    )
}