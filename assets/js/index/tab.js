export function createFilterTab() {
  document.querySelectorAll(".filter-section").forEach((section) => {
    const result = section.nextElementSibling;
    if (!result?.classList.contains("filter-section-result")) return;

    section.querySelectorAll(".filter-button[data-type]").forEach((btn) => {
      btn.addEventListener("click", function () {
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        // Disable tất cả ScrollTrigger tạm thời
        ScrollTrigger.getAll().forEach((st) => st.disable());

        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              item.style.display =
                type === "all" || item.dataset.filter === type ? "" : "none";
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 })
          .call(() => {
            // Enable lại ScrollTrigger và refresh
            ScrollTrigger.getAll().forEach((st) => st.enable());
            ScrollTrigger.refresh();
          });
      });
    });
  });
}
