(function () {
  const style = document.createElement("style");
  style.textContent = `
    body { margin: 0; background: #0b0f14; }
    .wrap { height: 100vh; display:flex; align-items:center; justify-content:center; }
    .bar {
      width: min(1000px, 92vw);
      height: 140px;
      border-radius: 28px;
      background: radial-gradient(120% 180% at 30% 20%, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%),
                  linear-gradient(180deg, #0f1116, #06070a);
      box-shadow: 0 18px 45px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10);
      position: relative;
      overflow: hidden;
    }
    .pulse {
      position:absolute; inset:-40%;
      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), rgba(255,255,255,0) 55%);
      animation: pulse 1.6s ease-in-out infinite;
      transform-origin: center;
    }
    @keyframes pulse {
      0%   { transform: scale(0.95); opacity: 0.25; }
      50%  { transform: scale(1.02); opacity: 0.55; }
      100% { transform: scale(0.95); opacity: 0.25; }
    }
    .value {
      position:absolute; inset:0;
      display:flex; align-items:center; justify-content:center;
      font-family: Inter, Arial, sans-serif;
      font-weight: 800;
      font-size: clamp(52px, 10vw, 112px);
      letter-spacing: 1px;
      color: #d8b54a;
      text-shadow: 0 6px 24px rgba(0,0,0,0.6);
    }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement("div");
  wrap.className = "wrap";
  wrap.innerHTML = `
    <div class="bar">
      <div class="pulse"></div>
      <div class="value">98.6%</div>
    </div>
  `;
  document.body.appendChild(wrap);
})();
