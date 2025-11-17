import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { HeaderVoltar } from "../Componentes/HeaderVoltar"; 
import "../Style/_geolocalizacao.scss"; 

// correcao do ícone padrão do Leaflet (padrão do Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function GeoLocalizacao() {
  const [coordenadas, setCoordenadas] = useState(null);
  const [erro, setErro] = useState(null);

  // pedindo permissão de localização logo ao entrar na tela
  useEffect(() => {
    if (!navigator.geolocation) {
      setErro("❌ Seu navegador não suporta geolocalização.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordenadas({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => setErro("Erro ao obter localização: " + err.message),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <main className="geoLocal" aria-label="Tela de geolocalização com mapa interativo">
      {/* topo fixo padrão */}
      <HeaderVoltar />

      {/* conteúdo da página */}
      <section className="geoLocal__conteudo">
        <h2 className="geoLocal__titulo">📍 Mapa da Geolocalização</h2>
        <p className="geoLocal__txt">Veja sua posição atual em tempo real:</p>

        {erro && <p className="geoLocal__erro">{erro}</p>}

        {coordenadas ? (
          <>
            {/* bloco simples com os valores */}
            <div className="geoLocal__info">
              <p><strong>Latitude:</strong> {coordenadas.latitude.toFixed(6)}</p>
              <p><strong>Longitude:</strong> {coordenadas.longitude.toFixed(6)}</p>
            </div>

            {/* mapa  */}
            <MapContainer
              center={[coordenadas.latitude, coordenadas.longitude]}
              zoom={15}
              className="geoLocal__mapa"
              aria-label="Mapa interativo exibindo sua localização atual"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[coordenadas.latitude, coordenadas.longitude]}>
                <Popup>📍 Você está aqui!</Popup>
              </Marker>
            </MapContainer>
          </>
        ) : !erro ? (
          <p className="geoLocal__carregando" role="status" aria-live="polite">
            Obtendo localização... ⏳
          </p>
        ) : null}
      </section>
    </main>
  );
}
