/**
 * Text Reveal Animations
 * Word by word and letter by letter reveal effects
 */

/**
 * Wrap each word in a span and trigger reveal animation
 * @param {string} selector - CSS selector for the text element
 * @param {number} delay - Base delay in ms between words
 * @param {string} animationType - 'slide' | 'fadeUp' | 'letter'
 */
function wordReveal(selector, delay = 80, animationType = 'slide') {
  const el = document.querySelector(selector);
  if (!el) return;

  if (animationType === 'letter') {
    _wrapLetters(el);
  } else {
    _wrapWords(el, animationType);
  }

  const words = el.querySelectorAll('.word');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          words.forEach((word, i) => {
            setTimeout(() => word.classList.add('revealed'), i * delay);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(el);
  return { destroy: () => observer.disconnect() };
}

function _wrapWords(el, animationType) {
  const html = el.innerHTML;
  el.innerHTML = html
    .split(' ')
    .map(word => `<span class="word-wrapper"><span class="word">${word}</span></span>`)
    .join(' ');
  el.classList.add('text-reveal');
  if (animationType === 'fadeUp') el.classList.add('word-fade-up');
}

function _wrapLetters(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split('')
    .map(char =>
      char === ' '
        ? ' '
        : `<span class="letter-wrapper"><span class="letter">${char}</span></span>`
    )
    .join('');
  el.classList.add('text-reveal');
}

export { wordReveal };
