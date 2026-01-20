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
    // markers: true,
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
export function bookingTime() {
  if (!document.querySelector(".booking-form-wrapper")) return;

  function positionCalendar() {
    var input = picker._opts.field;
    var rect = input.getBoundingClientRect();
    var calendar = picker.el;

    if (rect.top >= window.innerHeight / 2) {
      calendar.style.top =
        rect.top + window.scrollY - calendar.offsetHeight - 20 + "px";
      calendar.style.left = rect.left + window.scrollX - 30 + "px";
      calendar.style.borderRadius = "12px 12px 0 0";
    } else {
      calendar.style.top = rect.bottom + window.scrollY + 15 + "px";
      calendar.style.left = rect.left + window.scrollX - 30 + "px";
      calendar.style.borderRadius = "0 0 12px 12px";
    }
  }

  var picker = new Lightpick({
    field: document.getElementById("checkInDate"),
    secondField: document.getElementById("checkOutDate"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 2,
    startDate: moment().startOf("day").toDate(),
    endDate: moment().startOf("day").add(1, "days").toDate(),

    onOpen: function () {
      positionCalendar();
      setTimeout(positionCalendar, 50);

      // Thêm event listener cho scroll khi calendar mở
      window.addEventListener("scroll", positionCalendar);
      window.addEventListener("resize", positionCalendar);
    },

    onClose: function () {
      // Xóa event listener khi calendar đóng
      window.removeEventListener("scroll", positionCalendar);
      window.removeEventListener("resize", positionCalendar);
    },

    onMonthChange: function () {
      setTimeout(positionCalendar, 10);
    },

    onYearChange: function () {
      setTimeout(positionCalendar, 10);
    },
  });

  const bookingCalendar = document.querySelector(".booking-calendar");
  if (bookingCalendar) {
    bookingCalendar.addEventListener("click", function (e) {
      e.stopPropagation();
      picker.show();
      document.getElementById("checkInDate").focus();
    });

    bookingCalendar.style.cursor = "pointer";
  }
}
export function effectText() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.utils.toArray(".data-fade-in").forEach((element) => {
    const delay = parseFloat(element.getAttribute("data-delay")) || 0;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform",
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "sine.out",
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 80%",
        },
      },
    );
  });

  gsap.utils.toArray(".effect-line-auto").forEach((description) => {
    const delay = parseFloat(description.getAttribute("data-delay")) || 0;

    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100, willChange: "transform" },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: delay,
      },
    );
  });

  gsap.utils.toArray(".effect-line").forEach((description) => {
    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100, willChange: "transform" },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: description,
          start: "top 80%",
        },
      },
    );
  });
}

export function animationItemsSection() {
  if ($(window).width() < 992) return;

  // fade each items
  gsap.utils.toArray("[section-fade-each-item]").forEach((section) => {
    const items = section.querySelectorAll("[data-fade-item]");

    gsap.set(items, { y: 40, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none none",
        // markers: true,
      },
    });

    tl.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
    });
  });
}

export function fadeTextFooter() {
  if ($(".section-accommodation").length > 0) return;

  gsap.set("[data-text-footer]", {
    opacity: 0,
    y: 20,
  });
  let tlf = gsap.timeline({ paused: true });

  tlf.fromTo(
    "[data-text-footer]",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
    },
  );
  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    // markers: true,
    animation: tlf,
    toggleActions: "play none none none",
  });

  return tlf;
}

export function scrollToTop() {
  document
    .querySelector(".btn-scroll-top")
    .addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
export function ctaRun() {
  const cta = document.getElementById("cta");
  if (!cta) return;

  const footer = document.querySelector("footer");
  if (!footer) return;

  gsap.registerPlugin(ScrollTrigger);

  let isInFooter = false;

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (!isInFooter) {
        cta.classList.toggle("run-right", self.direction === 1);
      }
    },
  });

  ScrollTrigger.create({
    trigger: "footer",
    start: "top bottom",
    end: "bottom bottom",
    onEnter: () => {
      isInFooter = true;
      cta.classList.remove("run-right");
    },
    onLeaveBack: () => {
      isInFooter = false;
      cta.style.position = "fixed";
      cta.style.top = "";
    },
    onUpdate: (self) => {
      if (isInFooter) {
        const footerRect = footer.getBoundingClientRect();
        const ctaHeight = cta.offsetHeight;

        if (footerRect.top < window.innerHeight) {
          cta.style.position = "absolute";
          cta.style.top = footer.offsetTop - ctaHeight - 80 + "px";
        }
      }
    },
  });
}
export function initGuestSelector() {
  document
    .querySelectorAll(".booking-form-item .select-people")
    .forEach((container) => {
      const adultDisplay = container.querySelector(".adult-value");
      const childDisplay = container.querySelector(".child-value");

      const selectBox = container.querySelector(".select-box");

      const adultValElem = selectBox.querySelector(".adult .val");
      const childValElem = selectBox.querySelector(".child .val");

      const adultMinus = selectBox.querySelector(".adult .min");
      const adultPlus = selectBox.querySelector(".adult .plus");
      const childMinus = selectBox.querySelector(".child .min");
      const childPlus = selectBox.querySelector(".child .plus");

      let adults = parseInt(adultValElem.textContent) || 1;
      let children = parseInt(childValElem.textContent) || 0;

      function updateDisplay() {
        adultValElem.textContent = adults;
        childValElem.textContent = children;

        adultDisplay.textContent = adults;
        childDisplay.textContent = children;

        adultMinus.style.opacity = adults <= 1 ? "0.4" : "1";
        adultMinus.style.pointerEvents = adults <= 1 ? "none" : "auto";

        childMinus.style.opacity = children <= 0 ? "0.4" : "1";
        childMinus.style.pointerEvents = children <= 0 ? "none" : "auto";
      }

      adultMinus.addEventListener("click", () => {
        if (adults > 1) {
          adults--;
          updateDisplay();
        }
      });

      adultPlus.addEventListener("click", () => {
        adults++;
        updateDisplay();
      });

      childMinus.addEventListener("click", () => {
        if (children > 0) {
          children--;
          updateDisplay();
        }
      });

      childPlus.addEventListener("click", () => {
        children++;
        updateDisplay();
      });

      updateDisplay();

      const displayArea = container.querySelector(".select-people-wrapper");
      if (displayArea) {
        displayArea.addEventListener("click", (e) => {
          if (!e.target.closest(".select-box")) {
            selectBox.classList.toggle("active");
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
          selectBox.classList.remove("active");
        }
      });
    });
}
