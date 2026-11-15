import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Reveal } from '../components/Reveal';
import { PortfolioCard } from '../components/PortfolioCard';
import { CTABanner } from '../components/CTABanner';
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory } from '../data/projects';
import { GALLERY_IMAGES } from '../data/gallery';
import { buildBreadcrumbSchema } from '../utils/seo';

export function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Our Work', path: '/work' },
  ];

  return (
    <>
      <SEOHead
        title="Client Portfolio & Case Studies in Nepal | Funmedia"
        description="Explore Funmedia's portfolio featuring Club Nova, Club XO, TVS Motors, Bagaicha Resort and Spa, 31 Park Hotel, Baneshwor Hills, Right To Protein Run, and more."
        keywords="Marketing Portfolio Nepal, Video Production Nepal, Event Marketing Nepal, Brand Campaigns Kathmandu, Pokhara Agency Work"
        canonicalPath="/work"
        schema={buildBreadcrumbSchema(breadcrumbs)}
      />

      <section className="bg-[#090909] pt-28 pb-14 text-white sm:pt-32 lg:pt-36 lg:pb-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} variant="dark" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
            PORTFOLIO &amp; CASE STUDIES
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
            Good Work Speaks Louder.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Verified client campaigns across nightlife, hospitality, automotive, agribusiness, and public events across Nepal.
          </p>

          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-8 flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`min-h-[40px] rounded-full px-5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#FF4F17] text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              All Work
            </button>
            {PROJECT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-full px-5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#FF4F17] text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.05, 0.25)}>
              <PortfolioCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-black/8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl">
            Gallery
          </h2>
        </Reveal>

        <div className="mt-8 columns-2 gap-3.5 sm:gap-5">
          {GALLERY_IMAGES.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={(index % 2) * 0.06}
              className="mb-3.5 break-inside-avoid sm:mb-5"
            >
              <div className="overflow-hidden rounded-[20px] bg-[#F3F4F6] ring-1 ring-black/6">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="pointer-events-none block h-auto w-full select-none object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
