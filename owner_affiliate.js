/* owner_affiliate.js
   ✅ Owner full feature access + Affiliate tools
   Works across all bot pages + demo logic
*/

(function () {
  // ===== OWNER LOGIN (simple) =====
  // Owner can be set by localStorage:
  // localStorage.setItem("TDH_USER", JSON.stringify({role:"owner"}))

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("TDH_USER") || "null");
  } catch (e) {}

  const isOwner = user && user.role === "owner";

  // ===== UNLIMITED USE FOR OWNER =====
  // Many demo limits store counters in localStorage;
  // Owner automatically bypasses limits.
  window.TDH_IS_OWNER = !!isOwner;

  // ===== Affiliate Link Storage =====
  function getAff() {
    return localStorage.getItem("TDH_AFF") || "";
  }
  function setAff(code) {
    localStorage.setItem("TDH_AFF", code);
  }

  // ===== Build Owner Panel UI =====
  function injectOwnerPanel() {
    const exists = document.getElementById("tdh-owner-panel");
    if (exists) return;

    const panel = document.createElement("section");
    panel.id = "tdh-owner-panel";
    panel.style.cssText = `
      display:${isOwner ? "block" : "none"};
      max-width:1100px;
      margin:18px auto;
      padding:16px;
      border-radius:18px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(0,0,0,.35);
      color:#fff;
      backdrop-filter: blur(10px);
    `;

    panel.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
        <div>
          <h2 style="margin:0;font-size:22px;letter-spacing:.4px">Owner Dashboard — Full Access</h2>
          <p style="margin:6px 0 0;opacity:.9">Unlimited runs • All features unlocked • Affiliate tools enabled</p>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button id="tdh-export" style="padding:10px 14px;border-radius:12px;border:0;font-weight:900;cursor:pointer">
            Export Output
          </button>
          <button id="tdh-reset" style="padding:10px 14px;border-radius:12px;border:0;font-weight:900;cursor:pointer">
            Reset Demo Limits
          </button>
        </div>
      </div>

      <hr style="border:none;border-top:1px solid rgba(255,255,255,.14);margin:14px 0">

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05)">
          <h3 style="margin:0 0 10px;font-size:16px">Owner Features</h3>
          <ul style="margin:0;padding-left:18px;line-height:1.6;opacity:.95">
            <li>Unlimited demo usage</li>
            <li>All premium feature tabs unlocked</li>
            <li>Reset counters instantly</li>
            <li>Export outputs to .txt</li>
          </ul>
        </div>

        <div style="padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05)">
          <h3 style="margin:0 0 10px;font-size:16px">Affiliate Tools</h3>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
            <input id="tdh-aff" placeholder="Affiliate Code (ex: KISHA10)"
              style="flex:1;min-width:220px;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(0,0,0,.35);color:#fff" />
            <button id="tdh-aff-set" style="padding:10px 14px;border-radius:12px;border:0;font-weight:900;cursor:pointer">
              Save
            </button>
          </div>

          <p style="margin:10px 0 0;opacity:.9">
            Affiliate Link:
            <span id="tdh-aff-link" style="word-break:break-all;font-weight:900"></span>
          </p>
        </div>
      </div>
    `;

    document.body.insertBefore(panel, document.body.firstChild);

    // Buttons
    document.getElementById("tdh-reset")?.addEventListener("click", () => {
      // clear usage counters
      Object.keys(localStorage).forEach((k) => {
        if (k.toLowerCase().includes("usage") || k.toLowerCase().includes("runs") || k.toLowerCase().includes("limit")) {
          localStorage.removeItem(k);
        }
      });
      alert("✅ Demo limits reset for this browser.");
    });

    document.getElementById("tdh-export")?.addEventListener("click", () => {
      const out = document.querySelector(".output, #output, pre, .result");
      const text = out ? (out.textContent || "").trim() : "";
      if (!text) {
        alert("No output to export yet.");
        return;
      }
      const blob = new Blob([text], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "bot-output.txt";
      a.click();
      URL.revokeObjectURL(a.href);
    });

    // Affiliate
    const affInput = document.getElementById("tdh-aff");
    const affLink = document.getElementById("tdh-aff-link");
    const affSet = document.getElementById("tdh-aff-set");

    function refreshAff() {
      const code = getAff();
      if (affInput) affInput.value = code;
      const base = window.location.origin + "/AIBOT1011/";
      if (affLink) affLink.textContent = code ? `${base}?aff=${encodeURIComponent(code)}` : base;
    }

    affSet?.addEventListener("click", () => {
      const code = (affInput?.value || "").trim();
      if (!code) {
        alert("Type an affiliate code first.");
        return;
      }
      setAff(code);
      refreshAff();
      alert("✅ Affiliate code saved.");
    });

    refreshAff();
  }

  // ===== Inject "Owner Login" Quick Button (optional) =====
  function injectOwnerLoginButton() {
    // Only add it to index.html or if a header exists
    const btnExists = document.getElementById("tdh-owner-login");
    if (btnExists) return;

    const btn = document.createElement("button");
    btn.id = "tdh-owner-login";
    btn.textContent = isOwner ? "Owner Mode ✅" : "Owner Login";
    btn.style.cssText = `
      position:fixed;
      bottom:18px;
      right:18px;
      z-index:9999;
      padding:12px 16px;
      border-radius:14px;
      border:none;
      font-weight:900;
      cursor:pointer;
      background:#ffd76a;
      color:#111;
      box-shadow:0 12px 28px rgba(0,0,0,.35);
    `;

    btn.addEventListener("click", () => {
      localStorage.setItem("TDH_USER", JSON.stringify({ role: "owner" }));
      alert("✅ Owner login enabled. Refresh the page.");
      location.reload();
    });

    document.body.appendChild(btn);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectOwnerPanel();
    injectOwnerLoginButton();
  });
})();
