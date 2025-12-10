export default function handler(req, res) {
  const { id } = req.query;

  const configs = {
    demo1: {
      title: "Ücretsiz bültene katıl 🎉",
      subtitle: "Haftada 1 kez, kısa ve öz pazarlama/büyüme notları. Spam yok, sadece değer.",
      placeholder: "E-posta adresin...",
      buttonText: "Bültene Katıl",
      badge: "📦 %15 indirim kuponu"
    }
  };

  const config = configs[id];

  if (!config) {
    return res.status(404).json({ error: "Popup not found" });
  }

  res.status(200).json(config);
}
