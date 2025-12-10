(async function () {
  const scriptTag = document.currentScript;
  const popupId = scriptTag.getAttribute("data-popup");

  if (!popupId) return;

  // Config JSON dosyasını çağır
const configUrl = `https://popup-craft.vercel.app/api/popup/${popupId}`;
  const config = await fetch(configUrl).then(res => res.json());

  // Popup container oluştur
  const popup = document.createElement("div");
  popup.id = "popupcraft-container";
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.zIndex = "999999";
  popup.style.fontFamily = "sans-serif";

  // HTML şablon
  popup.innerHTML = `
    <div style="
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(10px);
      padding: 20px;
      width: 300px;
      border-radius: 16px;
      color: white;
    ">
      <h2 style="margin:0 0 10px 0;">${config.title}</h2>
      <p style="margin:0 0 16px 0;">${config.subtitle}</p>
      <input 
        type="email" 
        placeholder="${config.placeholder}" 
        style="width:100%;padding:10px;border-radius:8px;margin-bottom:10px;border:none;"
      />
      <button style="
        width:100%;
        padding: 12px;
        border-radius: 10px;
        background: #6366f1;
        color: white;
        border:none;
        font-weight:bold;
        cursor:pointer;
      ">
        ${config.buttonText}
      </button>
      ${
        config.badge
          ? `<div style="margin-top:12px;font-size:12px;">${config.badge}</div>`
          : ""
      }
    </div>
  `;

  document.body.appendChild(popup);
})();
