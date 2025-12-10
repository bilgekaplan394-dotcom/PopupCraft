export default function handler(req, res) {
  const { id } = req.query;

  // 🔹 CORS izinleri
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight isteği
    return res.status(200).end();
  }

  // 🔹 Test için sabit config
  const configs = {
    demo1: {
      title: "Ücretsiz bültene katıl 🎉",
      subtitle: "Haftada 1 kez gelen, kısa ve öz büyüme / pazarlama notları. Spam yok, sadece değer.",
      placeholder: "E-posta adresin...",
      buttonText: "Bültene Katıl",
      badge: "📦 %15 indirim kuponu"
    }
  };

  const config = configs[id];

  if (!config) {
    return res.status(404).json({ error: "Popup not found" });
  }

  return res.status(200).json(config);
}
