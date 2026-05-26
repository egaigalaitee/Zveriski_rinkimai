document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Animation targets are selected by purpose so the existing HTML structure can stay unchanged.
  const revealTargets = [
    ...document.querySelectorAll(
      ".section, .guide-section, .glossary-top-grid, .glossary-title, .glossary-list, .timer-stage, .guide-bottom-cards, .guide-tools, .guide-advice-card"
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
