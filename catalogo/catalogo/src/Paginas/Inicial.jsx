import { Cabecalho } from "../Componentes/Cabecalho";
import { BarraNavegacao } from "../Componentes/BarraNavegacao";

//Outlet é um espaço que serve para renderizar o componente da rota. então se clicar no Link "perfil", vai exibir o componente que corresponde ao endereço perfil em Rotas
import { Outlet } from 'react-router-dom';



//estrutura 
export function Inicial(){
    return(
        <>
            <Cabecalho/>
            <BarraNavegacao />
            <Outlet />
        </>
    )
}