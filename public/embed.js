(function () {
  const scriptTag = document.currentScript;
  if (!scriptTag) return;

  const rawConfig = scriptTag.getAttribute("data-config");
  if (!rawConfig) {
    console.warn("PopupCraft: data-config attribute missing on script tag.");
    return;
  }

  let config;
  try {
    const jsonString = rawConfig.trim();
    config = JSON.parse(jsonString);
  } catch (e) {
    console.error("PopupCraft: data-config parse edilemedi", e);
    return;
  }

  // Ana container
  const popup = document.createElement("div");
  popup.id = "popupcraft-container";
  popup.style.position = "fixed";
  popup.style.bottom = "24px";
  popup.style.right = "24px";
  popup.style.zIndex = "999999";
  popup.style.fontFamily =
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  // Arka plan klik ile kapatma
  // (İstersen overlay ekleyebilirsin, şimdilik sadece kart var)

  // Kart HTML
  popup.innerHTML = `
    <div style="
      position: relative;
      background: rgba(24,24,27,0.96);
      border: 1px solid rgba(63,63,70,0.9);
      box-shadow: 0 24px 60px rgba(15,23,42,0.7);
      padding: 18px 18px 16px 18px;
      width: 320px;
      max-width: calc(100vw - 32px);
      border-radius: 18px;
      color: white;
      font-size: 14px;
      backdrop-filter: blur(14px);
    ">
      <button
        type="button"
        data-popupcraft-close
        aria-label="Kapat"
        style="
          position:absolute;
          top:8px;
          right:8px;
          width:24px;
          height:24px;
          border-radius:999px;
          border:none;
          background:rgba(39,39,42,0.9);
          color:#a1a1aa;
          cursor:pointer;
          font-size:16px;
          display:flex;
          align-items:center;
          justify-content:center;
        "
      >
        ×
      </button>

      <div style="margin-bottom:10px; padding-right:20px;">
        <div style="font-size:20px; font-weight:700; margin-bottom:6px;">
          ${config.title || "Bültene katıl"}
        </div>
        <div style="font-size:13px; line-height:1.5; color:#e4e4e7;">
          ${config.subtitle || ""}
        </div>
      </div>

      <input
        type="email"
        placeholder="${config.placeholder || "E-posta adresin..."}"
        style="
          width:100%;
          padding:10px 12px;
          border-radius:10px;
          margin-bottom:10px;
          border:1px solid #27272a;
          background:#09090b;
          color:white;
          font-size:13px;
          outline:none;
          box-sizing:border-box;
        "
      />

      <button
        type="button"
        style="
          width:100%;
          padding: 11px 14px;
          border-radius: 10px;
          background: linear-gradient(135deg,#4f46e5,#6366f1);
          color: white;
          border:none;
          font-weight:600;
          cursor:pointer;
          font-size:14px;
          margin-bottom: ${config.badge ? "8px" : "0"};
        "
      >
        ${config.buttonText || "Katıl"}
      </button>

      ${
        config.badge
          ? `<div style="margin-top:4px;font-size:11px;color:#a1a1aa;">${config.badge}</div>`
          : ""
      }
    </div>
  `;

  document.body.appendChild(popup);

  const closeBtn = popup.querySelector("[data-popupcraft-close]");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      popup.remove();
    });
  }
})();
