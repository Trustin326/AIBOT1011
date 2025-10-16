
function $(s,ctx=document){return ctx.querySelector(s)}
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms))
async function typeInto(el,text,speed=10){el.textContent='';for(const ch of text){el.textContent+=ch;await sleep(speed)}}

function initDemo(rootId, config){
  const root = document.getElementById(rootId); if(!root) return;
  const chatBtn = root.querySelector('.tab-chat');
  const featBtn = root.querySelector('.tab-feature');
  const chatInput = root.querySelector('textarea.chat');
  const promptBox = root.querySelector('textarea.prompt');
  const out = root.querySelector('.output');
  const sel = root.querySelector('select.sample');
  const copyBtn = root.querySelector('.copy');
  const exampleBtns = root.querySelectorAll('.ex');

  typeInto(out, config.welcome || "Hi! Choose Chat or Feature Mode then press Run.", 4);
  promptBox.value = config.example || "";

  chatBtn.addEventListener('click',()=>{
    root.dataset.mode='chat';
    promptBox.value = config.example || "";
  });
  featBtn.addEventListener('click',()=>{
    root.dataset.mode='feature';
    const k = sel.value;
    promptBox.value = (config.prompts && config.prompts[k]) || "";
  });
  sel.addEventListener('change',()=>{
    const k = sel.value;
    promptBox.value = (config.prompts && config.prompts[k]) || "";
  });
  copyBtn.addEventListener('click',()=>{
    navigator.clipboard.writeText(promptBox.value || "");
    copyBtn.textContent="Copied!"; setTimeout(()=>copyBtn.textContent="Copy Sample",900);
  });
  exampleBtns.forEach(btn=>btn.addEventListener('click',()=>{ chatInput.value = btn.dataset.fill || ""; }));

  root.querySelector('.run').addEventListener('click', async ()=>{
    if(root.dataset.mode==='feature'){
      const k = sel.value;
      const txt = (config.samples && config.samples[k]) || "Sample unavailable.";
      await typeInto(out, txt, 6);
    }else{
      const q = (chatInput.value.trim() || promptBox.value || "Give me a quick example.");
      await typeInto(out,"Typing…",6); await sleep(200);
      const reply = (config.reply || ((x)=>`Preview for: “${x}”\n• Option A\n• Option B\n• Option C`))(q);
      await typeInto(out, reply, 6);
    }
  });
}
