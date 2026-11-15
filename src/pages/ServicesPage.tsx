import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { CategoryIcon } from '../components/CategoryIcon';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';

export function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Services | Funmedia — Full-Service Marketing Agency Nepal"
        description="Explore Funmedia's 8 core capabilities: brand strategy, social media management, content creation, event marketing, influencer campaigns, design, and paid ads."
        keywords="Digital Marketing Agency Nepal, Social Media Marketing Nepal, Video Production Nepal, Event Marketing Nepal, Branding Agency Nepal, Influencer Marketing Nepal, Digital Advertising Nepal"
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            OUR CAPABILITIES
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
            Everything Your Brand Needs. Under One Roof.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            From foundational brand positioning to commercial shoots, paid media acquisition, and live event production, each Funmedia service plugs into one cohesive growth engine.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {SERVICES.map((service, index) => {
          const relatedProjects = PROJECTS.filter((p) =>
            service.relatedProjectSlugs.includes(p.slug),
          );
          const reverse = index % 2 === 1;

          return (
            <Reveal key={service.slug}>
              <article className="grid items-stretch gap-8 rounded-[28px] bg-[#F3F4F6] p-5 ring-1 ring-black/8 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
                <div
                  className={`flex flex-col justify-between rounded-[22px] bg-[#090909] p-8 text-white lg:col-span-5 ${
                    reverse ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <CategoryIcon name={service.iconKey} className="h-6 w-6 stroke-[2]" />
                    </span>
                    <span className="font-mono tabular-nums text-sm font-bold text-[#FF4F17]">
                      {service.number}
                    </span>
                  </div>

                  <div className="mt-10 space-y-4 border-t border-white/15 pt-6">
                    <div className="text-xs font-bold tracking-wider text-[#FF4F17] uppercase">
                      Strategic Approach
                    </div>
                    <ul className="space-y-2.5 text-xs leading-relaxed text-white/80">
                      {service.approachPoints.map((pt) => (
                        <li key={pt}>· {pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`flex flex-col justify-between lg:col-span-7 ${
                    reverse ? 'lg:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4F17] font-mono text-xs font-bold text-white">
                        {service.number}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-[#52525B] uppercase">
                        Funmedia Capability
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
                              {project.title}
                            </Link>
                            {pIdx < relatedProjects.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-1.5"
                    >
                      <span className="rounded-full bg-[#FF4F17] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                        Explore Service
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>

                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#090909] ring-1 ring-black/15 transition-colors hover:bg-[#090909] hover:text-white"
                    >
                      Enquire Now
                    </Link>
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
