import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { CategoryIcon } from '../components/CategoryIcon';
import { INDUSTRIES } from '../data/industries';
import { buildBreadcrumbSchema } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';

export function IndustriesPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Industries', path: '/industries' },
  ];

  return (
    <>
      <SEOHead
        title="Industries We Serve in Nepal | Funmedia"
        description="Funmedia partners with clubs and nightlife venues, restaurants, hotels, event organizers, travel brands, and lifestyle companies across Pokhara, Kathmandu, and Nepal."
        keywords="Hospitality Marketing Nepal, Nightlife Marketing Kathmandu, Restaurant Marketing Pokhara, Event Promotion Nepal, Travel Marketing Agency Nepal"
        canonicalPath="/industries"
        schema={buildBreadcrumbSchema(breadcrumbs)}
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            INDUSTRY EXPERTISE
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
            Different Industries. One Creative Approach.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Every sector has its own rhythm, buying triggers, and cultural nuances. We tailor strategy, production, and media distribution to fit how your customers discover and experience your brand.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.slug} delay={Math.min(index * 0.06, 0.24)}>
              <article className="group flex h-full flex-col justify-between rounded-[26px] bg-[#F3F4F6] p-6 ring-1 ring-black/8 transition-all hover:bg-white hover:shadow-lg sm:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-200 group-hover:scale-105">
                      <CategoryIcon name={industry.iconKey} className="h-5 w-5 stroke-[2]" />
                    </span>
                    <span className="font-mono tabular-nums text-xs font-bold text-[#FF4F17]">
                      {industry.number}
                    </span>
                  </div>

                  <h2 className="font-display mt-6 text-2xl font-extrabold tracking-tight text-[#090909] sm:text-3xl">
                    {industry.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                    {industry.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-black/10 pt-5">
                    {industry.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-2.5 text-sm font-medium text-[#090909]"
                      >
                        <Check
                          className="h-4 w-4 shrink-0 text-[#FF4F17]"
                          aria-hidden="true"
                        />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-black/10 pt-5">
                  <a
                    href={getWhatsAppUrl(
                      `Hello Funmedia, I would like to discuss a campaign for ${industry.title}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { source: 'industries', industry: industry.slug })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#090909] hover:text-[#FF4F17]"
                  >
                    <span>Discuss a campaign</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
