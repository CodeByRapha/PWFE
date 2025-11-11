import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { HeaderVoltar } from "../Componentes/HeaderVoltar"; 

// Corrige ícone do Leaflet (necessário com Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function GeoLocalizacao() {
  const [coordenadas, setCoordenadas] = useState(null);
  const [erro, setErro] = useState(null);

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
    <div
      style={{
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
        backgroundImage: "url('/assets/fundo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Header fixo e translúcido */}
      <HeaderVoltar />

      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      ></div>

      {/* Conteúdo */}
      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.5rem",
            color: "#eae6ff",
            textShadow: "0 2px 6px rgba(0,0,0,0.4)",
          }}
        >
          📍 Mapa da Geolocalização
        </h2>

        <p style={{ opacity: 0.8, marginBottom: "1rem", color: "#eae6ff" }}>
          Veja sua posição atual em tempo real:
        </p>

        {erro && <p style={{ color: "#ffbaba" }}>{erro}</p>}

        {coordenadas ? (
          <>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                padding: "1rem 1.5rem",
                borderRadius: "12px",
                marginBottom: "1rem",
                color: "#fff",
                display: "inline-block",
              }}
            >
              <p>
                <strong>Latitude:</strong> {coordenadas.latitude.toFixed(6)}
              </p>
              <p>
                <strong>Longitude:</strong> {coordenadas.longitude.toFixed(6)}
              </p>
            </div>

            <MapContainer
              center={[coordenadas.latitude, coordenadas.longitude]}
              zoom={15}
              style={{
                height: "60vh",
                width: "90%",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                border: "2px solid rgba(255,255,255,0.25)",
                margin: "auto",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[coordenadas.latitude, coordenadas.longitude]}>
                <Popup>📍 Você está aqui!</Popup>
              </Marker>
            </MapContainer>
          </>
        ) : !erro ? (
          <p>Obtendo localização... ⏳</p>
        ) : null}
      </div>
    </div>
  );
}
