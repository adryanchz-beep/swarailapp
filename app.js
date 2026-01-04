document.addEventListener("DOMContentLoaded", () => {

  // Back to top
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Image alt SEO fallback
  document.querySelectorAll("img").forEach(img => {
    if (!img.alt || img.alt.trim() === "") {
      img.alt = "swarailapk";
    }
  });

  // External links safety
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.rel = "noopener noreferrer";
    link.target = "_blank";
  });

});
