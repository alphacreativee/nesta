export function loading() {
  if (!document.querySelector("#loading")) return;
  const tl = gsap.timeline();
  tl.to("#loading .loading-video", {
    "--mask-scale": 3.5,
    "--mask-opacity": 0,
    duration: 1.5,
    ease: "power2.inOut",
  });
  tl.add(() => {}, "+=0.5");
  tl.fromTo(
    "#loading",
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 1,
      ease: "power2.inOut",
    },
  );

  return tl;
}
