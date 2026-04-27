import Header from '../../components/header'
import './relatorio.css'

export default function Relatorio(){
    const leituras = [
        {horario: "12:00", qualidadeAr: "Boa", iqa: 42, temperatura:'26ºC', umidade: "68%"},
        {horario: "11:00", qualidadeAr: "Moderada", iqa: 55, temperatura:'50ºC', umidade: "50%"},
        {horario: "18:00", qualidadeAr: "Boa", iqa: 60, temperatura:'26ºC', umidade: "75%"},
        {horario: "10:00", qualidadeAr: "Ruim", iqa: 42, temperatura:'39ºC', umidade: "68%"}
    ]

    return(
        <div className='container'>
            <Header />

            <h3>Relatório Estação Meteorológica</h3>
            <p className="subtitulo">
                Monitoramento da temperatura e umidade em tempo real
            </p>

            <section className='graficos'>
                {/* gráficos futuramente */}
            </section>

            <section className='tabela-leituras'>
                <table>
                    <thead>
                        <tr>
                            <th>Horário</th>
                            <th>Qualidade do ar</th>
                            <th>IQA</th>
                            <th>Temperatura</th>
                            <th>Umidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leituras.map((item, index) =>(
                                <tr key={index}>
                                    <td>{item.horario}</td>
                                    <td>{item.qualidadeAr}</td>
                                    <td>{item.iqa}</td>
                                    <td>{item.temperatura}</td>
                                    <td>{item.umidade}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}