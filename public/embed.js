(async function () {
  const scriptTag = document.currentScript;

  const rawConfig = scriptTag.getAttribute("data-config");
let config = null;

if (rawConfig) {
  try {
    // Eğer değer zaten düz JSON ise direkt parse et
    const jsonString = rawConfig.trim();
    config = JSON.parse(jsonString);
  } catch (e) {
    console.error("PopupCraft: data-config parse edilemedi", e);
  }
}


  // 2) Yoksa eski sistem: data-popup + API (istersen bırak, istersen sil)
  if (!config) {
    const popupId = scriptTag.getAttribute("data-popup");
    if (!popupId) return;

    const configUrl = `https://popup-craft.vercel.app/api/popup/${popupId}`;
    try {
      config = await fetch(configUrl).then((res) => res.json());
    } catch (e) {
      console.error("PopupCraft: API fetch hatası", e);
      return;
    }
  }

  if (!config) return;

  // Popup container oluştur
  const popup = document.createElement("div");
  popup.id = "popupcraft-container";
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.zIndex = "999999";
  popup.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";

  popup.innerHTML = `
    <div style="
      background: #3f3f46;
      box-shadow: 0 18px 45px rgba(15,23,42,0.4);
      padding: 20px;
      width: 340px;
      max-width: calc(100vw - 40px);
      border-radius: 18px;
      color: white;
      font-size: 14px;
    ">
      <h2 style="margin:0 0 10px 0;font-size:20px;font-weight:700;">
        ${config.title || "Bültene katıl"}
      </h2>
      <p style="margin:0 0 16px 0;line-height:1.4;color:#e4e4e7;">
        ${config.subtitle || ""}
      </p>
      <input 
        type="email" 
        placeholder="${config.placeholder || "E-posta adresin..."}" 
        style="
          width:100%;
          padding:10px 12px;
          border-radius:10px;
          margin-bottom:10px;
          border:none;
          outline:none;
          font-size:13px;
        "
      />
      <button style="
        width:100%;
        padding: 11px 14px;
        border-radius: 10px;
        background: #4f46e5;
        color: white;
        border:none;
        font-weight:600;
        cursor:pointer;
        font-size:14px;
      ">
        ${config.buttonText || "Katıl"}
      </button>
      ${
        config.badge
          ? `<div style="margin-top:10px;font-size:11px;color:#d4d4d8;">${config.badge}</div>`
          : ""
      }
    </div>
  `;

  document.body.appendChild(popup);
})();
