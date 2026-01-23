export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select"
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
      onLeaveBack: () => header.classList.remove("header-theme-light")
      // markers: true,
    }
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
    onLeaveBack: () => bookingFormWrapper.classList.remove("booking-fixed")
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
    onLeaveBack: () => bookingFormWrapper.classList.remove("booking-up")
    // markers: true,
  });
}

export function setOfferDescHeight() {
  if ($("window").width() < 992) return;

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
    }
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
        willChange: "opacity, transform"
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
          end: "bottom 80%"
        }
      }
    );
  });

  gsap.utils.toArray(".effect-line-auto").forEach((description) => {
    const delay = parseFloat(description.getAttribute("data-delay")) || 0;

    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100, willChange: "transform" },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: delay
      }
    );
  });

  gsap.utils.toArray(".effect-line").forEach((description) => {
    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
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
          start: "top 80%"
        }
      }
    );
  });
}

export function animationItemsSection() {
  if ($(window).width() < 992) return;

  // fade each items
  const FADE_EASE = "ease";
  const LINE_EASE = "power1.out";
  let ITEM_DURATION = 0.3;

  gsap.utils.toArray("[section-fade-each-item]").forEach((section) => {
    if (section.hasAttribute("data-item-duration")) {
      ITEM_DURATION = parseFloat(section.getAttribute("data-item-duration"));
    }

    const items = section.querySelectorAll("[data-fade-item]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        toggleActions: "play none none none"
        // markers: true,
      }
    });

    items.forEach((item) => {
      const isLineItem = item.hasAttribute("fade-item-line");

      // ITEM LINE
      if (isLineItem) {
        const split = new SplitText(item, {
          type: "lines",
          linesClass: "line",
          mask: "lines"
        });

        gsap.set(split.lines, { yPercent: 120 });

        tl.to(split.lines, {
          yPercent: 0,
          duration: ITEM_DURATION,
          ease: LINE_EASE,
          stagger: {
            each: ITEM_DURATION / split.lines.length,
            ease: "none"
          }
        });
      }

      // ITEM FADE
      else {
        gsap.set(item, { y: 30, opacity: 0 });

        tl.to(item, {
          y: 0,
          opacity: 1,
          duration: ITEM_DURATION,
          ease: FADE_EASE
        });
      }
    });
  });
}

export function fadeTextFooter() {
  // if ($(".section-accommodation").length > 0) return;

  const elements = document.querySelectorAll("[data-text-footer]");

  gsap.set(elements, {
    opacity: 0,
    y: 20
  });

  let tlf = gsap.timeline({ paused: true });

  tlf.fromTo(
    elements,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    }
  );

  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    animation: tlf,
    toggleActions: "play none none none",
    invalidateOnRefresh: true // Reset animation khi refresh
    // markers: true,
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

  const isShortPage = () => {
    return document.body.scrollHeight <= window.innerHeight;
  };

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (!isInFooter && !isShortPage()) {
        cta.classList.toggle("run-right", self.direction === 1);
      }
    }
  });

  ScrollTrigger.create({
    trigger: "footer",
    start: "top bottom",
    end: "bottom bottom",
    onEnter: () => {
      isInFooter = true;
      cta.classList.remove("run-right");
      // Move to absolute position
      cta.style.position = "absolute";
      const ctaHeight = cta.offsetHeight;
      cta.style.top = footer.offsetTop - ctaHeight - 35 + "px";
    },
    onLeaveBack: () => {
      isInFooter = false;
      cta.style.position = "fixed";
      cta.style.top = "";
    }
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

export function accommodationDetail() {
  const $btn = $(".accommodation-detail .facilities-view-more");
  if ($btn.length < 1) return;

  const $more = $(".accommodation-detail .facilities-more");
  const $btnTextMore = $btn.data("read-more");
  const $btnTextLess = $btn.data("read-less");
  const duration = 500;

  $more.css({
    overflow: "hidden",
    height: 0,
    transition: `height ${duration}ms ease`
  });

  $btn.on("click", function () {
    const isOpen = $more.hasClass("is-open");
    const duration = 500;

    $btn.toggleClass("active");

    if (!isOpen) {
      // OPEN
      $more.addClass("is-open");

      const fullHeight = $more[0].scrollHeight;
      $more.css({
        height: fullHeight + "px",
        overflow: "hidden",
        transition: `height ${duration}ms ease`
      });

      setTimeout(() => {
        $more.css("height", "auto");
      }, duration);

      $btn.find("span").text($btnTextLess);
    } else {
      // CLOSE
      const currentHeight = $more[0].scrollHeight;

      $more.css("height", currentHeight + "px");
      $more[0].offsetHeight;
      $more.css("height", 0);

      setTimeout(() => {
        $more.removeClass("is-open");
      }, duration);

      $btn.find("span").text($btnTextMore);
    }
  });
}

export function sectionGallery() {
  if ($(".section-gallery").length < 1) return;

  let tabLightbox = null;
  let outsideLightbox = null;

  function createLightbox(selector) {
    if (!document.querySelector(`${selector} .glightbox`)) return null;

    return GLightbox({
      selector: `${selector} .glightbox`,
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      onOpen: handleCustomArrow
    });
  }

  outsideLightbox = createLightbox(".section-gallery");

  function initTabLightbox(selector) {
    if (tabLightbox) {
      tabLightbox.destroy();
      tabLightbox = null;
    }

    tabLightbox = createLightbox(selector);
  }

  // Init tab active
  const activeTab = document.querySelector(".tab-pane.active.show");
  if (activeTab) {
    initTabLightbox(`#${activeTab.id}`);
  }

  // On tab change
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach((btn) => {
    btn.addEventListener("shown.bs.tab", (e) => {
      initTabLightbox(e.target.getAttribute("data-bs-target"));
    });
  });

  function handleCustomArrow() {
    const prev = document.querySelector(".gprev");
    const next = document.querySelector(".gnext");

    if (prev && !prev.classList.contains("custom")) {
      prev.classList.add("custom");
      prev.innerHTML = `
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path
            d="M13 5.5C10 4.5 7 1 7 0M13 5.5C10 6.5 7 10 7 11M13 5.5H0"
            stroke="currentColor"
            stroke-linejoin="bevel"
          />
        </svg>
      `;
    }

    if (next && !next.classList.contains("custom")) {
      next.classList.add("custom");
      next.innerHTML = `
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path
            d="M13 5.5C10 4.5 7 1 7 0M13 5.5C10 6.5 7 10 7 11M13 5.5H0"
            stroke="currentColor"
            stroke-linejoin="bevel"
          />
        </svg>
      `;
    }
  }
}
export function headerMobile() {
  if (window.innerWidth >= 992) return;

  const hamburger = document.getElementById("hamburger");
  const subMenu = document.querySelector(".header-sub-menu");

  // Toggle hamburger menu
  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    subMenu.classList.toggle("active");

    if (this.classList.contains("active")) {
      // Disable scroll
      document.body.classList.add("overflow-hidden");

      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      // Enable scroll
      document.body.classList.remove("overflow-hidden");

      if (window.lenis) {
        window.lenis.start();
      }

      // Remove active từ tất cả menu-item-has-children
      const menuItemsWithChildren = document.querySelectorAll(
        ".menu-item-has-children"
      );
      menuItemsWithChildren.forEach((item) => {
        item.classList.remove("active");
      });

      // Remove show-menu từ tất cả sub-menu
      const allSubMenus = document.querySelectorAll(".sub-menu");
      allSubMenus.forEach((menu) => {
        menu.classList.remove("show-menu");
      });
    }
  });

  // Toggle submenu cho menu-item-has-children
  const menuItemsWithChildren = document.querySelectorAll(
    ".menu-item-has-children"
  );

  menuItemsWithChildren.forEach((menuItem) => {
    const menuLink = menuItem.querySelector("a");

    if (menuLink) {
      menuLink.addEventListener("click", function (e) {
        e.preventDefault();

        const subMenuElement = menuItem.querySelector(".sub-menu");
        if (subMenuElement) {
          subMenuElement.classList.toggle("show-menu");
          menuItem.classList.toggle("active");
        }
      });
    }
  });

  // Handle all back buttons
  const backButtons = document.querySelectorAll(".sub-menu-back");
  backButtons.forEach((backButton) => {
    backButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const currentSubMenu = this.closest(".sub-menu");
      if (currentSubMenu) {
        currentSubMenu.classList.remove("show-menu");

        const parentMenuItem = currentSubMenu.parentElement;
        if (
          parentMenuItem &&
          parentMenuItem.classList.contains("menu-item-has-children")
        ) {
          parentMenuItem.classList.remove("active");
        }
      }
    });
  });
}

export function sectionExperiences() {
  if ($(".section-experience").length < 1) return;

  document
    .querySelectorAll(".section-experience .image-parallax")
    .forEach((wrap) => {
      const img = wrap.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        img,
        { yPercent: -10 },
        {
          yPercent: 10, // parallax 10%
          ease: "none",
          scrollTrigger: {
            trigger: ".section-experience",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

  const section = document.querySelector(".section-experience");

  if ($(window).width() < 992) return;

  section.querySelectorAll(".box-parallax").forEach((box) => {
    let fromY = 0;
    let toY = 0;

    if (box.classList.contains("box-parallax-top")) {
      fromY = 0;
      toY = -15;
    }

    if (box.classList.contains("box-parallax-bottom")) {
      fromY = 0;
      toY = 15;
    }

    if (fromY === toY) return;

    gsap.fromTo(
      box,
      { yPercent: fromY },
      {
        yPercent: toY,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });
}
