import { Link } from 'react-router-dom';
import { ArrowUpRight, Asterisk, Compass, Layers, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/Reveal';
import { CTABanner } from '../components/CTABanner';
import { INDUSTRIES } from '../data/industries';
import { WHY_FUNMEDIA_STRENGTHS } from '../data/site';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us | Funmedia — Creative Marketing Agency Nepal"
        description="Learn about Funmedia, a full-service marketing agency in Nepal uniting brand strategy, content creation, digital advertising, and live event execution."
        keywords="Creative Agency Nepal, Marketing Agency Kathmandu, About Funmedia Nepal"
      />

      {/* Dark Architectural Hero Header matching Finguard Hero Band */}
      <section className="bg-[#090909] pt-28 pb-16 text-white sm:pt-32 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col justify-center lg:col-span-7">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                ABOUT FUNMEDIA
              </span>
              <h1 className="font-display mt-3 text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
                Built for Brands That Refuse to Blend In
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                Funmedia is a full-service creative and digital marketing agency based in Nepal. We partner with ambitious businesses across hospitality, nightlife, entertainment, travel, and consumer lifestyle to turn attention into lasting brand equity.
              </p>
              <div className="mt-8">
                <Link to="/contact" className="group inline-flex items-center gap-1.5">
                  <span className="rounded-full bg-[#FF4F17] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                    Start a Project
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#FF632B] via-[#FF4F17] to-[#D63708] p-8 text-white shadow-[0_24px_55px_rgba(255,79,23,0.28)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                  <Asterisk className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
                </span>
                <div className="mt-10 space-y-4">
                  <div className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase">
                    YOUR BRAND. OUR PLAYGROUND.
                  </div>
                  <p className="font-display text-2xl leading-snug font-extrabold text-white">
                    Strategy, Content, Campaigns, and Events united under one creative team in Nepal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Philosophy Bento (Orange / Black / Light Gray) */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[24px] bg-[#F3F4F6] p-8 ring-1 ring-black/8">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display mt-5 text-2xl font-extrabold tracking-tight text-[#090909]">
                  Our Mission
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                  To help businesses in Nepal build stronger brands, connect authentically with modern audiences, and achieve measurable commercial growth through strategic creativity and disciplined production.
                </p>
              </div>
              <span className="font-mono mt-6 text-xs font-bold text-[#FF4F17]">01 · MISSION</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-[24px] bg-[#090909] p-8 text-white">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display mt-5 text-2xl font-extrabold tracking-tight text-white">
                  Our Vision
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  To set the benchmark for contemporary marketing and creative production in Nepal—where local and regional brands command international creative standards across screens, stages, and spaces.
                </p>
              </div>
              <span className="font-mono mt-6 text-xs font-bold text-[#FF4F17]">02 · VISION</span>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex h-full flex-col justify-between rounded-[24px] bg-[#FF4F17] p-8 text-white">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#090909] text-white">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="font-display mt-5 text-2xl font-extrabold tracking-tight text-white">
                  Our Philosophy
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  Marketing works best when strategy, craft, and culture move together. We reject generic templates in favor of bold creative work engineered for real audiences and real business momentum.
                </p>
              </div>
              <span className="font-mono mt-6 text-xs font-bold text-white/85">03 · PHILOSOPHY</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Makes Funmedia Different */}
      <section className="bg-[#090909] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-5">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
              OUR CREATIVE APPROACH
            </span>
            <h2 className="font-display mt-3 text-3xl leading-[1.08] font-extrabold tracking-tight text-white uppercase sm:text-4xl">
              What Makes Funmedia Different
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Most businesses are forced to juggle separate vendors for strategy, shoots, graphic design, ads, and events. At Funmedia, every discipline operates under one unified creative direction.
            </p>
          </Reveal>

          <div className="divide-y divide-white/12 lg:col-span-7">
            {WHY_FUNMEDIA_STRENGTHS.map((strength, idx) => (
              <Reveal key={strength.number} delay={idx * 0.05}>
                <div className="flex flex-col gap-2 py-6 first:pt-0 sm:flex-row sm:gap-8">
                  <span className="font-mono tabular-nums text-sm font-bold text-[#FF4F17]">
                    {strength.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {strength.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Understand */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                MARKET FLUENCY
              </span>
              <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl">
                Industries We Understand
              </h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#090909] hover:text-[#FF4F17]"
            >
              <span>Explore all industries</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, idx) => (
            <Reveal key={industry.slug} delay={idx * 0.05}>
              <div className="rounded-[22px] bg-[#F3F4F6] p-6 ring-1 ring-black/8">
                <span className="font-mono text-xs font-bold text-[#FF4F17]">
                  {industry.number}
                </span>
                <h3 className="font-display mt-2 text-xl font-bold text-[#090909]">
                  {industry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                  {industry.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
