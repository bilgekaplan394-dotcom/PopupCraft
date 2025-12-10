import React, { useState } from "react";
import {
  Mail,
  Image as ImageIcon,
  Palette,
  Settings,
  X,
  Check,
  Sparkles,
  Bell,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";

export default function PopupCraftApp() {
  const [config, setConfig] = useState({
    title: "Ücretsiz bültene katıl 🎉",
    subtitle:
      "Haftada 1 kez gelen, kısa ve öz büyüme / pazarlama notları. Spam yok, sadece değer.",
    ctaText: "Bültene Katıl",
    placeholder: "E-posta adresin...",
    badge: "📦 %15 indirim kuponu",
    theme: "dark-glass", // 'dark-glass' | 'light' | 'brand'
    imageSide: "left", // 'left' | 'right' | 'none'
    showCloseText: true,
    showMiniBadge: true,
  });

  const [accent, setAccent] = useState("#6366f1");
  const [copied, setCopied] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopy = () => {
    const text = `
[POPUP]
Başlık: ${config.title}
Alt Başlık: ${config.subtitle}
Buton: ${config.ctaText}
Placeholder: ${config.placeholder}
Rozet: ${config.badge}
Tema: ${config.theme}
Görsel: ${config.imageSide}
`;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setConfig((prev) => ({ ...prev, customImage: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const themeStyles = {
    "dark-glass": {
      wrapper: "bg-slate-900/80 border-slate-700/80 text-slate-50",
      input: "bg-slate-900/80 border-slate-700 text-slate-100",
      subtitle: "text-slate-300",
      close: "text-slate-400",
    },
    light: {
      wrapper: "bg-white border-slate-200 text-slate-900",
      input: "bg-slate-50 border-slate-200 text-slate-900",
      subtitle: "text-slate-500",
      close: "text-slate-400",
    },
    brand: {
      wrapper: "bg-slate-950 border-slate-800 text-slate-50",
      input: "bg-slate-900 border-slate-700 text-slate-50",
      subtitle: "text-slate-400",
      close: "text-slate-500",
    },
  };

  const currentTheme = themeStyles[config.theme];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950 text-slate-100">
      {/* SOL PANEL – EDITÖR */}
      <div className="w-full lg:w-[420px] border-r border-slate-900 bg-slate-950/95 h-screen overflow-y-auto shadow-xl z-10">
        {/* Header */}
        <div className="p-5 border-b border-slate-900 flex items-center justify-between sticky top-0 bg-slate-950/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500 p-2 rounded-lg shadow-lg shadow-rose-500/40">
              <Mail size={20} className="text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
                PopupCraft
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">
                Popup Designer
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowProModal(true)}
            className="text-xs font-bold bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-full flex items-center gap-1 border border-amber-400/50 hover:bg-amber-500/20 transition-colors"
          >
            <Sparkles size={12} /> PRO
          </button>
        </div>

        <div className="p-5 space-y-7">
          {/* İçerik */}
          <section className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Settings size={14} /> İçerik
            </label>

            <div className="space-y-3">
              <div>
                <span className="block text-[11px] text-slate-400 mb-1">
                  Başlık
                </span>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <span className="block text-[11px] text-slate-400 mb-1">
                  Alt Başlık
                </span>
                <textarea
                  rows={3}
                  value={config.subtitle}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-[11px] text-slate-400 mb-1">
                    Buton Yazısı
                  </span>
                  <input
                    type="text"
                    value={config.ctaText}
                    onChange={(e) => handleChange("ctaText", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 mb-1">
                    Placeholder
                  </span>
                  <input
                    type="text"
                    value={config.placeholder}
                    onChange={(e) =>
                      handleChange("placeholder", e.target.value)
                    }
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <span className="block text-[11px] text-slate-400 mb-1">
                  Üst Rozet (opsiyonel)
                </span>
                <input
                  type="text"
                  value={config.badge}
                  onChange={(e) => handleChange("badge", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-400"
                  placeholder="Örn: %10 indirim"
                />
              </div>
            </div>
          </section>

          {/* Tema & Görsel */}
          <section className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} /> Tema & Görsel
            </label>

            {/* Tema seçimi */}
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleChange("theme", "dark-glass")}
                className={`p-2 rounded-lg border flex flex-col gap-1 ${
                  config.theme === "dark-glass"
                    ? "border-rose-400 bg-slate-900"
                    : "border-slate-800 bg-slate-950"
                }`}
              >
                <span className="w-full h-3 rounded bg-slate-800 mb-1" />
                <span className="w-3/4 h-2 rounded bg-slate-700" />
                <span className="text-[10px] text-slate-300 mt-1">
                  Karanlık
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleChange("theme", "light")}
                className={`p-2 rounded-lg border flex flex-col gap-1 ${
                  config.theme === "light"
                    ? "border-rose-400 bg-slate-100/10"
                    : "border-slate-800 bg-slate-950"
                }`}
              >
                <span className="w-full h-3 rounded bg-slate-100 mb-1" />
                <span className="w-3/4 h-2 rounded bg-slate-200" />
                <span className="text-[10px] text-slate-300 mt-1">Açık</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange("theme", "brand")}
                className={`p-2 rounded-lg border flex flex-col gap-1 ${
                  config.theme === "brand"
                    ? "border-rose-400 bg-gradient-to-br from-rose-500/20 to-indigo-500/20"
                    : "border-slate-800 bg-slate-950"
                }`}
              >
                <span className="w-full h-3 rounded bg-gradient-to-r from-rose-500 to-indigo-500 mb-1" />
                <span className="w-3/4 h-2 rounded bg-slate-900" />
                <span className="text-[10px] text-slate-300 mt-1">Brand</span>
              </button>
            </div>

            {/* Accent renk */}
            <div>
              <span className="block text-[11px] text-slate-400 mb-1">
                Buton / Accent Rengi
              </span>
              <div className="flex items-center gap-2">
                {["#f97316", "#ec4899", "#6366f1", "#22c55e", "#06b6d4"].map(
                  (c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setAccent(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        accent === c
                          ? "border-white scale-110"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  )
                )}
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-8 h-8 rounded-full border border-slate-700 bg-slate-900 cursor-pointer p-0"
                />
              </div>
            </div>

            {/* Görsel konumu */}
            <div>
              <span className="block text-[11px] text-slate-400 mb-1">
                Görsel Konumu
              </span>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleChange("imageSide", "left")}
                  className={`flex-1 py-1.5 rounded-lg border ${
                    config.imageSide === "left"
                      ? "border-rose-400 bg-slate-900 text-rose-200"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  Sol
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("imageSide", "right")}
                  className={`flex-1 py-1.5 rounded-lg border ${
                    config.imageSide === "right"
                      ? "border-rose-400 bg-slate-900 text-rose-200"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  Sağ
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("imageSide", "none")}
                  className={`flex-1 py-1.5 rounded-lg border ${
                    config.imageSide === "none"
                      ? "border-rose-400 bg-slate-900 text-rose-200"
                      : "border-slate-800 bg-slate-950 text-slate-400"
                  }`}
                >
                  Yok
                </button>
              </div>
            </div>

            {/* Görsel upload (Pro havası) */}
            <div className="border border-dashed border-slate-800 rounded-xl p-3 flex gap-3 items-center bg-slate-950/60">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center">
                <ImageIcon size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-slate-300 font-medium">
                  Özel görsel yükle
                </p>
                <p className="text-[10px] text-slate-500">
                  400x400 PNG / JPG – isteğe bağlı
                </p>
              </div>
              <label className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 cursor-pointer hover:border-rose-400 transition-colors">
                Seç
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </section>

          {/* Davranış */}
          <section className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Bell size={14} /> Davranış
            </label>

            <div className="space-y-2 text-[12px] text-slate-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.showMiniBadge}
                  onChange={(e) =>
                    handleChange("showMiniBadge", e.target.checked)
                  }
                  className="rounded bg-slate-900 border-slate-700 text-rose-400"
                />
                Çıkınca sağ altta küçük “Şimdi aç” rozeti göster
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.showCloseText}
                  onChange={(e) =>
                    handleChange("showCloseText", e.target.checked)
                  }
                  className="rounded bg-slate-900 border-slate-700 text-rose-400"
                />
                “Hayır, istemiyorum” gibi ikincil kapatma metni göster
              </label>
            </div>
          </section>

          {/* Kopyala butonu */}
          <button
            onClick={handleCopy}
            className={`w-full mt-1 flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl transition-all shadow-lg ${
              copied
                ? "bg-emerald-500 text-slate-950"
                : "bg-rose-500/90 hover:bg-rose-400 text-slate-950"
            }`}
          >
            {copied ? <Check size={18} /> : <ArrowRight size={18} />}
            {copied
              ? "Popup metni kopyalandı!"
              : "Popup metnini kopyala (metin / içerik)"}
          </button>
        </div>
      </div>

      {/* SAĞ PANEL – ÖNİZLEME */}
      <div className="flex-1 relative bg-slate-900/90 overflow-hidden flex items-center justify-center p-6">
        {/* sahte sayfa arka planı */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] [background-size:18px_18px]" />
        </div>

        {/* fake website */}
        <div className="absolute inset-8 rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden pointer-events-none">
          <div className="h-10 border-b border-slate-800 flex items-center gap-2 px-4 bg-slate-900/80">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="ml-4 h-6 flex-1 rounded-full bg-slate-800/80" />
          </div>
          <div className="p-10 grid md:grid-cols-[1.1fr,0.9fr] gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                <MonitorSmartphone size={12} /> Demo Landing
              </div>
              <h2 className="text-3xl font-bold text-slate-50 max-w-xl">
                SaaS ürününün en kritik metriği:{" "}
                <span className="text-rose-400">e-posta listesi.</span>
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                PopupCraft ile tasarladığın popuplar, ziyaretçiyi rahatsız
                etmeden e-posta toplamana yardımcı olur. Hemen soldan düzenle,
                sağda canlı olarak gör.
              </p>

              <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-400">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                  +27% daha fazla lead
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                  Çıkış niyetli popup desteği
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                  Kod gerektirmeden tasarım
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-rose-500/20 via-slate-900 to-indigo-500/30 border border-slate-800" />
            </div>
          </div>
        </div>

        {/* POPUP KARTI */}
        <div className="relative z-10 max-w-xl w-full flex items-center justify-center">
          <div
            className={`w-full rounded-2xl border shadow-2xl shadow-black/60 overflow-hidden flex flex-col md:flex-row ${
              currentTheme.wrapper
            } ${
              config.imageSide === "none"
                ? "md:flex-col"
                : config.imageSide === "right"
                ? "md:flex-row-reverse"
                : "md:flex-row"
            }`}
          >
            {/* Görsel alanı */}
            {config.imageSide !== "none" && (
              <div className="md:w-5/12 w-full relative">
                <div className="h-full w-full bg-gradient-to-br from-rose-500 via-amber-400 to-fuchsia-500 opacity-90" />
                {config.customImage && (
                  <div className="absolute inset-0">
                    <img
                      src={config.customImage}
                      alt="Popup visual"
                      className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                    />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/40 text-[10px] px-2 py-1 rounded-full flex items-center gap-1 text-white">
                  <Sparkles size={11} /> Öne Çıkan Teklif
                </div>
              </div>
            )}

            {/* İçerik */}
            <div className="flex-1 p-5 md:p-6 relative">
              {/* close icon */}
              <button
                type="button"
                className={`absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-800/60 transition-colors ${
                  currentTheme.close
                }`}
              >
                <X size={16} />
              </button>

              <div className="space-y-3 pr-6">
                {config.badge && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full bg-rose-500/10 border border-rose-400/40 text-rose-300">
                    <Bell size={11} />
                    {config.badge}
                  </div>
                )}

                <h3 className="text-lg md:text-xl font-semibold leading-tight">
                  {config.title || "Başlık buraya gelecek"}
                </h3>
                <p
                  className={`text-xs md:text-sm leading-relaxed ${
                    currentTheme.subtitle
                  }`}
                >
                  {config.subtitle || "Kısa açıklama metni buraya gelecek."}
                </p>

                <form
                  className="space-y-2 mt-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder={config.placeholder || "E-posta adresin"}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs md:text-sm outline-none border ${currentTheme.input}`}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-1 shadow-lg"
                      style={{ backgroundColor: accent, color: "#020617" }}
                    >
                      {config.ctaText || "Kaydol"}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Spam yok. İstediğin zaman tek tıkla çıkabilirsin.
                  </p>
                </form>

                {config.showCloseText && (
                  <button
                    type="button"
                    className="mt-2 text-[11px] text-slate-500 hover:text-slate-400 underline-offset-2"
                  >
                    Hayır, fırsatları kaçırmayı tercih ediyorum
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mini badge */}
        {config.showMiniBadge && (
          <div className="absolute bottom-8 right-8 z-10">
            <button className="flex items-center gap-2 text-[11px] px-3 py-2 rounded-full bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/40 hover:bg-rose-400 transition-colors">
              <Mail size={13} />
              Popupu tekrar aç
            </button>
          </div>
        )}
      </div>

      {/* PRO MODAL */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-rose-500/40 rounded-3xl max-w-sm w-full p-8 relative shadow-2xl">
            <button
              onClick={() => setShowProModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-200"
            >
              <X size={22} />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/50">
              <Sparkles size={32} className="text-slate-950" />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">
              PopupCraft PRO
            </h2>
            <p className="text-sm text-slate-400 text-center mb-6">
              Gerçek embed kodu, exit-intent tetikleyici ve A/B test
              varyasyonları ile popuplarını güçlü bir araca dönüştür.
            </p>

            <ul className="space-y-3 text-sm text-slate-200 mb-6">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                Exit-intent & scroll tetikleyiciler
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                3 hazır tema + kendi CSS kodun
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                Mailchimp / Brevo / ConvertKit entegrasyon şablonları
              </li>
            </ul>

            <button className="w-full bg-gradient-to-r from-rose-500 to-amber-400 hover:from-rose-400 hover:to-amber-300 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 text-sm">
              Yükselt (₺299 / ömür boyu)
            </button>

            <p className="text-[10px] text-slate-500 text-center mt-3">
              Tek seferlik ödeme. Abonelik yok.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
