/* fix_cards.js
   ✅ Forces correct pricing card per bot page + fixes mismatched images everywhere
*/

(function () {
  const MAP = {
    coachai: "assets/img/cards/card_coachai.png",
    promopix: "assets/img/cards/card_promopix.png",
    sellerpro: "assets/img/cards/card_sellerpro.png",
    designdiva: "assets/img/cards/card_designdiva.png",
    glambot: "assets/img/cards/card_glambot.png",
    chefgenie: "assets/img/cards/card_chefgenie.png",
    writersx: "assets/img/cards/card_writerx.png",
    bizbot: "assets/img/cards/card_bizbot.png",
  };

  function getPageSlug() {
    const p = (location.pathname.split("/").pop() || "").toLowerCase();
    const slug = p.replace(".html", "");
    return slug;
  }

  function replaceWrongCards(slug) {
    const correct = MAP[slug];
    if (!correct) return;

    // Replace any hero card images
    document.querySelectorAll("img").forEach((img) => {
      const src = (img.getAttribute("src") || "").toLowerCase();
      if (!src) return;

      // If it references any card_ file, force to correct one
      if (src.includes("card_") && (src.includes(".png") || src.includes(".jpg") || src.includes(".jpeg"))) {
        img.setAttribute("src", correct);
      }
    });
  }

  function fixHomepageGallery() {
    // Ensure homepage has ONE top gallery only
    const gallery = document.querySelector("[data-cards-gallery]");
    if (!gallery) return;

    // Update gallery images if missing/wrong
    const links = gallery.querySelectorAll("a");
    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      const key = href.replace(".html", "");
      const img = a.querySelector("img");
      if (img && MAP[key]) img.setAttribute("src", MAP[key]);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const slug = getPageSlug();
    replaceWrongCards(slug);
    fixHomepageGallery();
  });
})();
