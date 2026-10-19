import { useLayoutEffect } from 'react';

let activeLocks = 0;
let restorePage: (() => void) | undefined;

/** Keep overlapping overlays from unlocking each other's page, including on iOS. */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    if (activeLocks === 0) {
      const body = document.body;
      const root = document.documentElement;
      const x = window.scrollX;
      const y = window.scrollY;
      const properties = ['position', 'top', 'left', 'right', 'width', 'overflow', 'padding-right'] as const;
      const saved = properties.map(property => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)] as const);
      const rootOverflow = root.style.overflow;
      const rootScrollBehavior = root.style.scrollBehavior;
      const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
      const paddingRight = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;

      root.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${y}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      if (scrollbarWidth) body.style.paddingRight = `${paddingRight + scrollbarWidth}px`;

      restorePage = () => {
        saved.forEach(([property, value, priority]) => {
          if (value) body.style.setProperty(property, value, priority);
          else body.style.removeProperty(property);
        });
        root.style.overflow = rootOverflow;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(x, y);
        root.style.scrollBehavior = rootScrollBehavior;
      };
    }
    activeLocks += 1;
    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) {
        restorePage?.();
        restorePage = undefined;
      }
    };
  }, [locked]);
}
