import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { CategoryIcon } from '../components/CategoryIcon';
import { LOCATIONS } from '../data/locations';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/site';
import { buildBreadcrumbSchema, buildFAQSchema, buildLocalServiceSchema } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface LocationPageProps {
  cityKey: 'pokhara' | 'kathmandu';
}

export function LocationPage({ cityKey }: LocationPageProps) {
  const location = LOCATIONS[cityKey];

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: `Digital Marketing Agency ${location.city}`, path: `/${location.slug}` },
  ];

  const schemas = [
    buildLocalServiceSchema({
      city: location.city,
      address: location.officeAddress,
      region: location.region,
      description: location.seoDescription,
      path: `/${location.slug}`,
    }),
    buildBreadcrumbSchema(breadcrumbs),
    buildFAQSchema(location.faqs),
  ];

  return (
    <>
      <SEOHead
        title={location.seoTitle}
        description={location.seoDescription}
        keywords={[location.primaryKeyword, ...location.secondaryKeywords].join(', ')}
        canonicalPath={`/${location.slug}`}
        schema={schemas}
      />

      {/* Dark Hero Header */}
      <section className="bg-[#090909] pt-28 pb-16 text-white sm:pt-32 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />

          <div className="grid items-stretch gap-12 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                {location.eyebrow}
              </span>
              <h1 className="font-display mt-3 text-4xl leading-[1.03] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                {location.h1}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                {location.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={getWhatsAppUrl(
                    `Hello Funmedia ${location.city}, I would like to discuss a project.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('cta_click', { location: location.city });
                    trackEvent('whatsapp_click', { source: location.slug });
                  }}
                  className="group inline-flex items-center gap-1.5"
                >
                  <span className="rounded-full bg-[#FF4F17] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                    Discuss Your Project
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>

                <Link
                  to={`/${location.otherCitySlug}`}
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-xs font-bold text-white transition-colors hover:border-[#FF4F17] hover:text-[#FF4F17]"
                >
                  Explore {location.otherCityName} Office
                </Link>
              </div>
            </div>

            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#FF632B] via-[#FF4F17] to-[#D63708] p-8 text-white shadow-[0_24px_55px_rgba(255,79,23,0.28)]">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                    <MapPin className="h-5 w-5 stroke-[2.2]" aria-hidden="true" />
                  </span>
                  <div className="mt-6 font-mono text-xs font-bold tracking-widest text-white/80 uppercase">
                    VERIFIED OFFICE · {location.region}
                  </div>
                  <h2 className="font-display mt-2 text-2xl font-extrabold text-white">
                    {location.officeAddress}
                  </h2>
                </div>

                <div className="mt-8 space-y-3 border-t border-white/25 pt-5 text-sm">
                  <a
                    href={getWhatsAppUrl(
                      `Hello Funmedia ${location.city}, I would like to enquire about marketing services.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { source: `${location.slug}_card` })}
                    className="inline-flex items-center gap-2 font-semibold text-white hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp: {SITE_CONFIG.whatsappDisplay}</span>
                  </a>
                  <div>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      onClick={() => trackEvent('email_click', { source: location.slug })}
                      className="inline-flex items-center gap-2 font-semibold text-white hover:underline"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>{SITE_CONFIG.email}</span>
                    </a>
                  </div>
                  <p className="text-xs text-white/85">
                    Serving businesses in {location.city} and across Nepal.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* City Market Landscape & Needs */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
              LOCAL STRATEGY · {location.city.toUpperCase()}
            </span>
            <h2 className="font-display mt-2 text-3xl leading-[1.08] font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl">
              {location.landscapeTitle}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#52525B] sm:text-base">
              {location.landscapeParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="rounded-[26px] bg-[#F3F4F6] p-7 ring-1 ring-black/8 sm:p-9">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-[#090909] uppercase">
                Key Marketing Priorities in {location.city}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {location.industryNeeds.map((need) => (
                  <li key={need} className="flex items-start gap-3 text-sm text-[#090909]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <Check className="h-3 w-3 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Local Business Use Cases */}
      <section className="bg-[#090909] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
              {location.city.toUpperCase()} USE CASES
            </span>
            <h2 className="font-display mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">
              How Businesses in {location.city} Grow With Funmedia
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {location.useCases.map((useCase, idx) => (
              <Reveal key={useCase.sector} delay={idx * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/15 bg-[#121214] p-7">
                  <div>
                    <h3 className="font-display text-xl font-extrabold text-white">
                      {useCase.sector}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                      {useCase.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/15 pt-4">
                    <Link
                      to={`/${useCase.recommendedServiceSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4F17] hover:underline"
                    >
                      <span>Explore {useCase.recommendedServiceLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Available in City (Internal Linking Hub) */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  FULL-SERVICE CAPABILITIES
                </span>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#090909] uppercase">
                  Services Available in {location.city}
                </h2>
              </div>
              <Link to="/services" className="text-xs font-bold text-[#090909] hover:text-[#FF4F17]">
                Compare all services
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((svc, idx) => (
              <Reveal key={svc.slug} delay={Math.min((idx % 4) * 0.05, 0.15)}>
                <Link
                  to={`/${svc.slug}`}
                  className="group flex h-full flex-col justify-between rounded-[20px] bg-[#F3F4F6] p-5 ring-1 ring-black/8 transition-colors hover:bg-[#090909] hover:text-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <CategoryIcon name={svc.iconKey} className="h-4 w-4" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#090909] group-hover:text-[#FF4F17]" aria-hidden="true" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-base font-bold text-[#090909] group-hover:text-white">
                      {svc.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[#52525B] group-hover:text-white/70">
                      {svc.shortDescription}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#090909] uppercase">
            {location.city} Marketing Questions
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {location.faqs.map((faq, idx) => (
            <Reveal key={faq.question} delay={Math.min(idx * 0.06, 0.18)}>
              <div className="h-full rounded-[22px] bg-[#F3F4F6] p-6 ring-1 ring-black/8">
                <h3 className="font-display text-base font-bold text-[#090909]">
                  {faq.question}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner
        headline={`Grow Your Brand in ${location.city}`}
        subtext={`Connect with Funmedia's team at ${location.officeAddress} to discuss strategy, content production, or campaigns.`}
      />
    </>
  );
}
