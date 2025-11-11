import { Outlet } from 'react-router-dom';
import { Menu } from '../Componentes/Menu';

export function DSGo() {
  return (
    <main className="corpo" style={{ minHeight: "100vh", position: "relative" }}>
      <Outlet />
      <Menu />
    </main>
  );
}
