const estudantes = [
    {id: 1, nome: 'Luana Ramos', ra:123444, idade: 17},
    {id: 2, nome: 'Mavie Ramos', ra:123323, idade: 16},
    {id: 3, nome: 'Henry Ramos', ra:143234, idade: 16},
]
export default function ListaMap({título}){
    const listaEstudantes = estudantes.map((estudante) =>{
        return <li key={estudante.id}>
           <h3>{estudante.nome}</h3> 
            <p>{estudante.ra}</p>
            <p>{estudante.idade}</p>
        </li>
    })
    return(
        <>
            <h1>{título}</h1>
            <ul>
                {listaEstudantes}
            </ul>
        </>
        
    )
}