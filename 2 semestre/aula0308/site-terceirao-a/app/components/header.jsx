
import Link from "next/link";

export default function Header(){
    return(
        <header>
            <a href="/"><h1>Terceiro A</h1></a>
            <nav>
                <ul>
                    <li><Link href="/">home</Link></li>
                    <li><Link href="/sobre">sobre</Link></li>
                    <li><Link href="/fotos">fotos</Link></li>
                </ul>
            </nav>
        </header>    
    )
}