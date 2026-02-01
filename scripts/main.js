function initDemo(config) {
  const demo = document.getElementById("demo");
  if (!demo) return;

  demo.innerHTML = `
    <div class="demo-header">
      <img src="${config.pricingCard}" class="pricing-card">
      <h2>${config.title}</h2>
      <span class="badge">Unlimited Use – Active</span>
    </div>

    <div class="demo-features">
      ${config.features.map(f => `<div class="feature">${f}</div>`).join("")}
    </div>

    <select id="sampleSelect">
      ${Object.keys(config.prompts).map(k => `<option>${k}</option>`).join("")}
    </select>

    <textarea id="inputBox" placeholder="Enter your own prompt or choose a sample"></textarea>

    <div class="actions">
      <button onclick="runDemo()">Run</button>
      <button onclick="copyOutput()">Copy</button>
      <button onclick="saveOutput()">Save</button>
      <button onclick="exportOutput()">Export</button>
    </div>

    <pre id="output"></pre>
  `;

  window.runDemo = () => {
    const key = document.getElementById("sampleSelect").value;
    const user = document.getElementById("inputBox").value;
    document.getElementById("output").textContent =
      `(${config.slug.toUpperCase()})\\n` +
      (user || config.prompts[key]);
  };
}

/* OWNER + AFFILIATE SYSTEM */
window.USER = {
  role: localStorage.getItem("role") || "owner",
  affiliateClicks: Number(localStorage.getItem("affClicks") || 0),
  affiliateEarnings: Number(localStorage.getItem("affEarn") || 0)
};

window.simulateAffiliateSale = () => {
  USER.affiliateEarnings += 7.8;
  localStorage.setItem("affEarn", USER.affiliateEarnings);
  alert("Affiliate commission added");
};
