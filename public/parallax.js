/**
 * ParallaxBackground
 * Lightweight parallax effect for background layers
 *
 * Usage:
 *   const parallax = new ParallaxBackground();
 *   parallax.init('.parallax-container');
 *   window.addEventListener('scroll', () => parallax.update());
 */

class ParallaxBackground {
  constructor() {
    this.containers = [];
    this.raf = null;
  }

  init(selector) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    this.containers = els.map(container => {
      const layers = container.querySelectorAll('.parallax-layer');
      return { el: container, layers, rect: container.getBoundingClientRect() };
    });

    this.update();
    return this;
  }

  update() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      this.containers.forEach(({ el, layers, rect }) => {
        const containerTop = el.getBoundingClientRect().top;
        const scrollPercent = containerTop / window.innerHeight;
        const offset = scrollPercent * window.innerHeight;

        layers.forEach(layer => {
          const speed = parseFloat(layer.dataset.speed) || 0.5;
          const yPos = -(offset * speed);
          layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });
    });
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.containers = [];
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParallaxBackground;
}
