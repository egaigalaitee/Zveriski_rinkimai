document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const introTargets = [
    [".topbar__link", "anim-intro-fade"],
    [".hero__logo", "anim-intro-rise"],
    [".hero__animal-frame", "anim-intro-rise"],
  ];

  introTargets.forEach(([selector, animationClass]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add(animationClass);
      element.classList.add(`anim-delay-${Math.min(index + 1, 4)}`);
    });
  });

  // Scroll reveal targets are inner content wrappers so backgrounds/layout stay untouched.
  const revealTargets = [
    ...document.querySelectorAll(
      ".section > .container, .guide-hero__content--new, .guide-process-panel, .guide-bottom-cards, .glossary-top-grid, .glossary-title, .glossary-list, .timer-stage"
    ),
  ];

  const staggerTargets = [
    ...document.querySelectorAll(".feature-card"),
    ...document.querySelectorAll(".glossary-top-card"),
    ...document.querySelectorAll(".guide-bottom-card"),
  ];

  revealTargets.forEach((element) => {
    element.classList.add("reveal-pending");
  });

  staggerTargets.forEach((element, index) => {
    element.classList.add("reveal-pending");
    element.classList.add(`reveal-stagger-${(index % 4) + 1}`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  [...new Set([...revealTargets, ...staggerTargets])].forEach((element) => {
    observer.observe(element);
  });
});
