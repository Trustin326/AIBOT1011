// assets/js/demo.js
(function(){
  // Detect bot name from hero: <section class="hero" data-hero-for="BizBot">
  const hero = document.querySelector("[data-hero-for]");
  const botName = (hero && hero.getAttribute("data-hero-for")) || (document.body.dataset.bot || "").trim();

  const DATA = {
    "BizBot": {
      features: [
        "Generates product ideas",
        "Marketing offers",
        "Sales scripts",
        "Funnel Planner",
        "ROI Estimator"
      ],
      samples: [
        "Create 5 product ideas for a digital planner business.",
        "Write a short sales script for a $39 mini course.",
        "Outline a 3-step funnel to sell a workbook."
      ]
    },
    "SellerPro": {
      features: [
        "Product Blueprint",
        "Pricing Wizard",
        "Sales Page Writer",
        "Email Funnel Builder"
      ],
      samples: [
        "Draft a $7 tripwire offer for new subscribers.",
        "Suggest 3 price points for a template pack.",
        "Write 3 sales page headlines for a workbook."
      ]
    },
    "CoachAI": {
      features: [
        "Mindset & productivity mentor",
        "Habit Tracker",
        "Affirmation Maker",
        "Goal Map"
      ],
      samples: [
        "Create a 7-day habit plan for writing daily.",
        "Write 5 affirmations to stay focused.",
        "Map goals for launching a side hustle in 30 days."
      ]
    },
    "DesignDiva": {
      features: [
        "Template-Builder",
        "Brand Palette Creator",
        "LogoSketcher",
        "Pin Generator"
      ],
      samples: [
        "Suggest a color palette for a modern wellness brand.",
        "Describe a minimalist logo idea for \"Glow&Grow\".",
        "Draft 3 Pinterest pin ideas for a productivity blog."
      ]
    },
    "GlamBot": {
      features: [
        "Beauty advice & tips",
        "Skincare recommendations",
        "Fashion suggestions"
      ],
      samples: [
        "Suggest a simple skincare routine for dry skin.",
        "Makeup tips for a natural daytime look.",
        "Outfit ideas for a casual business lunch."
      ]
    },
    "ChefGenie": {
      features: [
        "Turn ingredients into dishes",
        "Recipe generator",
        "Nutrition analyzer",
        "Meal planner"
      ],
      samples: [
        "Make a dinner recipe with chicken, rice, and spinach.",
        "Create a 3-day meal plan under 1800 calories.",
        "Healthy lunch ideas that take < 20 minutes."
      ]
    },
    "PromoPix": {
      features: [
        "Pin Designer",
        "Caption Writer",
        "Hashtag Finder",
        "Content Calendar"
      ],
      samples: [
        "Write an Instagram caption for a new eBook launch.",
        "Find 10 hashtags for a digital planner reel.",
        "Plan 5 post ideas for next week."
      ]
    },
    "WriterSX": {
      features: [
        "Creates high-quality content",
        "Blog Post Generator",
        "Article Writer",
        "Storyteller"
      ],
      samples: [
        "Outline a blog post about time-blocking tips.",
        "Write an intro paragraph for AI side hustles.",
        "Give 5 story ideas for a cozy mystery."
      ]
    }
  };

  const BOT = DATA[botName] || {
    features: ["Feature A", "Feature B", "Feature C"],
    samples: ["Sample 1", "Sample 2", "Sample 3"]
  };

  const wrap   = document.querySelector(".bot-demo");
  if(!wrap) return;

  // Set visible bot name
  const nameEls = wrap.querySelectorAll(".js-bot-name");
  nameEls.forEach(n => n.textContent = botName || "Live Demo");

  // Build features list above the demo
  const featsUl = wrap.querySelector(".js-feature-list");
  if (featsUl) {
    featsUl.innerHTML = "";
    BOT.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      featsUl.appendChild(li);
    });
  }

  // Build dropdown with 3+ samples
  const sel = wrap.querySelector(".js-sample");
  if (sel) {
    sel.innerHTML = "";
    BOT.samples.forEach((s, i) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = `Sample ${i+1}: ${s}`;
      sel.appendChild(opt);
    });
  }

  // Wire demo UI
  const area = wrap.querySelector(".js-input");
  const out  = wrap.querySelector(".js-output");
  const btn  = wrap.querySelector(".js-run");
  const selEl= wrap.querySelector(".js-sample");

  selEl && selEl.addEventListener("change", () => {
    if (area && !area.value.trim()) area.value = selEl.value;
  });

  btn && btn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = (area && area.value.trim()) || (selEl && selEl.value) || "";
    if (!text) {
      out.textContent = "Please choose a sample or type your own request, then click Run Demo.";
      return;
    }
    out.textContent =
`▶︎ ${botName} received:
${text}

(Preview only — this demo shows how your request will be captured and sent.)`;
  });
})();
