import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Wand2,
  Code2,
  Copy,
  Check,
  Mail,
  AlignLeft,
  Tag,
} from "lucide-react";
import { Eye } from "lucide-react";


export default function App() {
  const [config, setConfig] = useState({
    title: "Ücretsiz bültene katıl 🎉",
    subtitle:
      "Haftada 1 kez gelen, kısa ve öz büyüme / pazarlama notları. Spam yok, sadece değer.",
    placeholder: "E-posta adresin...",
    buttonText: "Bültene Katıl",
    badge: "📦 %15 indirim kuponu",
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (field) => (e) => {
    setConfig((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    setCopied(false);
  };

  // Embed kodu (script tag'i)
  const embedCode = useMemo(() => {
    const json = JSON.stringify(config);
    return (
      `<script src="https://popup-craft.vercel.app/embed.js" data-config='` +
      json +
      `'></` +
      `script>`
    );
  }, [config]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Kopyalama hatası:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Üst bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl shadow-lg shadow-indigo-500/40">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                PopupCraft
              </h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                NO-CODE POPUP EMBED BUILDER
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2 py-1 rounded-full border border-slate-700/80 bg-slate-900/60">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1" />
              Embed script hazır
            </span>
          </div>
        </div>
      </header>

      {/* Ana Layout */}
      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
        {/* Sol: Editor */}
        <section className="bg-slate-900/70 border border-slate-800/80 rounded-2xl shadow-xl shadow-slate-950/70 p-5 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-indigo-400" />
                Popup İçeriği
              </h2>
              <p className="text-[11px] text-slate-400 mt-1">
                Başlık, alt metin ve butonu düzenle. Sağda canlı önizleme
                gözükecek.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                Başlık
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={config.title}
                  onChange={handleChange("title")}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  placeholder="Örn: Ücretsiz bültene katıl 🎉"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <AlignLeft className="w-3 h-3 text-slate-400" />
                Alt Başlık
              </label>
              <textarea
                rows={3}
                value={config.subtitle}
                onChange={handleChange("subtitle")}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500 resize-none"
                placeholder="Popup altında gözüken açıklama metni..."
              />
            </div>

            {/* Placeholder & Button */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Input Placeholder
                </label>
                <input
                  type="text"
                  value={config.placeholder}
                  onChange={handleChange("placeholder")}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  placeholder="E-posta adresin..."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Buton Yazısı
                </label>
                <input
                  type="text"
                  value={config.buttonText}
                  onChange={handleChange("buttonText")}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                  placeholder="Örn: Bültene Katıl"
                />
              </div>
            </div>

            {/* Badge */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                Rozet / Alt metin (opsiyonel)
              </label>
              <input
                type="text"
                value={config.badge}
                onChange={handleChange("badge")}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500"
                placeholder="Örn: 📦 %15 indirim kuponu"
              />
              <p className="text-[11px] text-slate-500">
                Kupon, küçük güven mesajı veya ek bilgi ekleyebilirsin. Boş
                bırakmak serbest.
              </p>
            </div>
          </div>
        </section>

        {/* Sağ: Preview + Embed Code */}
        <section className="space-y-4">
          {/* Preview */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl shadow-xl shadow-slate-950/70 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Canlı Önizleme
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                Sitede sağ altta böyle görünecek
              </span>
            </div>

            <div className="flex justify-end">
              {/* Popup kart simülasyonu */}
              <div className="relative">
                <div className="pointer-events-none opacity-30 hidden sm:block absolute -bottom-5 -right-6 w-32 h-32 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="relative">
                  <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-4 w-[320px] max-w-full shadow-2xl shadow-slate-950">
                    {/* Close button */}
                    <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs flex items-center justify-center">
                      ✕
                    </button>

                    <div className="pr-6 mb-2">
                      <h3 className="text-sm font-semibold text-slate-50 mb-1">
                        {config.title || "Başlık"}
                      </h3>
                      <p className="text-[12px] text-slate-300 leading-relaxed">
                        {config.subtitle || "Açıklama metni burada görünecek."}
                      </p>
                    </div>

                    <input
                      disabled
                      placeholder={
                        config.placeholder || "E-posta adresin..."
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-[12px] text-slate-200 mb-2 placeholder:text-slate-500"
                    />
                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-[13px] font-semibold text-white rounded-lg py-2 transition-colors">
                      {config.buttonText || "Buton"}
                    </button>

                    {config.badge && (
                      <div className="mt-2 text-[11px] text-slate-400">
                        {config.badge}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Embed Code */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl shadow-xl shadow-slate-950/70 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Embed Kodu
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Kopyala
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-100 resize-none h-28"
              value={embedCode}
            />

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Bu kodu kendi sitenin HTML dosyasında{" "}
              <code className="bg-slate-800 px-1 py-0.5 rounded">
                &lt;/body&gt;
              </code>{" "}
              etiketinden hemen önce yapıştır. Kaydettiğinde popup sağ altta
              otomatik olarak görünecek.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
