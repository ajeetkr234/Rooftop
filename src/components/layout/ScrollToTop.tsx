import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable native browser scroll restoration so refresh starts at the top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Detect browser page refresh / reload from anywhere
    try {
      const navEntries = performance.getEntriesByType('navigation');
      const isReload =
        (navEntries && navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === 'reload') ||
        ((performance as any).navigation && (performance as any).navigation.type === 1);

      if (isReload) {
        if (pathname !== '/' || hash) {
          navigate('/', { replace: true });
        }
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        });
      }
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname]);

  return null;
}

