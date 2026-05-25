export const PRERENDER_USER_AGENT_TOKEN = 'IconoPrerender';

export const isBrowser = () => typeof window !== 'undefined';

export const isPrerenderUserAgent = () =>
  isBrowser() && window.navigator.userAgent.includes(PRERENDER_USER_AGENT_TOKEN);

export const scheduleIdleTask = (
  task: () => void | Promise<void>,
  options: { delay?: number; timeout?: number } = {}
) => {
  if (!isBrowser()) {
    return () => {};
  }

  const { delay = 0, timeout = 3000 } = options;
  let cancelled = false;
  let timeoutId: number | null = null;
  let idleId: number | null = null;

  const runTask = () => {
    if (cancelled) {
      return;
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(
        () => {
          if (!cancelled) {
            void task();
          }
        },
        { timeout }
      );
      return;
    }

    void task();
  };

  timeoutId = window.setTimeout(runTask, delay);

  return () => {
    cancelled = true;

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    if (idleId !== null && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleId);
    }
  };
};
