import { preloadImages } from "../../main/js/utils.min.js";
import {
  customDropdown,
  scrollChangeBgHeader,
  scrollFixedBookingForm,
} from "../../main/js/global.min.js";
import { sectionNews, hotelFilterSlider } from "../../main/js/slider.min.js";
import { createFilterTab } from "../../main/js/tab.min.js";
import { sliderChangeContent } from "../../main/js/sliderChangeContent.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  createFilterTab();
  sectionNews();
  scrollChangeBgHeader();
  scrollFixedBookingForm();
  sliderChangeContent();
};
preloadImages("img").then(() => {
  init();
});

document.addEventListener("DOMContentLoaded", function () {
  hotelFilterSlider();
});

// event click element a
let isLinkClicked = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (
    link?.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    isLinkClicked = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (!isLinkClicked) window.scrollTo(0, 0);
  isLinkClicked = false;
});
