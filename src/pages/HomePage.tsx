import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  Compass,
  Layers,
  MapPin,
  Megaphone,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Reveal } from '../components/Reveal';
import { CategoryIcon } from '../components/CategoryIcon';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import { GALLERY_IMAGES } from '../data/gallery';
import { SITE_CONFIG } from '../data/site';
import { buildOrganizationSchema, buildWebSiteSchema } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';

const HERO_STEPS = [
  { label: 'Digital\nMarketing', path: '/digital-marketing-agency-nepal', icon: 'up' as const },
  { label: 'Content &\nVideo', path: '/content-creation', icon: 'right' as const },
  { label: 'Ads &\nWebsites', path: '/website-development', icon: 'down' as const },
];

const HERO_ICON_BADGES = [
  { label: 'Strategy', Icon: Compass },
  { label: 'Production', Icon: Clapperboard },
  { label: 'Creators', Icon: Users },
  { label: 'Paid Media', Icon: Megaphone },
];

const ORANGE_WORK_TILES: Array<{
  title: string;
  subtitle: string;
  iconKey: 'disc' | 'megaphone' | 'building' | 'sparkles';
  to: string;
  image?: string;
}> = [
  {
    title: 'Club Nova',
    subtitle: 'Nightlife Identity & Reels',
    iconKey: 'disc',
    to: '/work/club-nova',
    image: '/assets/aistudio/805752663_122207249450929554_2922128208403435598_n_d9cef23c.jpg',
  },
  {
    title: 'TVS Motors',
    subtitle: 'Campaign & Video Production',
    iconKey: 'megaphone',
    to: '/work/tvs-motors',
    image: '/assets/aistudio/SnapInsta.to_496249866_18505132873025961_6968535842937274523_n_7a34b92b.jpg',
  },
  {
    title: 'Bagaicha Resort and Spa',
    subtitle: 'Hospitality Storytelling',
    iconKey: 'building',
    to: '/work/bagaicha-resort-and-spa',
    image: '/assets/aistudio/NB103873_8535e07b.jpg',
  },
  {
    title: 'Park 31 Hotel',
    subtitle: 'Hospitality Visual Showcase',
    iconKey: 'building',
    to: '/work/31-park-hotel',
    image: '/assets/aistudio/NB101730_f949dda5.jpg',
  },
];

export function HomePage() {
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const visibleServices = showAllServices ? SERVICES : SERVICES.slice(0, 4);
  const activeService = SERVICES[selectedServiceIdx] ?? SERVICES[0];

  return (
    <>
      <SEOHead
        title="Funmedia — Creative & Digital Marketing Agency in Nepal"
        description="Funmedia is a full-service creative and digital marketing agency in Pokhara and Kathmandu, Nepal. We Make Brands Impossible to Ignore."
        keywords="Digital Marketing Agency Nepal, Digital Marketing Agency Pokhara, Digital Marketing Agency Kathmandu, Social Media Marketing Nepal, Content Creation Agency Nepal, Video Production Nepal, Influencer Marketing Nepal, Website Development Company Nepal"
        canonicalPath="/"
        schema={[buildOrganizationSchema(), buildWebSiteSchema()]}
      />

      {/* SECTION 1: Full-Bleed Jet Black Hero */}
      <section className="relative overflow-hidden bg-[#090909] pt-24 pb-14 text-white sm:pt-28 lg:pt-32 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-start justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                {SITE_CONFIG.tagline}
              </p>
              <h1 className="font-display max-w-5xl text-[11.5vw] leading-[0.9] font-extrabold tracking-tighter text-white uppercase sm:text-[70px] md:text-[84px] lg:text-[102px]">
                YOUR BRAND.
                <br />
                OUR PLAYGROUND.
              </h1>
            </div>

            <div
              aria-hidden="true"
              className="hidden shrink-0 items-center gap-1 pt-8 sm:flex lg:pr-6"
            >
              <Sparkles className="h-14 w-14 fill-[#FF4F17] text-[#FF4F17] lg:h-20 lg:w-20" />
            </div>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="flex flex-col justify-between gap-10 lg:col-span-4">
              <div>
                <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
                  Funmedia is a full-service creative and digital marketing agency in Pokhara and Kathmandu, Nepal—combining social media, content production, video, influencer marketing, paid ads, and web development.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppUrl("Hello Funmedia, I would like to discuss a project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'hero_cta' })}
                    className="group inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF4F17]"
                  >
                    <span className="rounded-full bg-[#FF4F17] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                      DISCUSS YOUR PROJECT
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                </div>

                <a
                  href={getWhatsAppUrl('Hello Funmedia, I would like to make an enquiry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'hero_whatsapp_number' })}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/80 transition-colors hover:text-[#FF4F17]"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  <span>WhatsApp Enquiries: {SITE_CONFIG.whatsappDisplay}</span>
                </a>
              </div>

              <div className="border-t border-white/15 pt-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/75">
                  <MapPin className="h-3.5 w-3.5 text-[#FF4F17]" aria-hidden="true" />
                  <Link to="/digital-marketing-agency-pokhara" className="hover:text-[#FF4F17]">
                    Pokhara
                  </Link>
                  <span aria-hidden="true">·</span>
                  <Link to="/digital-marketing-agency-kathmandu" className="hover:text-[#FF4F17]">
                    Kathmandu
                  </Link>
                  <span aria-hidden="true">·</span>
                  <span>Nepal</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                    12
                  </span>
                  <span className="text-xs font-semibold text-white/60 uppercase">
                    Core Services
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

            {/* Center Column: Fanned Stack of 3 Typographic/Icon Cards */}
            <div className="relative flex min-h-[300px] items-center justify-center py-6 lg:col-span-5">
              <div
                aria-hidden="true"
                className="absolute h-[200px] w-[290px] translate-x-10 translate-y-10 rotate-[14deg] rounded-[20px] border border-white/15 bg-[#111111] p-5 shadow-2xl sm:h-[220px] sm:w-[330px]"
              >
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="font-mono uppercase">03 · PAID &amp; WEB</span>
                  <Megaphone className="h-4 w-4 text-[#FF4F17]" />
                </div>
                <div className="mt-16 font-mono text-xs tracking-widest text-white/40 uppercase">
                  META · GOOGLE ADS · WEB
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute h-[200px] w-[290px] translate-x-4 translate-y-2 rotate-[3deg] rounded-[20px] border border-white/20 bg-[#1D1D20] p-5 shadow-2xl sm:h-[220px] sm:w-[330px]"
              >
                <div className="flex items-center justify-between text-xs text-white/75">
                  <span className="font-mono uppercase">02 · PHOTO &amp; VIDEO</span>
                  <Clapperboard className="h-4 w-4 text-white" />
                </div>
                <div className="mt-12 font-display text-xl font-bold text-white">
                  Content &amp; Reels Studio
                </div>
                <div className="mt-1 font-mono text-[11px] text-white/55">
                  POKHARA · KATHMANDU · NEPAL
                </div>
              </div>

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
                      CREATIVE &amp; DIGITAL AGENCY
                    </div>
                    <div className="mt-1 font-display text-lg font-bold tracking-tight">
                      Strategy · Content · Ads · Web
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

      {/* SECTION 2: About Bento Trio on Pure White */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  ABOUT FUNMEDIA
                </span>
                <h2 className="font-display mt-2 text-3xl leading-[1.04] font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl lg:text-5xl">
                  CREATIVE &amp; DIGITAL MARKETING IN NEPAL
                </h2>
              </div>
              <div className="lg:col-span-6 lg:pl-12">
                <p className="text-sm leading-relaxed text-[#52525B] sm:text-base">
                  With teams in Damside, Pokhara and Uttardhoka, Lazimpat, Kathmandu, Funmedia helps hospitality, corporate, event, and consumer brands build stronger digital presence and consistent customer demand.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Link
                to="/digital-marketing-agency-nepal"
                className="group flex h-full min-h-[240px] flex-col justify-between rounded-[24px] bg-[#FF4F17] p-7 text-white transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#090909] text-white">
                      <Layers className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-5xl leading-none font-extrabold tracking-tight sm:text-6xl">
                      12
                    </span>
                    <span className="font-display text-xl font-bold sm:text-2xl">
                      services
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/85 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>

                <p className="mt-8 text-xs leading-relaxed text-white/90 sm:text-sm">
                  Digital marketing, social media, content creation, video production, influencer campaigns, Meta &amp; Google Ads, branding, and website development.
                </p>
              </Link>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-4">
              <Link
                to="/digital-marketing-agency-pokhara"
                className="group flex h-full min-h-[240px] flex-col justify-between rounded-[24px] bg-[#090909] p-7 text-white transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-display text-5xl leading-none font-extrabold tracking-tight sm:text-6xl">
                      02
                    </span>
                    <span className="font-display text-lg font-bold sm:text-xl">
                      hub cities
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#FF4F17] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>

                <p className="mt-8 text-xs leading-relaxed text-white/75 sm:text-sm">
                  Local presence in Pokhara (Damside) and Kathmandu (Lazimpat, Uttardhoka), serving businesses across Nepal.
                </p>
              </Link>
            </Reveal>

            <Reveal delay={0.16} className="lg:col-span-3">
              <Link
                to="/work"
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
                  One unified team connecting creative production directly with media rollout and web conversion.
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
                  SERVICES IN NEPAL
                </span>
                <h2 className="font-display mt-2 text-3xl leading-[1.04] font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl lg:text-5xl">
                  EVERYTHING YOUR BRAND NEEDS
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 lg:col-span-6 lg:pl-12">
                <p className="max-w-md text-sm leading-relaxed text-[#52525B]">
                  Explore our specialized services covering digital strategy, social media, commercial video, ads, and website development.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#090909] hover:text-[#FF4F17]"
                >
                  <span>All 12 Services</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-7">
              {visibleServices.map((service, idx) => {
                const isSelected = idx === selectedServiceIdx;
                return (
                  <Reveal key={service.slug} delay={Math.min(idx * 0.04, 0.16)} y={14}>
                    <button
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
                  </Reveal>
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
                      : `View All ${SERVICES.length} Capabilities`}
                  </span>
                </button>
              </div>
            </div>

            <Reveal delay={0.12} className="lg:col-span-5">
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
                    to={`/${activeService.slug}`}
                    className="group inline-flex items-center gap-1.5"
                  >
                    <span className="rounded-full bg-[#090909] px-5 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-[#FF4F17]">
                      Explore {activeService.shortTitle}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>

                  <a
                    href={getWhatsAppUrl(
                      `Hello Funmedia, I would like to request a proposal for ${activeService.title}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('whatsapp_click', {
                        location: 'home_service_preview',
                        service: activeService.slug,
                      })
                    }
                    className="text-xs font-bold text-[#52525B] hover:text-[#FF4F17]"
                  >
                    Request Proposal
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: Full-Bleed Jet Black Portfolio & Local Hub Section */}
      <section className="bg-[#090909] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                  VERIFIED PORTFOLIO &amp; LOCAL PRESENCE
                </span>
                <h2 className="font-display mt-2 text-3xl leading-[1.04] font-extrabold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
                  BRANDS ACROSS POKHARA, KATHMANDU &amp; NEPAL
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm leading-relaxed text-white/75">
                  From nightlife venues and luxury hospitality properties to national automotive and awareness campaigns, explore how Funmedia delivers creative momentum.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <Reveal className="flex flex-col justify-between gap-8 lg:col-span-4">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl leading-none font-extrabold tracking-tight text-white sm:text-7xl">
                    {PROJECTS.length}
                  </span>
                  <span className="font-display text-2xl font-bold text-[#FF4F17]">
                    +
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Featured client collaborations spanning hospitality, nightlife, automotive, agribusiness, and live events across Nepal.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    to="/digital-marketing-agency-pokhara"
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-[#FF4F17]"
                  >
                    <span>Pokhara Agency</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/digital-marketing-agency-kathmandu"
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-[#FF4F17]"
                  >
                    <span>Kathmandu Agency</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-white/15 pt-6">
                <div className="text-[11px] font-bold tracking-widest text-white/50 uppercase">
                  Additional Client Work
                </div>
                {PROJECTS.slice(4, 8).map((proj) => (
                  <Link
                    key={proj.slug}
                    to={`/work/${proj.slug}`}
                    className="group flex items-center justify-between py-1.5 text-xs font-semibold text-white/85 transition-colors hover:text-[#FF4F17]"
                  >
                    <span className="truncate pr-3">{proj.clientName}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {ORANGE_WORK_TILES.map((tile, idx) => (
                <Reveal key={tile.title} delay={idx * 0.06}>
                  <Link
                    to={tile.to}
                    className={`group relative flex min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-[22px] p-7 text-center text-white transition-transform duration-200 hover:-translate-y-1 ${
                      tile.image ? 'bg-[#090909]' : 'bg-[#FF4F17] hover:bg-[#e54310]'
                    }`}
                  >
                    {tile.image && (
                      <>
                        <img
                          src={tile.image}
                          alt={`${tile.title} — ${tile.subtitle}`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-[#090909]/45 to-[#090909]/25"
                        />
                      </>
                    )}
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-xs transition-transform group-hover:scale-105">
                        <CategoryIcon name={tile.iconKey} className="h-7 w-7 stroke-[2]" />
                      </span>
                      <h3 className="font-display mt-4 text-xl font-extrabold tracking-tight text-white">
                        {tile.title}
                      </h3>
                      <span className="mt-1 text-xs font-medium text-white/85">
                        {tile.subtitle}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}

              <Reveal delay={0.18} className="sm:col-span-2">
                <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-white/15 bg-[#121214] p-7 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-display max-w-md text-lg leading-snug font-extrabold tracking-tight text-white uppercase sm:text-xl">
                      WE MAKE BRANDS IMPOSSIBLE TO IGNORE
                    </h3>
                    <p className="mt-1.5 text-xs text-white/70">
                      Inspect all 10 verified portfolio case studies or start your campaign.
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
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Minimal Gallery */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl">
              PORTFOLIO
            </h2>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {GALLERY_IMAGES.map((photo, index) => (
              <Reveal key={photo.src} delay={(index % 4) * 0.04}>
                <div className="aspect-square overflow-hidden rounded-xl bg-[#F3F4F6]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="pointer-events-none block h-full w-full select-none object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
