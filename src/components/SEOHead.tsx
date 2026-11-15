import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl } from '../utils/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalPath,
  noindex = false,
  type = 'website',
  schema,
}: SEOHeadProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (
      selector: string,
      attribute: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const canonicalUrl = getCanonicalUrl(canonicalPath ?? pathname);

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const existingSchemas = document.querySelectorAll('script[data-seo-schema="true"]');
    existingSchemas.forEach((node) => node.remove());

    if (schema) {
      const schemaList = Array.isArray(schema) ? schema : [schema];
      schemaList.forEach((entry) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-schema', 'true');
        script.textContent = JSON.stringify(entry);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, canonicalPath, noindex, type, schema, pathname]);

  return null;
}
