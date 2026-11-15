import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  Compass,
  Layers,
  Megaphone,
  Palette,
  Sparkles,
  Users,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/Reveal';
import { CategoryIcon } from '../components/CategoryIcon';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { PROCESS_STEPS, WHY_FUNMEDIA_STRENGTHS } from '../data/site';

const HERO_STEPS = [
  { label: 'Discover &\nStrategize', path: '/services/brand-strategy-and-marketing', icon: 'up' as const },
  { label: 'Create &\nProduce', path: '/services/content-creation', icon: 'right' as const },
  { label: 'Execute &\nOptimize', path: '/services/integrated-campaign-management', icon: 'down' as const },
];

const HERO_ICON_BADGES = [
  { label: 'Strategy', Icon: Compass },
  { label: 'Production', Icon: Clapperboard },
  { label: 'Creators', Icon: Users },
  { label: 'Paid Media', Icon: Megaphone },
];

const ORANGE_WORK_TILES = [
  {
    title: 'Clubs & Nightlife',
    subtitle: 'Residency & Crowd Reels',
    iconKey: 'disc' as const,
    to: '/work/club-noir-residency',
  },
  {
    title: 'Restaurants & F&B',
    subtitle: 'Culinary & Menu Craft',
    iconKey: 'utensils' as const,
    to: '/work/monsoon-dining-table',
  },
  {
    title: 'Events & Festivals',
    subtitle: 'Live Stage & Coverage',
    iconKey: 'sparkles' as const,
    to: '/work/valley-sound-festival',
  },
  {
    title: 'Brand Campaigns',
    subtitle: 'Identity & Launches',
    iconKey: 'palette' as const,
    to: '/work/kora-brand-relaunch',
  },
];

export function HomePage() {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(2);
  const [showAllServices, setShowAllServices] = useState(false);
  const [activeStrengthIdx, setActiveStrengthIdx] = useState(0);
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);

  const visibleServices = showAllServices ? SERVICES : SERVICES.slice(0, 4);
  const activeService = SERVICES[selectedServiceIdx] ?? SERVICES[0];
  const activeStrength = WHY_FUNMEDIA_STRENGTHS[activeStrengthIdx] ?? WHY_FUNMEDIA_STRENGTHS[0];
  const activeProcess = PROCESS_STEPS[activeProcessIdx] ?? PROCESS_STEPS[0];

  const handlePrevProcess = () => {
    setActiveProcessIdx((prev) => (prev === 0 ? PROCESS_STEPS.length - 1 : prev - 1));
  };

  const handleNextProcess = () => {
    setActiveProcessIdx((prev) => (prev === PROCESS_STEPS.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <SEOHead
        title="Funmedia — Full-Service Marketing Agency in Nepal"
        description="Funmedia is a full-service creative and digital marketing agency in Nepal specializing in brand strategy, content creation, social media, events, and advertising."
        keywords="Digital Marketing Agency Nepal, Creative Agency Nepal, Marketing Agency Kathmandu, Social Media Marketing Nepal, Video Production Nepal, Event Marketing Nepal, Branding Agency Nepal"
      />

      {/* SECTION 1: Full-Bleed Jet Black Hero (Finguard Layout Rhythm, Pure Icons & Typography) */}
      <section className="relative overflow-hidden bg-[#090909] pt-24 pb-14 text-white sm:pt-28 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Monumental Uppercase Display Headline + Top-Right Orange Sparkle Mark */}
          <div className="relative flex items-start justify-between gap-6">
            <h1 className="font-display max-w-5xl text-[12vw] leading-[0.9] font-extrabold tracking-tighter text-white uppercase sm:text-[72px] md:text-[88px] lg:text-[108px]">
              YOUR BRAND.
              <br />
              OUR PLAYGROUND.
            </h1>

            <div
              aria-hidden="true"
              className="hidden shrink-0 items-center gap-1 pt-2 sm:flex lg:pr-6"
            >
              <Sparkles className="h-14 w-14 fill-[#FF4F17] text-[#FF4F17] lg:h-20 lg:w-20" />
            </div>
          </div>

          {/* Lower 3-Column Hero Composition */}
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            {/* Left Column: Supporting Copy, Pill + Circle Arrow CTA, Capability Icon Badges */}
            <div className="flex flex-col justify-between gap-10 lg:col-span-4">
              <div>
                <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
                  We create brands, build audiences, produce content and execute campaigns that make people pay attention across Nepal.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF4F17]"
                  >
                    <span className="rounded-full bg-[#FF4F17] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                      LET&apos;S WORK TOGETHER
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/15 pt-6">
                <div className="flex items-center gap-2 text-xs font-medium text-white/75">
                  <span className="h-2 w-2 rounded-full bg-[#FF4F17]" aria-hidden="true" />
                  <span>Full-Service Agency · Nepal</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                    08
                  </span>
                  <span className="text-xs font-semibold text-white/60 uppercase">
                    Capabilities
                  </span>
                  <div className="flex items-center -space-x-2 pl-2">
                    {HERO_ICON_BADGES.map(({ label, Icon }) => (
                      <span
                        key={label}
                        title={label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#090909] bg-[#FF4F17] text-white"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column: Fanned Stack of 3 Typographic/Icon Funmedia Campaign Deck Cards */}
            <div className="relative flex min-h-[300px] items-center justify-center py-6 lg:col-span-5">
              {/* Back Card 3 (Deep Black) */}
              <div
                aria-hidden="true"
                className="absolute h-[200px] w-[290px] translate-x-10 translate-y-10 rotate-[14deg] rounded-[20px] border border-white/15 bg-[#111111] p-5 shadow-2xl sm:h-[220px] sm:w-[330px]"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-mono uppercase">03 · PAID &amp; LIVE</span>
                  <Megaphone className="h-4 w-4 text-[#FF4F17]" />
                </div>
                <div className="mt-16 font-mono text-xs tracking-widest text-white/40 uppercase">
                  META · TIKTOK · EVENTS
                </div>
              </div>

              {/* Middle Card 2 (Charcoal) */}
              <div
                aria-hidden="true"
                className="absolute h-[200px] w-[290px] translate-x-4 translate-y-2 rotate-[3deg] rounded-[20px] border border-white/20 bg-[#1D1D20] p-5 shadow-2xl sm:h-[220px] sm:w-[330px]"
              >
                <div className="flex items-center justify-between text-xs text-white/75">
                  <span className="font-mono uppercase">02 · STUDIO &amp; REELS</span>
                  <Clapperboard className="h-4 w-4 text-white" />
                </div>
                <div className="mt-12 font-display text-xl font-bold text-white">
                  Visual Storytelling
                </div>
                <div className="mt-1 font-mono text-[11px] text-white/55">
                  COMMERCIAL · HOSPITALITY · NIGHTLIFE
                </div>
              </div>

              {/* Front Card 1 (Electric Vermilion Orange Signature Card) */}
              <div className="relative z-10 flex h-[205px] w-[300px] -translate-x-4 -translate-y-4 -rotate-[9deg] flex-col justify-between rounded-[20px] bg-gradient-to-br from-[#FF632B] via-[#FF4F17] to-[#D63708] p-6 text-white shadow-[0_24px_60px_rgba(255,79,23,0.32)] transition-transform duration-300 hover:rotate-[-4deg] sm:h-[225px] sm:w-[340px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight lowercase">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                      <Layers className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                    </span>
                    <span>funmedia</span>
                  </div>
                  <Sparkles className="h-5 w-5 text-white/90" aria-hidden="true" />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[11px] font-semibold tracking-widest text-white/80 uppercase">
                      CREATIVE PLAYGROUND
                    </div>
                    <div className="mt-1 font-display text-lg font-bold tracking-tight">
                      Strategy · Production · Growth
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-white/90">
                    NEPAL
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Stepped Connector Workflow Links */}
            <div className="flex flex-col gap-5 lg:col-span-3">
              {HERO_STEPS.map((step, idx) => (
                <Link
                  key={step.label}
                  to={step.path}
                  className={`group flex flex-col gap-2 border-b border-white/25 pb-3 transition-colors hover:border-[#FF4F17] ${
                    idx === 1 ? 'lg:ml-4' : idx === 2 ? 'lg:ml-8' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="whitespace-pre-line font-display text-sm leading-snug font-bold text-white transition-colors group-hover:text-[#FF4F17]">
                      {step.label}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-colors group-hover:bg-[#FF4F17]">
                      {step.icon === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      ) : step.icon === 'right' ? (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 rotate-90" aria-hidden="true" />
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: About Bento Trio on Pure White (Orange + Black + Light Gray Asymmetric Cards) */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  ABOUT US
                </span>
                <h2 className="font-display mt-2 text-3xl leading-[1.04] font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl lg:text-5xl">
                  GETTING TO KNOW FUNMEDIA
                </h2>
              </div>
              <div className="lg:col-span-6 lg:pl-12">
                <p className="text-sm leading-relaxed text-[#52525B] sm:text-base">
                  Funmedia is a full-service marketing agency based in Nepal, helping businesses build stronger brands, connect with audiences, and turn bold ideas into measurable brand growth.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {/* Wide Left Orange Card */}
            <Reveal className="lg:col-span-5">
              <Link
                to="/services"
                className="group flex h-full min-h-[240px] flex-col justify-between rounded-[24px] bg-[#FF4F17] p-7 text-white transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#090909] text-white">
                      <Layers className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-5xl leading-none font-extrabold tracking-tight sm:text-6xl">
                      08
                    </span>
                    <span className="font-display text-xl font-bold sm:text-2xl">
                      services
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/85 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>

                <p className="mt-8 text-xs leading-relaxed text-white/90 sm:text-sm">
                  Everything your brand needs under one roof — brand strategy, social media, commercial shoots, events, creator campaigns, design, and paid ads.
                </p>
              </Link>
            </Reveal>

            {/* Middle Jet Black Card */}
            <Reveal delay={0.08} className="lg:col-span-4">
              <Link
                to="/industries"
                className="group flex h-full min-h-[240px] flex-col justify-between rounded-[24px] bg-[#090909] p-7 text-white transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <Compass className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-5xl leading-none font-extrabold tracking-tight sm:text-6xl">
                      06
                    </span>
                    <span className="font-display text-lg font-bold sm:text-xl">
                      sectors
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#FF4F17] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>

                <p className="mt-8 text-xs leading-relaxed text-white/75 sm:text-sm">
                  Built for nightlife venues, restaurants, hospitality, festivals, travel operators, and modern lifestyle brands across Nepal.
                </p>
              </Link>
            </Reveal>

            {/* Right Soft Gray Card */}
            <Reveal delay={0.16} className="lg:col-span-3">
              <Link
                to="/about"
                className="group flex h-full min-h-[240px] flex-col justify-between rounded-[24px] bg-[#F3F4F6] p-7 text-[#090909] ring-1 ring-black/8 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-4xl leading-none font-extrabold tracking-tight sm:text-5xl">
                      360°
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#090909] transition-transform group-hover:text-[#FF4F17]" aria-hidden="true" />
                </div>

                <p className="mt-8 text-xs leading-relaxed text-[#52525B] sm:text-sm">
                  One unified team connecting creative production directly with media rollout and measurable results.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: Interactive Numbered Services Rows + Floating White Preview Card */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  SERVICES
                </span>
                <h2 className="font-display mt-2 text-3xl leading-[1.04] font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl lg:text-5xl">
                  EVERYTHING YOUR BRAND NEEDS
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 lg:col-span-6 lg:pl-12">
                <p className="max-w-md text-sm leading-relaxed text-[#52525B]">
                  Select any capability below to inspect deliverables and strategic focus, or browse all eight services.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#090909] hover:text-[#FF4F17]"
                >
                  <span>All Services</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-12">
            {/* Numbered Rows (Finguard 01-04 Dark Active / Light Inactive Style) */}
            <div className="space-y-3 lg:col-span-7">
              {visibleServices.map((service, idx) => {
                const isSelected = idx === selectedServiceIdx;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => setSelectedServiceIdx(idx)}
                    onMouseEnter={() => setSelectedServiceIdx(idx)}
                    className={`group flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#090909] text-white shadow-lg'
                        : 'bg-[#F3F4F6] text-[#090909] hover:bg-zinc-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-5 sm:gap-7">
                      <span
                        className={`font-mono tabular-nums text-sm font-bold ${
                          isSelected ? 'text-[#FF4F17]' : 'text-[#52525B]'
                        }`}
                      >
                        {service.number}
                      </span>
                      <div>
                        <span className="font-display block text-base font-bold tracking-tight sm:text-lg">
                          {service.title}
                        </span>
                        <span
                          className={`mt-0.5 block text-xs ${
                            isSelected ? 'text-white/70' : 'text-[#52525B]'
                          }`}
                        >
                          {service.shortDescription}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isSelected
                          ? 'bg-[#FF4F17] text-white'
                          : 'bg-white text-[#090909] group-hover:bg-[#090909] group-hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                );
              })}

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAllServices((prev) => !prev);
                    if (showAllServices && selectedServiceIdx >= 4) {
                      setSelectedServiceIdx(0);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-bold text-[#090909] transition-colors hover:border-[#FF4F17] hover:text-[#FF4F17]"
                >
                  <span>
                    {showAllServices
                      ? 'Show Top 4 Capabilities'
                      : 'View All 8 Capabilities'}
                  </span>
                </button>
              </div>
            </div>

            {/* Overlapping Floating White UI Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-7">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF4F17]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#52525B]">
                    CAPABILITY {activeService.number}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-[#090909]">
                      {activeService.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#52525B]">
                      {activeService.overview}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF4F17]/10 text-[#FF4F17]">
                    <CategoryIcon name={activeService.iconKey} className="h-5 w-5" />
                  </span>
                </div>

                {/* Multi-Segment Execution Distribution Bar (Finguard Invoice Progress Bar Signature) */}
                <div className="mt-6">
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#F3F4F6]">
                    <div className="w-[55%] bg-[#FF4F17]" />
                    <div className="w-[30%] bg-[#090909]" />
                    <div className="w-[15%] bg-zinc-400" />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-[#52525B]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#FF4F17]" /> Creative
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#090909]" /> Strategy
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-zinc-400" /> Media
                    </span>
                  </div>
                </div>

                {/* Top Deliverables Rows */}
                <div className="mt-6 space-y-2.5 border-t border-black/10 pt-5">
                  {activeService.deliverables.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-3 rounded-xl bg-[#F3F4F6] px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-2.5 text-xs font-semibold text-[#090909]">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#FF4F17] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                        Included
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 pt-1">
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="group inline-flex items-center gap-1.5"
                  >
                    <span className="rounded-full bg-[#090909] px-5 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-[#FF4F17]">
                      Explore Service
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>

                  <Link
                    to={`/contact?service=${encodeURIComponent(activeService.title)}`}
                    className="text-xs font-bold text-[#52525B] hover:text-[#FF4F17]"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Funmedia (Fanned Vertical Orange/Black Card Stack + Clean Icon Benefits List) */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left Column: Interactive Fanned Vertical Card Stack + Dots */}
          <Reveal className="flex items-center justify-center gap-6 lg:col-span-6">
            {/* Interactive Pagination Dots */}
            <div className="flex flex-col gap-2.5" role="tablist" aria-label="Agency strengths">
              {WHY_FUNMEDIA_STRENGTHS.map((item, idx) => (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeStrengthIdx}
                  aria-label={`Strength ${item.number}: ${item.title}`}
                  onClick={() => setActiveStrengthIdx(idx)}
                  className={`w-2 rounded-full transition-all ${
                    idx === activeStrengthIdx
                      ? 'h-7 bg-[#FF4F17]'
                      : 'h-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>

            <div className="relative flex min-h-[340px] w-full max-w-[360px] items-center justify-center py-6">
              {/* Back Charcoal Tilted Card */}
              <div
                aria-hidden="true"
                className="absolute right-0 h-[280px] w-[220px] rotate-[10deg] rounded-[24px] bg-[#18181B] p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="font-mono">FUNMEDIA</span>
                  <Palette className="h-4 w-4 text-[#FF4F17]" />
                </div>
                <div className="mt-28 font-display text-lg font-bold text-white/80">
                  Creative Direction
                </div>
              </div>

              {/* Front Signature Orange Vertical Card */}
              <div className="relative z-10 flex h-[300px] w-[240px] -translate-x-4 flex-col justify-between rounded-[24px] bg-gradient-to-br from-[#FF632B] via-[#FF4F17] to-[#D63708] p-6 text-white shadow-[0_24px_55px_rgba(255,79,23,0.3)] sm:w-[255px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-white/85 uppercase">
                    PILLAR {activeStrength.number}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight text-white">
                    {activeStrength.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-white/90">
                    {activeStrength.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/25 pt-3 font-mono text-[11px] font-semibold text-white/80">
                  <span>funmedia</span>
                  <span>NEPAL</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: WHY FUNMEDIA List + Orange Pill CTA */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
              WHY FUNMEDIA
            </span>
            <h2 className="font-display mt-2 text-3xl leading-[1.06] font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl lg:text-5xl">
              CREATIVITY MEETS EXECUTION
            </h2>

            <ul className="mt-7 space-y-4">
              {WHY_FUNMEDIA_STRENGTHS.slice(0, 4).map((strength, idx) => {
                const active = idx === activeStrengthIdx;
                return (
                  <li key={strength.number}>
                    <button
                      type="button"
                      onClick={() => setActiveStrengthIdx(idx)}
                      className="group flex w-full items-start gap-4 text-left"
                    >
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors ${
                          active
                            ? 'bg-[#FF4F17] text-white'
                            : 'bg-[#F3F4F6] text-[#090909] group-hover:bg-[#090909] group-hover:text-white'
                        }`}
                      >
                        {strength.number}
                      </span>
                      <div>
                        <span className="font-display text-base font-bold text-[#090909] transition-colors group-hover:text-[#FF4F17]">
                          {strength.title}
                        </span>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#52525B] sm:text-sm">
                          {strength.description}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <Link to="/about" className="group inline-flex items-center gap-1.5">
                <span className="rounded-full bg-[#FF4F17] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                  ABOUT FUNMEDIA
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5: Full-Bleed Jet Black Industries & Work Showcase (Finguard 2x2 Orange Icon Tiles) */}
      <section className="bg-[#090909] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  INDUSTRIES &amp; OUR WORK
                </span>
                <h2 className="font-display mt-2 text-3xl leading-[1.04] font-extrabold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
                  DIFFERENT INDUSTRIES. ONE CREATIVE APPROACH.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm leading-relaxed text-white/75">
                  We partner with hospitality venues, nightlife spots, festivals, travel brands, and consumer labels across Nepal — turning concept showcases and campaigns into real audience demand.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {/* Left Column: 06 Industries Metric + Featured Case Links */}
            <Reveal className="flex flex-col justify-between gap-8 lg:col-span-4">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl leading-none font-extrabold tracking-tight text-white sm:text-7xl">
                    06
                  </span>
                  <span className="font-display text-2xl font-bold text-[#FF4F17]">
                    +
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Core industries where Funmedia crafts visual identities, short-form video engines, event rollouts, and paid digital growth systems.
                </p>
              </div>

              <div className="space-y-2.5 border-t border-white/15 pt-6">
                <div className="text-[11px] font-bold tracking-widest text-white/50 uppercase">
                  Recent Concept Showcases
                </div>
                {PROJECTS.slice(0, 3).map((proj) => (
                  <Link
                    key={proj.slug}
                    to={`/work/${proj.slug}`}
                    className="group flex items-center justify-between py-1.5 text-xs font-semibold text-white/85 transition-colors hover:text-[#FF4F17]"
                  >
                    <span className="truncate pr-3">{proj.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </Reveal>

            {/* Right 2x2 Vibrant Orange Rounded Tiles + Adjacent Black Callout Block */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {ORANGE_WORK_TILES.map((tile, idx) => (
                <Reveal key={tile.title} delay={idx * 0.06}>
                  <Link
                    to={tile.to}
                    className="group flex min-h-[210px] flex-col items-center justify-center rounded-[22px] bg-[#FF4F17] p-7 text-center text-white transition-transform duration-200 hover:-translate-y-1 hover:bg-[#e54310]"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white transition-transform group-hover:scale-105">
                      <CategoryIcon name={tile.iconKey} className="h-7 w-7 stroke-[2]" />
                    </span>
                    <h3 className="font-display mt-4 text-xl font-extrabold tracking-tight text-white">
                      {tile.title}
                    </h3>
                    <span className="mt-1 text-xs font-medium text-white/85">
                      {tile.subtitle}
                    </span>
                  </Link>
                </Reveal>
              ))}

              {/* Full-Width Bottom Bar inside Right Column matching Finguard White Pill CTA */}
              <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-white/15 bg-[#121214] p-7 sm:col-span-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display max-w-md text-lg leading-snug font-extrabold tracking-tight text-white uppercase sm:text-xl">
                    CREATING IMPACTFUL CAMPAIGNS AND LASTING BRAND EQUITY
                  </h3>
                  <p className="mt-1.5 text-xs text-white/70">
                    Explore all 6 industry verticals or inspect our full portfolio.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-xs font-bold tracking-wider text-[#090909] uppercase transition-colors hover:bg-[#FF4F17] hover:text-white"
                  >
                    <span>EXPLORE OUR WORK</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Editorial Process Statement Band on White (Matching Finguard Quote Band Without Fake Testimonials) */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
              OUR PROCESS · STEP {activeProcess.number} OF 05
            </span>
            <span
              aria-hidden="true"
              className="font-display text-5xl leading-none font-extrabold text-[#FF4F17] select-none sm:text-6xl"
            >
              &ldquo;
            </span>
          </div>

          <div className="mt-6 max-w-5xl">
            <h2 className="font-display text-3xl leading-[1.12] font-extrabold tracking-tight text-[#090909] sm:text-4xl lg:text-5xl">
              &ldquo;{activeProcess.title}: {activeProcess.description}&rdquo;
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-black/10 pt-8">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] font-mono text-sm font-bold text-white">
                {activeProcess.number}
              </span>
              <div>
                <div className="font-display text-base font-bold text-[#090909]">
                  {activeProcess.title}
                </div>
                <div className="text-xs text-[#52525B]">
                  Funmedia 5-Step Growth Methodology
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevProcess}
                aria-label="Previous process step"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-[#090909] transition-colors hover:border-[#090909] hover:bg-[#090909] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNextProcess}
                aria-label="Next process step"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-[#090909] transition-colors hover:border-[#FF4F17] hover:bg-[#FF4F17] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
