import type { Action } from 'svelte/action'

/**
 * Fade-and-rise an element into view the first time it scrolls into the viewport.
 * A failsafe timer reveals it anyway, so content is never stuck invisible.
 */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
  node.classList.add('reveal')
  if (delay) node.style.transitionDelay = `${delay}ms`

  const show = () => node.classList.add('is-in')
  let observer: IntersectionObserver | undefined
  if (typeof IntersectionObserver === 'function') {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show()
          observer?.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
  } else {
    show()
  }
  const failsafe = setTimeout(show, 1500)

  return {
    destroy() {
      observer?.disconnect()
      clearTimeout(failsafe)
    },
  }
}
