// OWNER + AFFILIATE MASTER CONTROL

// ===== LOGIN SYSTEM =====
function ownerLogin(email) {

  if (email === "owner@thadollhouse.ai") {

    localStorage.setItem("ownerMode", "true");
    localStorage.setItem("allBotsPurchased", "true");

    alert("Owner Mode Activated — Full Access Enabled");

    enableOwnerFeatures();
  }
}

// ===== ENABLE OWNER FEATURES =====
function enableOwnerFeatures() {

  // Remove upgrade notices
  document.querySelectorAll(".notice").forEach(n => {
    n.style.display = "none";
  });

  // Unlock all run buttons
  document.querySelectorAll(".run").forEach(btn => {
    btn.disabled = false;
  });

  // Remove demo limits if exist
  window.demoUnlimited = true;

  console.log("Owner Full Access Enabled");
}

// ===== AUTO CHECK ON LOAD =====
document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("ownerMode") === "true") {
    enableOwnerFeatures();
  }

});

// ===== LOGOUT =====
function ownerLogout() {
  localStorage.removeItem("ownerMode");
  localStorage.removeItem("allBotsPurchased");
  location.reload();
}

// ===== AFFILIATE TRACKING =====
function trackAffiliateClick() {
  let clicks = Number(localStorage.getItem("affClicks") || 0);
  clicks++;
  localStorage.setItem("affClicks", clicks);
}

function simulateAffiliateSale() {
  let sales = Number(localStorage.getItem("affSales") || 0);
  sales++;
  localStorage.setItem("affSales", sales);
}
