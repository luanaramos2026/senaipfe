



export default function Header({titulo}){
    return(
       <header>
        <h1>bem vindo(a) ao {titulo}</h1>
        <nav>
            <ul>
                <li><a href="#">home</a></li>
                <li><a href="#">sobre</a></li>
                <li><a href="#">contato</a></li>
            </ul>
        </nav>
       </header>
    )
}