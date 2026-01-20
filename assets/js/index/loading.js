export function loading() {
  const tl = gsap.timeline();

  // Bước 1: Scale và fade out mask qua CSS vars
  tl.to("#loading .loading-video", {
    "--mask-scale": 3.5,
    "--mask-opacity": 0,
    duration: 1.5,
    ease: "power2.inOut",
  });

  // Bước 2: Delay nhỏ
  tl.add(() => {}, "+=0.5");

  // Bước 3: Clip path loading screen
  tl.fromTo(
    "#loading",
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 2,
      ease: "power2.inOut",
    },
  );

  return tl;
}
