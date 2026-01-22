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
export function createFilterTabMulti() {
  document.querySelectorAll(".filter-section-multi").forEach((section) => {
    const result = section.nextElementSibling;
    if (!result?.classList.contains("filter-section-result")) return;

    section.querySelectorAll(".filter-button[data-type]").forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active state
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        // Animate fade out -> filter -> fade in
        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              if (type === "all") {
                item.style.display = "";
              } else {
                // Kiểm tra xem item có class tương ứng không
                item.style.display = item.classList.contains(type)
                  ? ""
                  : "none";
              }
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 });
      });
    });
  });
}
