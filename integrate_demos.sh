#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

# 1) The list of bot pages in your project folder
files=(coachai.html promopix.html sellerpro.html designdiva.html glambot.html chefgenie.html writersx.html bizbot.html)

# 2) Per-bot metadata
declare -A slug color img welcome
slug[coachai]="coachai";     color[coachai]="#0ab3b3"; img[coachai]="card_coachai.png";     welcome[coachai]="Hi, I’m CoachAI — let’s plan your success!"
slug[promopix]="promopix";   color[promopix]="#ff0077"; img[promopix]="card_promopix.png";   welcome[promopix]="Hey, I’m PromoPix — ready to boost your brand visuals!"
slug[sellerpro]="sellerpro"; color[sellerpro]="#222222"; img[sellerpro]="card_sellerpro.png"; welcome[sellerpro]="Welcome to SellerPro — let’s scale your sales smartly!"
slug[designdiva]="designdiva"; color[designdiva]="#11bfa9"; img[designdiva]="card_designdiva.png"; welcome[designdiva]="Hi there, I’m DesignDiva — your creative partner in style."
slug[glambot]="glambot";     color[glambot]="#d3a2ff"; img[glambot]="card_glambot.png";     welcome[glambot]="Hey gorgeous, I’m GlamBot — let’s glam your brand!"
slug[chefgenie]="chefgenie"; color[chefgenie]="#f7b85b"; img[chefgenie]="card_chefgenie.png"; welcome[chefgenie]="Bon appétit! I’m ChefGenie — let’s cook up success."
slug[writersx]="writersx";   color[writersx]="#000000"; img[writersx]="card_writerx.png";    welcome[writersx]="Hi, I’m WriterSX — let’s craft golden words together."
slug[bizbot]="bizbot";       color[bizbot]="#009f8a"; img[bizbot]="card_bizbot.png";         welcome[bizbot]="Hello CEO! I’m BizBot — your business power partner."

# 3) Loop through files and inject blocks if missing
for f in "${files[@]}"; do
  [[ -f "$f" ]] || { echo "⚠️  $f not found, skipping."; continue; }
  key="${f%.html}"

  # A) DEMO DIV — append if not present
  if ! grep -q "id=\"demo-${slug[$key]}\"" "$f"; then
    cat >>"$f" <<EOF

<!-- Demo Section (auto) -->
<div id="demo-${slug[$key]}" class="demo" data-mode="chat" style="padding:20px;">
  <div class="tabs" style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
    <button class="tab-chat">Chat Mode</button>
    <button class="tab-feature">Feature Mode</button>
    <select class="sample">
      <option value="Plan">Plan</option>
      <option value="Funnel">Funnel</option>
    </select>
  </div>

  <h3>Sample prompt</h3>
  <textarea class="prompt" style="width:100%;min-height:80px;"></textarea>
  <button class="copy">Copy Sample</button>

  <h3>Your chat message</h3>
  <textarea class="chat" placeholder="Type your message..." style="width:100%;min-height:100px;"></textarea>
  <button class="run" style="margin-top:10px;padding:10px 16px;background:${color[$key]};color:#fff;border:none;border-radius:6px;">Run</button>

  <div class="output" style="white-space:pre-wrap;border:1px dashed #ccc;min-height:120px;margin-top:10px;padding:8px;border-radius:8px;"></div>

  <div class="notice" style="display:none;margin-top:8px;background:#111;color:#fff;padding:8px;border-radius:8px">
    Upgrade to unlock unlimited use.
  </div>
</div>
EOF
    echo "✅ Added demo DIV to $f"
  else
    echo "ℹ️  Demo DIV already exists in $f"
  fi

  # B) INIT SCRIPT — append if not present
  if ! grep -q "initDemo('demo-${slug[$key]}'" "$f"; then
    cat >>"$f" <<'EOF'

<!-- Demo Init (auto) -->
<script src="main.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  initDemo('demo-__SLUG__', {
    slug: '__SLUG__',
    welcome: "__WELCOME__",
    example: "Give me a 30-day plan for __SLUG__.",
    prompts: {
      Plan: "Write a sample task plan related to __SLUG__.",
      Funnel: "Outline a strategy funnel for __SLUG__."
    },
    samples: {
      Plan: "• Step One\n• Step Two\n• Step Three",
      Funnel: "1) Idea\n2) Execution\n3) Result"
    }
  });
});
</script>
EOF
    # Replace placeholders safely
    sed -i "s/__SLUG__/${slug[$key]}/g" "$f"
    # Use | as sed delimiter to avoid issues with slashes/quotes in welcome text
    sed -i "s|__WELCOME__|${welcome[$key]}|g" "$f"
    echo "✅ Inserted init script into $f"
  else
    echo "ℹ️  Init script already exists in $f"
  fi
done

echo "🎉 All done."
