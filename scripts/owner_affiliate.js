/* =============================
   LOGIN SYSTEM
   ============================= */

window.loginOwner = function(){
  localStorage.setItem("tdh_role","owner");
  localStorage.setItem("tdh_purchased","true");
  alert("Owner mode enabled — Full Access");
  location.reload();
};

window.loginBuyer = function(){
  localStorage.setItem("tdh_role","buyer");
  localStorage.setItem("tdh_purchased","true");
  alert("Buyer mode enabled — Purchased Access");
  location.reload();
};

window.logoutUser = function(){
  localStorage.clear();
  location.reload();
};

/* =============================
   AFFILIATE DASHBOARD
   ============================= */

window.simulateAffiliateSale = function(){
  let earnings = Number(localStorage.getItem("tdh_aff_earn") || 0);
  earnings += 7.80;
  localStorage.setItem("tdh_aff_earn", earnings.toFixed(2));
  alert("Affiliate commission added");
};

window.resetAffiliateStats = function(){
  localStorage.removeItem("tdh_aff_clicks");
  localStorage.removeItem("tdh_aff_earn");
  alert("Affiliate stats reset");
};
