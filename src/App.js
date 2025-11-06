import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
// __define-ocg__

function App() {
  const [cicekler, setCicekler] = useState([]);
  const [skor, setSkor] = useState(0);
  const cicekEmojileri = ["🌸", "🌻", "🌼", "🌷", "🌹"];
  const cicekSayisi = 15;
  const varOcg = "çiçek-toplama"; // Türkçe değişken
  console.log("Oyun ID:", varOcg); // Kullanım eklenerek eslint hatası önlendi

  // Tek bir çiçek oluştur
  const rastgeleCicek = (id) => ({
    id,
    emoji: cicekEmojileri[Math.floor(Math.random() * cicekEmojileri.length)],
    x: Math.random() * 90,
    y: Math.random() * 70,
  });

  // Tüm çiçekleri oluştur
  const cicekleriOlustur = useCallback(() => {
    const yeniCicekler = Array.from({ length: cicekSayisi }).map((_, i) =>
      rastgeleCicek(i)
    );
    setCicekler(yeniCicekler);
    setSkor(0);
  }, [cicekEmojileri, cicekSayisi]);

  // Başlangıçta oluştur
  useEffect(() => {
    cicekleriOlustur();
  }, [cicekleriOlustur]);

  // Tıklama olayı
  const cicekTopla = (id) => {
    setSkor((onceki) => onceki + 1);
    setCicekler((onceki) =>
      onceki.map((c) => (c.id === id ? rastgeleCicek(id) : c))
    );
  };

  return (
    <div className="oyun-alani">
      <div className="ust-bar">
        <h2>🌼 Skor: {skor}</h2>
        <button className="btn" onClick={cicekleriOlustur}>
          🔄 Sıfırla
        </button>
      </div>

      <div className="cicek-alani">
        {cicekler.map((cicek) => (
          <span
            key={cicek.id}
            className="cicek"
            style={{ left: `${cicek.x}%`, top: `${cicek.y}%` }}
            onClick={() => cicekTopla(cicek.id)}
          >
            {cicek.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
