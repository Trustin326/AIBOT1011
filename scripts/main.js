/* =============================
   THA DOLL HOUSE DEMO ENGINE
   ============================= */

function isOwner(){
  return localStorage.getItem("tdh_role") === "owner";
}

function isPurchased(){
  return localStorage.getItem("tdh_purchased") === "true" || isOwner();
}

function trackAffiliate(){
  const ref = new URLSearchParams(location.search).get("ref");
  if(ref){
    localStorage.setItem("tdh_affiliate_ref", ref);
    let clicks = Number(localStorage.getItem("tdh_aff_clicks") || 0);
    localStorage.setItem("tdh_aff_clicks", clicks + 1);
  }
}
trackAffiliate();

/* =============================
   INIT DEMO PER BOT
   ============================= */

function initDemo(id, config){

  const root = document.getElementById(id);
  if(!root) return;

  const runBtn = root.querySelector(".run");
  const chatBox = root.querySelector(".chat");
  const output = root.querySelector(".output");
  const notice = root.querySelector(".notice");
  const sampleSelect = root.querySelector(".sample");
  const promptBox = root.querySelector(".prompt");

  // Load welcome text
  output.textContent = config.welcome || "Ready.";

  // Sample dropdown
  if(sampleSelect){
    sampleSelect.onchange = ()=>{
      promptBox.value = config.prompts[sampleSelect.value] || "";
    };
  }

  // RUN BUTTON
  runBtn.onclick = ()=>{

    let input = chatBox.value || promptBox.value || "";

    // DEMO LIMIT (only if NOT owner or purchased)
    if(!isPurchased()){
      notice.style.display = "block";
    } else {
      notice.style.display = "none";
    }

    // BOT UNIQUE RESPONSE
    let result = config.reply
      ? config.reply(input)
      : "Processing request for " + config.slug;

    output.textContent = result;

  };

}
