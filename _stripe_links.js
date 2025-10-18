(function(){
  const STRIPE = {
    BizBot:     "https://buy.stripe.com/cNi28r0Dy1eH3sU7j32880m",
    SellerPro:  "https://buy.stripe.com/4gM00jfys5uX9Ri5aV2880n",
    CoachAI:    "https://buy.stripe.com/cNicN50Dyg9B0gIavf2880o",
    WriterSX:   "https://buy.stripe.com/7sYbJ12LGe1tgfG1YJ2880p",
    DesignDiva: "https://buy.stripe.com/8x26oH5XSaPh9Ri8n72880q",
    ChefGenie:  "https://buy.stripe.com/14A00j71WbTl2oQ46R2880r",
    PromoPix:   "https://buy.stripe.com/14A9AT4TObTlgfGfPz2880s",
    GlamBot:    "https://buy.stripe.com/14A7sL860g9B4wYeLv2880t"
  };

  const DEMO = {
    BizBot:     "./bots/bizbot.html",
    SellerPro:  "./bots/sellerpro.html",
    CoachAI:    "./bots/coachai.html",
    WriterSX:   "./bots/writersx.html",
    DesignDiva: "./bots/designdiva.html",
    ChefGenie:  "./bots/chefgenie.html",
    PromoPix:   "./bots/promopix.html",
    GlamBot:    "./bots/glambot.html"
  };

  // attach Stripe to Buy buttons
  document.querySelectorAll(".buy-btn[data-bot]").forEach(a=>{
    const k=a.getAttribute("data-bot"); if(STRIPE[k]) a.href=STRIPE[k];
  });

  // attach Demo links
  document.querySelectorAll(".demo-btn[data-bot]").forEach(a=>{
    const k=a.getAttribute("data-bot"); if(DEMO[k]) a.href=DEMO[k];
  });
})();
