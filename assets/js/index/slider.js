export function sectionNews() {
  if ($(".section-news").length < 1) return;

  document.querySelectorAll(".section-news").forEach((section) => {
    const swiperEl = section.querySelector(".news-slider");

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 24,
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

export function hotelFilterSlider() {
  if ($(".hotel-filter").length < 1) return;

  document.querySelectorAll(".hotel-filter__slider").forEach((section) => {
    const swiperEl = section.querySelector(".hotel-filter__slider .swiper");

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 0,
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
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
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
