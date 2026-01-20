export function loading() {
  const tl = gsap.timeline();
  tl.fromTo("#loading", { autoAlpha: 1 }, { autoAlpha: 0, duration: 5 });
  return tl;
}
