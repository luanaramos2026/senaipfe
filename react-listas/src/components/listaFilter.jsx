const estudantes = [
    { id: 1, nome: 'Luana Ramod', disciplina: 'portugues', ra:123444},
    { id: 2, nome: 'Mavie Ramos', disciplina: 'geografia', ra:123323},
    { id: 3, nome: 'Henry Ramos', disciplina: 'matematica', ra:143234}
]


export default function ListaFilter({titulo}){
    const lista = estudantes.filter(estudante => estudante.disciplina == 'matematica')
   
    const listaEstudantes = lista.map((estudante) =>{
        return <li key={estudante.id}>
            <h3>{estudante.nome}</h3>
            <p>{estudante.ra}</p>
            <p>{estudante.idade}</p>
        </li>
    })
    return(
    <>
        <h1>{titulo}</h1>
        <ul>
            {listaEstudantes}
        </ul>
    </>
    )
}
