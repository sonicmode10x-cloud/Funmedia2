declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  const gscCode = import.meta.env.VITE_GSC_VERIFICATION?.trim();

  if (gscCode && !document.querySelector('meta[name="google-site-verification"]')) {
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = gscCode;
    document.head.appendChild(meta);
  }

  if (gaId && !document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push({ args });
    };
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }

  if (gtmId && !document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`)) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch {
    // Non-blocking analytics failure guard
  }
}
