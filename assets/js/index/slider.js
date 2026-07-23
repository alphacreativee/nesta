export function sectionNews() {
  if ($(".section-news").length < 1) return;

  console.log("hello");

  document.querySelectorAll(".section-news").forEach((section) => {
    const swiperEl = section.querySelector(".news-slider .swiper");

    if (!swiperEl) return;

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true
      },
      navigation: {
        prevEl: section.querySelector(".arrow-prev"),
        nextEl: section.querySelector(".arrow-next")
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 24
        }
      }
    });
  });
}

export function sliderWithShadow() {
  // slider with shadow
  if ($(".slider-with-shadow").length < 1) return;

  document.querySelectorAll(".slider-with-shadow").forEach((section) => {
    const swiperEl = section.querySelector(".slider-with-shadow .swiper");

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 0,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true
      },
      navigation: {
        prevEl: section.querySelector(".arrow-prev"),
        nextEl: section.querySelector(".arrow-next")
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    });
  });
}

export function sliderParallax() {
  if ($("[slider-parallax]").length < 1) return;

  var interleaveOffset = 0.8;

  $("[slider-parallax]").each(function () {
    const swiperEl = this;
    const $swiper = $(this);

    const hasAutoplay =
      window.innerWidth < 992
        ? false
        : swiperEl.hasAttribute("slider-autoplay");

    const hasNoDrag = swiperEl.hasAttribute("slider-no-drag");
    const hasChangeLabel = swiperEl.hasAttribute("slider-change-label");

    const $sliderTitle = $swiper.find(".slider-title");
    const $pagination = $swiper.find(".slider-pagination");

    const $wrapper = $swiper.closest(".wrapper-slider-parallax");
    const nextBtn = $wrapper.find(".arrow-next")[0];
    const prevBtn = $wrapper.find(".arrow-prev")[0];

    const hasArrow =
      swiperEl.hasAttribute("slider-arrow") && nextBtn && prevBtn;

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      init: true,
      loop: true,
      speed: 1500,
      watchSlidesProgress: true,

      keyboard: !hasNoDrag,
      // mousewheel: !hasNoDrag,
      grabCursor: !hasNoDrag,
      allowTouchMove: hasNoDrag ? false : true,

      autoplay: hasAutoplay
        ? {
            delay: 4000,
            disableOnInteraction: true
          }
        : false,

      navigation: hasArrow
        ? {
            nextEl: nextBtn,
            prevEl: prevBtn
          }
        : false,
      on: {
        init(swiper) {
          if (hasChangeLabel) updateLabel(swiper);
        },

        slideChange(swiper) {
          if (hasChangeLabel) updateLabel(swiper);
        },

        progress: function (swiper) {
          swiper.slides.forEach(function (slide) {
            const slideProgress = slide.progress || 0;
            const innerOffset = swiper.width * interleaveOffset;
            const innerTranslate = slideProgress * innerOffset;

            if (!isNaN(innerTranslate)) {
              const slideInner = slide.querySelector(".image");
              if (slideInner) {
                slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
              }
            }
          });
        },

        touchStart: function (swiper) {
          swiper.slides.forEach(function (slide) {
            slide.style.transition = "";
          });
        },

        setTransition: function (swiper, speed) {
          const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";

          swiper.slides.forEach(function (slide) {
            slide.style.transition = `${speed}ms ${easing}`;

            const slideInner = slide.querySelector(".image");
            if (slideInner) {
              slideInner.style.transition = `${speed}ms ${easing}`;
            }
          });
        }
      }
    });

    function updateLabel(swiper) {
      const realIndex = swiper.realIndex;

      const realSlides = swiper.el.querySelectorAll(
        ".swiper-slide:not(.swiper-slide-duplicate)"
      );

      const total = realSlides.length;
      const currentSlide = realSlides[realIndex];
      const title = currentSlide?.dataset?.title || "";

      if ($sliderTitle.length) {
        $sliderTitle.text(title);
      }

      if ($pagination.length) {
        $pagination.text(`${realIndex + 1}/${total}`);
      }
    }
  });

  // init on open modal
  document
    .querySelectorAll(".modal-accommodation-detail")
    .forEach((modalEl) => {
      modalEl.addEventListener("shown.bs.modal", () => {
        const swiperEl = modalEl.querySelector("[slider-parallax]");

        if (!swiperEl || !swiperEl.swiper) return;

        const swiper = swiperEl.swiper;

        swiper.update();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.slideToLoop(0, 0, false);
      });
    });
}

export function sliderGallery() {
  const gallerySection = document.querySelector(".slider-gallery");
  if (!gallerySection) return;

  let isTransitioning = false;
  let contentTimeout = null;

  const swiperThumbnails = new Swiper(".slider-thumbnail", {
    spaceBetween: 12,
    slidesPerView: 2.2,
    freeMode: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,

    navigation: {
      nextEl: ".thumbnail-list-wrapper .swiper-button-next",
      prevEl: ".thumbnail-list-wrapper .swiper-button-prev"
    },

    on: {
      init() {
        this.el.style.opacity = "1";
      }
    },

    breakpoints: {
      768: {
        slidesPerView: 3.5
      },
      992: {
        slidesPerView: 6
      }
    }
  });

  const swiperBg = new Swiper(".slider-image-bg", {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: "fade",
    speed: 1000,
    fadeEffect: {
      crossFade: true
    },
    thumbs: {
      swiper: swiperThumbnails
    },
    on: {
      slideChangeTransitionStart: function () {
        // Clear timeout cũ nếu có
        if (contentTimeout) {
          clearTimeout(contentTimeout);
          contentTimeout = null;
        }

        // Kill tất cả animation đang chạy
        const contentGroup = gallerySection.querySelector(
          ".content-thumbnail-group"
        );
        if (contentGroup) {
          gsap.killTweensOf(contentGroup.querySelectorAll("*"));
        }

        isTransitioning = true;

        if (!contentGroup) {
          isTransitioning = false;
          return;
        }

        // Fade out nội dung cũ nhanh hơn
        const currentElements = contentGroup.querySelectorAll(
          ".name-room, .description, a"
        );
        if (currentElements.length > 0) {
          gsap.to(currentElements, {
            autoAlpha: 0,
            y: -10,
            ease: "power2.in",
            duration: 0.2,
            stagger: 0.03
          });
        }

        // Dùng biến timeout để có thể clear
        contentTimeout = setTimeout(() => {
          const activeSlide = this.slides[this.activeIndex];
          const contentWrapper = activeSlide?.querySelector(
            ".thumbnail-content-wrapper"
          );

          if (!contentWrapper) {
            contentGroup.innerHTML = "";
            isTransitioning = false;
            return;
          }

          const nameRoom =
            contentWrapper.querySelector(".name-room")?.innerHTML.trim() || "";
          const description =
            contentWrapper.querySelector(".description")?.innerHTML.trim() ||
            "";
          const link = contentWrapper.querySelector("a");

          let contentHTML = "";
          if (nameRoom)
            contentHTML += `<div class="name-room">${nameRoom}</div>`;
          if (description)
            contentHTML += `<div class="description">${description}</div>`;
          if (link) contentHTML += `${link.outerHTML}`;

          contentGroup.innerHTML = contentHTML;

          // Animate nội dung mới
          const newName = contentGroup.querySelector(".name-room");
          const newDesc = contentGroup.querySelector(".description");
          const newLink = contentGroup.querySelector("a");

          const animationPromises = [];

          if (newName) {
            const tween = gsap.fromTo(
              newName,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.1
              }
            );
            animationPromises.push(tween);
          }
          if (newDesc) {
            const tween = gsap.fromTo(
              newDesc,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.2
              }
            );
            animationPromises.push(tween);
          }
          if (newLink) {
            const tween = gsap.fromTo(
              newLink,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.3,
                onComplete: () => {
                  isTransitioning = false;
                }
              }
            );
            animationPromises.push(tween);
          } else {
            // Nếu không có link thì set lại flag sau animation cuối
            setTimeout(() => {
              isTransitioning = false;
            }, 700);
          }
        }, 250);
      },
      slideChangeTransitionEnd: function () {
        // Backup: đảm bảo reset flag
        setTimeout(() => {
          isTransitioning = false;
        }, 100);
      }
    }
  });

  // Khởi tạo nội dung cho slide đầu tiên
  const initialSlide = swiperBg.slides[swiperBg.activeIndex];
  const initialContentWrapper = initialSlide?.querySelector(
    ".thumbnail-content-wrapper"
  );
  const contentGroup = gallerySection.querySelector(".content-thumbnail-group");

  if (initialContentWrapper && contentGroup) {
    const nameRoom =
      initialContentWrapper.querySelector(".name-room")?.innerHTML.trim() || "";
    const description =
      initialContentWrapper.querySelector(".description")?.innerHTML.trim() ||
      "";
    const link = initialContentWrapper.querySelector("a");

    let initialHTML = "";
    if (nameRoom) initialHTML += `<div class="name-room">${nameRoom}</div>`;
    if (description)
      initialHTML += `<div class="description">${description}</div>`;
    if (link) initialHTML += `${link.outerHTML}`;

    contentGroup.innerHTML = initialHTML;

    // Animate lần đầu với ScrollTrigger
    const initName = contentGroup.querySelector(".name-room");
    const initDesc = contentGroup.querySelector(".description");
    const initLink = contentGroup.querySelector("a");

    const elementsToAnimate = [initName, initDesc, initLink].filter(Boolean);

    if (elementsToAnimate.length > 0) {
      // Set initial state
      gsap.set(elementsToAnimate, { autoAlpha: 0, y: 30 });

      // Create ScrollTrigger animation
      ScrollTrigger.create({
        trigger: ".slider-gallery",
        start: "top 50%",
        once: true,
        onEnter: () => {
          if (initName) {
            gsap.to(initName, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.2
            });
          }
          if (initDesc) {
            gsap.to(initDesc, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.4
            });
          }
          if (initLink) {
            gsap.to(initLink, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.6
            });
          }
        }
      });
    }
  }
}

export function sliderChangeContent() {
  document.querySelectorAll("section.hero").forEach((section) => {
    if (!section.querySelector(".hero-slider")) return;

    let isTransitioning = false;

    const heroSwiper = new Swiper(section.querySelector(".hero-slider"), {
      slidesPerView: 1,
      speed: 1000,
      loop: false,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: "section.hero .slider-pagination",
        type: "fraction"
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      on: {
        slideChangeTransitionStart: function () {
          if (isTransitioning) return;
          isTransitioning = true;

          const currentTag = section.querySelector(".current-tag");
          const currentTitle = section.querySelector(".current-title");

          if (currentTag) {
            gsap.to(currentTag, {
              autoAlpha: 0,
              y: -5,
              ease: "power2.out",
              duration: 0.3
            });
          }

          if (currentTitle) {
            const titleLines = currentTitle.querySelectorAll(".line");
            if (titleLines.length > 0) {
              gsap.to(titleLines, {
                autoAlpha: 0,
                y: -10,
                ease: "power2.in",
                duration: 0.3,
                stagger: 0.015
              });
            } else {
              gsap.to(currentTitle, {
                autoAlpha: 0,
                y: -10,
                ease: "power2.out",
                duration: 0.3
              });
            }
          }

          const swiper = this; // Lưu reference của Swiper

          setTimeout(() => {
            const nextSlide = swiper.slides[swiper.activeIndex];
            const slideContent = nextSlide.querySelector(
              ".hero-slider-content"
            );

            if (!slideContent) return;

            const nextTag =
              slideContent.querySelector(".slider-tag")?.innerHTML || "";
            const nextTitle =
              slideContent.querySelector(".slider-title")?.innerHTML || "";

            // Cập nhật content
            const contentContainer = section.querySelector(
              ".slider-content-import"
            );
            if (contentContainer) {
              let contentHTML = "";
              if (nextTag) {
                contentHTML += `<div class='current-tag'>${nextTag}</div>`;
              }
              if (nextTitle) {
                contentHTML += `<h1 class='current-title'>${nextTitle}</h1>`;
              }
              contentContainer.innerHTML = contentHTML;

              const newTag = contentContainer.querySelector(".current-tag");
              const newTitle = contentContainer.querySelector(".current-title");

              if (newTag) {
                gsap.fromTo(
                  newTag,
                  { autoAlpha: 0, y: 5 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.4,
                    delay: 0.1
                  }
                );
              }

              if (newTitle && typeof SplitText !== "undefined") {
                const split = new SplitText(newTitle, {
                  type: "lines",
                  linesClass: "line"
                });

                split.lines.forEach((line) => {
                  const wrapper = document.createElement("div");
                  wrapper.style.overflow = "hidden";
                  line.parentNode.insertBefore(wrapper, line);
                  wrapper.appendChild(line);
                });

                gsap.fromTo(
                  split.lines,
                  { autoAlpha: 0, y: 30 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.5,
                    delay: 0.2,
                    stagger: 0.08
                  }
                );
              } else if (newTitle) {
                gsap.fromTo(
                  newTitle,
                  { autoAlpha: 0, y: 20 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.4,
                    delay: 0.2
                  }
                );
              }
            }
          }, 400);
        },

        slideChangeTransitionEnd: function () {
          isTransitioning = false;
        }
      }
    });

    // Init content cho slide đầu tiên
    const initialSlide = heroSwiper.slides[heroSwiper.activeIndex];
    const initialSlideContent = initialSlide?.querySelector(
      ".hero-slider-content"
    );

    if (initialSlideContent) {
      const initialTag =
        initialSlideContent.querySelector(".slider-tag")?.innerHTML || "";
      const initialTitle =
        initialSlideContent.querySelector(".slider-title")?.innerHTML || "";

      const contentContainer = section.querySelector(".slider-content-import");
      if (contentContainer) {
        let initialContentHTML = "";
        if (initialTag) {
          initialContentHTML += `<div class='current-tag'>${initialTag}</div>`;
        }
        if (initialTitle) {
          initialContentHTML += `<h1 class='current-title'>${initialTitle}</h1>`;
        }
        contentContainer.innerHTML = initialContentHTML;

        // Animate initial content
        const initialTagElement =
          contentContainer.querySelector(".current-tag");
        const initialTitleElement =
          contentContainer.querySelector(".current-title");

        // Animate tag
        if (initialTagElement) {
          gsap.fromTo(
            initialTagElement,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.8,
              delay: 0.5
            }
          );
        }

        if (initialTitleElement && typeof SplitText !== "undefined") {
          const split = new SplitText(initialTitleElement, {
            type: "lines",
            linesClass: "line"
          });

          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.fromTo(
            split.lines,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.7,
              stagger: 0.08
            }
          );
        } else if (initialTitleElement) {
          // Fallback
          gsap.fromTo(
            initialTitleElement,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.8,
              delay: 0.7
            }
          );
        }

        const lineVertical = section.querySelector(
          ".slider-content-line-vertical"
        );
        if (lineVertical) {
          lineVertical.classList.add("active");
        }
        setTimeout(() => {
          const sliderPagination = section.querySelector(
            ".slider-content-wrapper .slider-pagination"
          );
          if (sliderPagination) {
            sliderPagination.classList.add("active");
          }
        }, 1000);
      }
    }
  });
}
