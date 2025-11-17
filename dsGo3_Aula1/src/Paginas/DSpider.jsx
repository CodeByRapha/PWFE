import { Outlet } from 'react-router-dom';
import { Menu } from '../Componentes/Menu';

export function DSpider() {
  return (
    <main 
      className="corpo"
      role="main" 
      aria-label="Área principal da aplicação" 
    >

      <Outlet />

      <Menu />
    </main>
  );
}
