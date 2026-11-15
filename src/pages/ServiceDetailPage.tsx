import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Mail, MapPin, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { PortfolioCard } from '../components/PortfolioCard';
import { CTABanner } from '../components/CTABanner';
import { CategoryIcon } from '../components/CategoryIcon';
import { getServiceBySlug, SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { SITE_CONFIG } from '../data/site';
import { buildBreadcrumbSchema, buildFAQSchema, buildServiceSchema } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { NotFoundPage } from './NotFoundPage';

interface ServiceDetailPageProps {
  forcedSlug?: string;
}

export function ServiceDetailPage({ forcedSlug }: ServiceDetailPageProps) {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const resolvedSlug = forcedSlug ?? paramSlug;
  const service = resolvedSlug ? getServiceBySlug(resolvedSlug) : undefined;

  if (!service) {
    return <NotFoundPage />;
  }

  const relatedProjects = PROJECTS.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug),
  );
  const relatedServices = SERVICES.filter((s) =>
    service.relatedServiceSlugs.includes(s.slug),
  );

  const canonicalPath = `/${service.slug}`;
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: service.title, path: canonicalPath },
  ];

  const schemas = [
    buildServiceSchema({
      name: service.title,
      description: service.seoDescription,
      path: canonicalPath,
    }),
    buildBreadcrumbSchema(breadcrumbs),
    buildFAQSchema(service.faqs),
  ];

  return (
    <>
      <SEOHead
        title={service.seoTitle}
        description={service.seoDescription}
        keywords={[service.primaryKeyword, ...service.secondaryKeywords].join(', ')}
        canonicalPath={canonicalPath}
        schema={schemas}
      />

      {/* Dark Hero Header */}
      <section className="bg-[#090909] pt-28 pb-16 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white/70 uppercase transition-colors hover:text-[#FF4F17]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>All Services</span>
          </Link>

          <div className="mt-8 grid items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4F17] font-mono text-xs font-bold text-white">
                  {service.number}
                </span>
                <span className="text-xs font-bold tracking-widest text-[#FF4F17] uppercase">
                  {service.primaryKeyword}
                </span>
              </div>

              <h1 className="font-display mt-4 text-3xl leading-[1.05] font-extrabold tracking-tight text-white uppercase sm:text-5xl">
                {service.h1}
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                {service.overview}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={getWhatsAppUrl(
                    `Hello Funmedia, I would like to request a proposal for ${service.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('service_cta_click', { service: service.slug });
                    trackEvent('whatsapp_click', { source: 'service_detail_hero', service: service.slug });
                  }}
                  className="group inline-flex items-center gap-1.5"
                >
                  <span className="rounded-full bg-[#FF4F17] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                    Request a Proposal
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>

                <Link
                  to="/digital-marketing-agency-pokhara"
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-xs font-bold text-white transition-colors hover:border-[#FF4F17] hover:text-[#FF4F17]"
                >
                  Pokhara Team
                </Link>
                <Link
                  to="/digital-marketing-agency-kathmandu"
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-3.5 text-xs font-bold text-white transition-colors hover:border-[#FF4F17] hover:text-[#FF4F17]"
                >
                  Kathmandu Team
                </Link>
              </div>
            </div>

            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#FF632B] via-[#FF4F17] to-[#D63708] p-8 text-white shadow-[0_24px_55px_rgba(255,79,23,0.28)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                    <CategoryIcon name={service.iconKey} className="h-6 w-6 stroke-[2]" />
                  </span>
                  <span className="font-mono text-sm font-bold text-white/85">
                    {service.number}
                  </span>
                </div>

                <div className="mt-8 border-t border-white/25 pt-6">
                  <div className="text-xs font-bold tracking-wider text-white/80 uppercase">
                    Service Overview
                  </div>
                  <p className="mt-2 font-display text-xl font-extrabold text-white">
                    {service.shortDescription}
                  </p>
                  <div className="mt-5 space-y-1.5 border-t border-white/20 pt-4 text-xs text-white/90">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <a
                        href={getWhatsAppUrl(
                          `Hello Funmedia, I would like to enquire about ${service.title}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click', { source: 'service_detail_card', service: service.slug })}
                        className="font-semibold hover:underline"
                      >
                        WhatsApp: {SITE_CONFIG.whatsappDisplay}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <a href={`mailto:${SITE_CONFIG.email}`} className="hover:underline">
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>Kathmandu &amp; Pokhara, Nepal</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deliverables & Execution */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase sm:text-3xl">
              What {service.title} Includes
            </h2>
            <p className="mt-2 text-sm text-[#52525B]">
              Deliverables tailored to your business goals in Pokhara, Kathmandu, and across Nepal.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[18px] bg-[#F3F4F6] p-5 text-sm font-medium text-[#090909] ring-1 ring-black/8"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4F17]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="h-full rounded-[24px] bg-[#090909] p-8 text-white">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-white uppercase">
                Why Work With Funmedia
              </h2>
              <ul className="mt-6 space-y-5">
                {service.approachPoints.map((point, idx) => (
                  <li key={point} className="flex items-start gap-4">
                    <span className="font-mono tabular-nums text-xs font-bold text-[#FF4F17]">
                      0{idx + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-white/75">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Business Benefits & Ideal Use Cases */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[24px] bg-[#F3F4F6] p-7 ring-1 ring-black/8">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-[#090909] uppercase">
                Business Benefits
              </h2>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#090909]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4F17]" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[24px] bg-[#F3F4F6] p-7 ring-1 ring-black/8">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-[#090909] uppercase">
                Common Use Cases in Nepal
              </h2>
              <ul className="mt-4 space-y-3">
                {service.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-2.5 text-sm text-[#090909]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4F17]" aria-hidden="true" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Verified Work */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  VERIFIED CLIENT WORK
                </span>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#090909] uppercase">
                  Related Portfolio Examples
                </h2>
              </div>
              <Link
                to="/work"
                className="text-xs font-bold text-[#090909] hover:text-[#FF4F17]"
              >
                View all portfolio
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {relatedProjects.map((project, idx) => (
              <Reveal key={project.slug} delay={Math.min(idx * 0.06, 0.24)}>
                <PortfolioCard project={project} horizontal />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#090909] uppercase">
            {service.title} FAQs
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {service.faqs.map((faq, idx) => (
            <Reveal key={faq.question} delay={Math.min(idx * 0.05, 0.2)}>
              <div className="h-full rounded-[22px] bg-[#F3F4F6] p-6 ring-1 ring-black/8">
                <h3 className="font-display text-base font-bold text-[#090909]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B]">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related Services Internal Linking */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-xl font-extrabold tracking-tight text-[#090909] uppercase">
            Complementary Services
          </h2>
        </Reveal>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((other, idx) => (
            <Reveal key={other.slug} delay={Math.min(idx * 0.05, 0.15)}>
              <Link
                to={`/${other.slug}`}
                className="group flex h-full items-center justify-between rounded-[20px] bg-[#F3F4F6] p-5 ring-1 ring-black/8 transition-colors hover:bg-[#FF4F17] hover:text-white"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF4F17] group-hover:text-white/85">
                    {other.number}
                  </span>
                  <h3 className="font-display mt-1 text-base font-bold text-[#090909] group-hover:text-white">
                    {other.title}
                  </h3>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#090909] group-hover:text-white" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner
        headline={`Discuss Your ${service.title} Project`}
        subtext={`Share your goals with our Kathmandu or Pokhara team to request a tailored ${service.title.toLowerCase()} proposal.`}
      />
    </>
  );
}
