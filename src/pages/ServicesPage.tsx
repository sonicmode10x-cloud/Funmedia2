import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { buildBreadcrumbSchema } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';

export function ServicesPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
  ];

  return (
    <>
      <SEOHead
        title="Digital Marketing & Creative Services in Nepal | Funmedia"
        description="Explore Funmedia's 12 capabilities: digital marketing, social media, content creation, video production, influencer marketing, Meta & Google Ads, websites, and branding."
        keywords="Digital Marketing Services Nepal, Social Media Marketing Nepal, Video Production Nepal, Website Development Company Nepal, Branding Agency Nepal, Influencer Marketing Nepal"
        canonicalPath="/services"
        schema={buildBreadcrumbSchema(breadcrumbs)}
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            OUR CAPABILITIES · NEPAL
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
            Everything Your Brand Needs. Under One Roof.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            From foundational digital strategy and website development to commercial video shoots, Meta &amp; Google Ads, and event production, each Funmedia service plugs into one cohesive growth engine across Pokhara, Kathmandu, and Nepal.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {SERVICES.map((service) => {
          const relatedProjects = PROJECTS.filter((p) =>
            service.relatedProjectSlugs.includes(p.slug),
          );

          return (
            <Reveal key={service.slug}>
              <article className="rounded-[28px] bg-[#F3F4F6] p-5 ring-1 ring-black/8 sm:p-8 lg:p-10">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4F17] font-mono text-xs font-bold text-white">
                        {service.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-[#52525B] uppercase">
                        {service.primaryKeyword}
                      </span>
                    </div>

                    <h2 className="font-display mt-4 text-2xl font-extrabold tracking-tight text-[#090909] sm:text-3xl lg:text-4xl">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[#52525B] sm:text-base">
                      {service.overview}
                    </p>

                    <div className="mt-6">
                      <h3 className="text-xs font-bold tracking-wider text-[#090909] uppercase">
                        Key Deliverables
                      </h3>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-[#090909]"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4F17]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {relatedProjects.length > 0 && (
                      <div className="mt-6 border-t border-black/10 pt-4 text-xs text-[#52525B]">
                        <span className="font-bold text-[#090909] uppercase">
                          Related Work:{' '}
                        </span>
                        {relatedProjects.map((project, pIdx) => (
                          <span key={project.slug}>
                            <Link
                              to={`/work/${project.slug}`}
                              className="font-semibold text-[#090909] underline decoration-[#FF4F17]/50 underline-offset-4 hover:text-[#FF4F17]"
                            >
                              {project.clientName}
                            </Link>
                            {pIdx < relatedProjects.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/${service.slug}`}
                      className="group inline-flex items-center gap-1.5"
                    >
                      <span className="rounded-full bg-[#FF4F17] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                        Explore Service
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>

                    <a
                      href={getWhatsAppUrl(
                        `Hello Funmedia, I would like to request a proposal for ${service.title}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('whatsapp_click', { source: 'services_list', service: service.slug })}
                      className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#090909] ring-1 ring-black/15 transition-colors hover:bg-[#090909] hover:text-white"
                    >
                      Request Proposal
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      <CTABanner />
    </>
  );
}
