import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Compass, Layers, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { PortfolioCard } from '../components/PortfolioCard';
import { CTABanner } from '../components/CTABanner';
import { CategoryIcon } from '../components/CategoryIcon';
import { getProjectBySlug, PROJECTS } from '../data/projects';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/site';
import { buildBreadcrumbSchema, getCanonicalUrl } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);
  const linkedServices = SERVICES.filter((s) => project.serviceSlugs.includes(s.slug));

  const canonicalPath = `/work/${project.slug}`;
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Our Work', path: '/work' },
    { label: project.clientName, path: canonicalPath },
  ];

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: getCanonicalUrl(canonicalPath),
    creator: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.websiteUrl,
    },
    about: project.clientName,
  };

  return (
    <>
      <SEOHead
        title={`${project.clientName} Case Study | Funmedia Nepal`}
        description={project.description}
        keywords={`${project.clientName}, ${project.industry}, Funmedia Portfolio Nepal`}
        canonicalPath={canonicalPath}
        schema={[creativeWorkSchema, buildBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white/70 uppercase transition-colors hover:text-[#FF4F17]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Our Work</span>
          </Link>

          <Reveal delay={0.06}>
            <div className="mt-8 rounded-[28px] border border-white/15 bg-[#121214] p-8 text-white sm:p-12">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                  <CategoryIcon name={project.iconKey} className="h-6 w-6 stroke-[2]" />
                </span>
                <span className="font-mono text-sm font-bold text-[#FF4F17]">
                  CASE {project.number}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/75">
                <span className="font-bold text-[#FF4F17] uppercase">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.industry}</span>
                <span aria-hidden="true">·</span>
                <span>{project.clientName}</span>
              </div>

              <h1 className="font-display mt-3 max-w-4xl text-3xl leading-[1.04] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl">
                {project.description}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="space-y-10 lg:col-span-7">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase">
                Project Background
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#52525B]">
                {project.challenge}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase">
                Client Objective
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#52525B]">
                {project.objective}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase">
                Creative Approach
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#52525B]">
                {project.creativeDirection}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase">
                Actual Deliverables
              </h2>
              <ul className="mt-4 space-y-3">
                {project.execution.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#090909] sm:text-base">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#FF4F17]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-[26px] bg-[#F3F4F6] p-8 text-[#090909] ring-1 ring-black/8">
              <h2 className="text-xs font-bold tracking-widest text-[#FF4F17] uppercase">
                Project Details
              </h2>

              <dl className="mt-6 divide-y divide-black/10 text-sm">
                <div className="py-4 first:pt-0">
                  <dt className="text-xs text-[#52525B]">Client</dt>
                  <dd className="mt-1 font-semibold text-[#090909]">{project.clientName}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs text-[#52525B]">Industry</dt>
                  <dd className="mt-1 font-semibold text-[#090909]">{project.industry}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs text-[#52525B]">Category</dt>
                  <dd className="mt-1 font-semibold text-[#090909]">{project.category}</dd>
                </div>
                <div className="py-4 last:pb-0">
                  <dt className="text-xs text-[#52525B]">Services Delivered</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {linkedServices.map((svc) => (
                      <Link
                        key={svc.slug}
                        to={`/${svc.slug}`}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#090909] ring-1 ring-black/10 transition-colors hover:bg-[#FF4F17] hover:text-white"
                      >
                        {svc.title}
                      </Link>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <a
                  href={getWhatsAppUrl(
                    `Hello Funmedia, I would like to discuss a project similar to ${project.clientName}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'project_detail', project: project.slug })}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF4F17] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#e54310]"
                >
                  <span>Discuss a Similar Project</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[22px] bg-[#FF4F17] p-6 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#090909] text-white">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-white">
                Strategic Positioning
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/90">
                Anchored in clear category differentiation and audience insight for {project.industry}.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="h-full rounded-[22px] bg-[#090909] p-6 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-white">
                Creative System
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                Modular asset architecture spanning digital placements, print touchpoints, and motion cuts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="h-full rounded-[22px] bg-[#F3F4F6] p-6 ring-1 ring-black/8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                <Layers className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-[#090909]">
                Multi-Channel Rollout
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#52525B]">
                Coordinated distribution across social media, creators, paid ads, and live touchpoints.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#090909] uppercase">
              More Case Studies
            </h2>
            <Link to="/work" className="text-xs font-bold text-[#090909] hover:text-[#FF4F17]">
              View all
            </Link>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {otherProjects.map((other, idx) => (
            <Reveal key={other.slug} delay={Math.min(idx * 0.06, 0.18)}>
              <PortfolioCard project={other} horizontal />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
