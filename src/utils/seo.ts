import { SITE_CONFIG } from '../data/site';

export interface BreadcrumbEntry {
  label: string;
  path?: string;
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export function getCanonicalUrl(path: string): string {
  const cleanPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return `${SITE_CONFIG.websiteUrl}${cleanPath === '/' ? '/' : cleanPath}`;
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.websiteUrl}/#organization`,
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.websiteUrl,
    slogan: SITE_CONFIG.tagline,
    description:
      'Funmedia is a full-service creative and digital marketing agency in Nepal offering digital marketing, social media management, content creation, video production, influencer marketing, advertising, website development, and branding.',
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.telephone,
    sameAs: SITE_CONFIG.socialLinks.map((s) => s.url),
    address: SITE_CONFIG.offices.map((office) => ({
      '@type': 'PostalAddress',
      streetAddress: office.address.split(',')[0].trim(),
      addressLocality: office.city,
      addressRegion: office.region,
      addressCountry: office.country,
    })),
  };
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.websiteUrl}/#website`,
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.websiteUrl,
    publisher: {
      '@id': `${SITE_CONFIG.websiteUrl}/#organization`,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.path ? { item: getCanonicalUrl(item.path) } : {}),
    })),
  };
}

export function buildFAQSchema(faqs: FAQEntry[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: getCanonicalUrl(params.path),
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${SITE_CONFIG.websiteUrl}/#organization`,
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.websiteUrl,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.telephone,
    },
    areaServed: (params.areaServed ?? ['Nepal', 'Pokhara', 'Kathmandu']).map((area) => ({
      '@type': 'Place',
      name: area,
    })),
  };
}

export function buildLocalServiceSchema(params: {
  city: string;
  address: string;
  region: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${SITE_CONFIG.brandName} — ${params.city}`,
    url: getCanonicalUrl(params.path),
    description: params.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.address,
      addressLocality: params.city,
      addressRegion: params.region,
      addressCountry: 'NP',
    },
    areaServed: [
      { '@type': 'City', name: params.city },
      { '@type': 'Country', name: 'Nepal' },
    ],
    parentOrganization: {
      '@id': `${SITE_CONFIG.websiteUrl}/#organization`,
    },
  };
}
