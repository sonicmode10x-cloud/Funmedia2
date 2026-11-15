import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/Reveal';
import { PortfolioCard } from '../components/PortfolioCard';
import { CTABanner } from '../components/CTABanner';
import { CategoryIcon } from '../components/CategoryIcon';
import { getServiceBySlug, SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <NotFoundPage />;
  }

  const relatedProjects = PROJECTS.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug),
  );
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <SEOHead title={service.seoTitle} description={service.seoDescription} />

      <section className="bg-[#090909] pt-28 pb-16 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  Funmedia Service
                </span>
              </div>

              <h1 className="font-display mt-4 text-4xl leading-[1.04] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                {service.overview}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="group inline-flex items-center gap-1.5"
                >
                  <span className="rounded-full bg-[#FF4F17] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                    Enquire About This Service
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#FF632B] via-[#FF4F17] to-[#D63708] p-8 text-white shadow-[0_24px_55px_rgba(255,79,23,0.28)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                    <CategoryIcon name={service.iconKey} className="h-6 w-6 stroke-[2]" />
                  </span>
                  <span className="font-mono text-sm font-bold text-white/85">
                    {service.number}
                  </span>
                </div>

                <div className="mt-10 border-t border-white/25 pt-6">
                  <div className="text-xs font-bold tracking-wider text-white/80 uppercase">
                    Core Scope
                  </div>
                  <p className="mt-2 font-display text-xl font-extrabold text-white">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase sm:text-3xl">
              Key Deliverables
            </h2>
            <p className="mt-2 text-sm text-[#52525B]">
              Tailored to your brand objectives and campaign scope.
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
                How Funmedia Executes
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

      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  IN PRACTICE
                </span>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#090909] uppercase">
                  Related Case Studies
                </h2>
              </div>
              <Link
                to="/work"
                className="text-xs font-bold text-[#090909] hover:text-[#FF4F17]"
              >
                All work
              </Link>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {relatedProjects.map((project) => (
              <PortfolioCard key={project.slug} project={project} horizontal />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-extrabold tracking-tight text-[#090909] uppercase">
          Explore Other Capabilities
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((other) => (
            <Link
              key={other.slug}
              to={`/services/${other.slug}`}
              className="group flex items-center justify-between rounded-[20px] bg-[#F3F4F6] p-5 ring-1 ring-black/8 transition-colors hover:bg-[#FF4F17] hover:text-white"
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
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
