import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { DSpider } from "../Paginas/DSpider";
import { Missao } from "../Paginas/Missao";
import { Inventario } from "../Paginas/Inventario";
import { Camera } from "../Paginas/Camera";
import { GeoLocalizacao } from "../Paginas/Geolocalizacao";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/dspider" element={<DSpider />}>
        <Route index element={<Missao />} /> {/* telaaaaa padrão */}
        <Route path="missao" element={<Missao />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="camera" element={<Camera />} />
        <Route path="mapa" element={<GeoLocalizacao />} />
      </Route>
    </Routes>
  );
}
