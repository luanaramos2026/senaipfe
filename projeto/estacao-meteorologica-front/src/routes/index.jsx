import { Routes, Route } from "react-router-dom";

import Login from '../pages/login'
// import Registro from '../pages/registro'
// import Dashboard from '../pages/deshboard'
// import Cadastro from '../pages/cadastro'
// import Relatorio from '../pages/relatorio'
// import NotFound from '../pages/notfound'

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Login />} />
           {/* <Route path="/registro" element={Registro}/>
            <Route path="/dashboard" element={Dashboard}/>
            <Route path="/cadastro" element={Cadastro}/>
            <Route path="/relatorio" element={Relatorio}/>
            <Route path="*" element={NotFound}/> */}
        </Routes>
    )
}