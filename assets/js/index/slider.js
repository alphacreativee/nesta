export function sectionNews() {
  if ($(".section-news").length < 1) return;

  document.querySelectorAll(".section-news").forEach((section) => {
    const swiperEl = section.querySelector(".news-slider");

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 40,
      loop: false,
      speed: 800,
      autoplay: false,
      navigation: {
        prevEl: section.querySelector(".arrow-prev"),
        nextEl: section.querySelector(".arrow-next")
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
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
