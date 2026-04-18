import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * HashScrollHandler
 * 
 * Handles scrolling to anchors even after navigating between different pages.
 * Especially useful when using react-router-dom's <Link> component to target 
 * sections on the home page from a sub-page.
 */
export default function HashScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure the DOM is ready and any page transition animations have started
      const elementId = hash.replace('#', '');
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    } else {
      // If navigating to a page without a hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
