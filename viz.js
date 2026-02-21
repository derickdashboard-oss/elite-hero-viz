/* global dscc */
dscc.subscribeToData(function (message) {
  // Looker Studio sends data + style options here
  const data = message.data;

  // --- Get the metric value (first row, first metric) ---
  // Expecting one metric. We'll safely parse it.
  let raw = null;

  try {
    // data.tables.DEFAULT is typical for community viz
    raw = data.tables.DEFAULT[0].metric[0];
  } catch (e) {
    raw = null;
  }

  // raw can be string/number; normalize
  let valueNum = Number(raw);

  // If metric comes in like "0.986" (ratio), convert to percent
  // If it comes like "98.6" already, keep it.
  let percent = valueNum;
  if (!Number.isFinite(percent)) percent = 0;

  if (percent <= 1.5) percent = percent * 100; // assumes ratio
  percent = Math.max(0, Math.min(100, percent));

  // Format display like 98.6%
  const display = `${percent.toFixed(1)}%`;

  // --- Conditional color (you can tweak these) ---
  // < 90 red, 90-100 gold
  const color =
    percent < 90 ? "#ff3b30" :
    percent < 100 ? "#d7b34c" :
    "#34c759";

  // --- Optional header text (from a dimension if you use one) ---
  let header = "PERFORMANCE — CURRENT MONTH";
  try {
    const dim = data.tables.DEFAULT[0].dimension?.[0];
    if (dim && String(dim).trim().length > 0) header = String(dim).toUpperCase();
  } catch (e) {}

  // --- Render ---
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div class="stage">
      <div class="card pulse">
        <div class="bar">
          <div class="barText">${header}</div>
        </div>
        <div class="panel">
          <div class="kpi" style="color:${color}">${display}</div>
        </div>
      </div>
    </div>
  `;
});
