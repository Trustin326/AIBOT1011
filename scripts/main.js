function initDemo(id, config){
  const root = document.getElementById(id);
  if(!root) return;

  const sample = root.querySelector(".sample");
  const prompt = root.querySelector(".prompt");
  const chat = root.querySelector(".chat");
  const run = root.querySelector(".run");
  const output = root.querySelector(".output");

  if(sample && config.prompts){
    sample.addEventListener("change",()=>{
      prompt.value = config.prompts[sample.value] || "";
    });
    sample.dispatchEvent(new Event("change"));
  }

  run.addEventListener("click",()=>{
    const q = chat.value || prompt.value || "";
    output.innerText = config.reply ? config.reply(q) : "Demo ready";
  });
}
