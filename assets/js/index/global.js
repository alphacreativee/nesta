export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select",
  );

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          const optionText = item.textContent;
          displayText.textContent = optionText;
          dropdown.classList.add("selected");
        } else {
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<span>${currentText}</span><img src="${currentImg}" alt="" />`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}

export function scrollChangeBgHeader() {
  const header = document.querySelector("#header");
  if (!header || header.classList.contains("without-home")) return;
  gsap.to(header, {
    scrollTrigger: {
      trigger: "body",
      start: "top -10px",
      end: "+=100",
      onEnter: () => header.classList.add("header-theme-light"),
      onLeaveBack: () => header.classList.remove("header-theme-light"),
      // markers: true,
    },
  });
}
export function scrollFixedBookingForm() {
  const bookingFormWrapper = document.querySelector(".booking-form-wrapper");
  const headerHeight = document.querySelector("#header").clientHeight;

  if (!bookingFormWrapper) return;

  const bookingTop =
    bookingFormWrapper.getBoundingClientRect().top + window.pageYOffset;

  ScrollTrigger.create({
    trigger: "body",
    start: `${bookingTop}px ${headerHeight}px`,
    endTrigger: "body",
    end: "bottom bottom",
    onEnter: () => bookingFormWrapper.classList.add("booking-fixed"),
    onLeaveBack: () => bookingFormWrapper.classList.remove("booking-fixed"),
    // markers: true,
  });
}
export function checkScrollBookingUp() {
  const bookingFormWrapper = document.querySelector(".booking-form-wrapper");

  if (!bookingFormWrapper) return;

  const bookingTop =
    bookingFormWrapper.getBoundingClientRect().top + window.pageYOffset;
  ScrollTrigger.create({
    trigger: "body",
    start: `${bookingTop}px center`,
    endTrigger: "body",
    end: "bottom bottom",
    onEnter: () => bookingFormWrapper.classList.add("booking-up"),
    onLeaveBack: () => bookingFormWrapper.classList.remove("booking-up"),
    markers: true,
  });
}

export function setOfferDescHeight() {
  const items = document.querySelectorAll(".featured-offers .offer-item");

  items.forEach((item) => {
    const desc = item.querySelector(".content-desc");
    if (!desc) return;

    const height = desc.offsetHeight;

    item.style.setProperty("--height-desc", `${height}px`);
  });
}
