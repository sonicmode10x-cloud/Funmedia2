import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '../data/site';
import { SERVICES } from '../data/services';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { Reveal } from './Reveal';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#FF5B22] via-[#FF4F17] to-[#E63E0B] text-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div
          aria-hidden="true"
          className="font-display select-none text-center text-[17vw] leading-[0.82] font-extrabold tracking-tighter lowercase text-[#FF8B5F]/45 drop-shadow-[0_14px_24px_rgba(160,30,0,0.35)] sm:text-[15vw] lg:text-[190px]"
        >
          funmedia
        </div>

        {/* Social Links Row */}
        <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-white/20 pb-8">
          {SITE_CONFIG.socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#FF4F17]"
            >
              <span>{social.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-5">
            <h2 className="font-display max-w-md text-2xl leading-[1.08] font-extrabold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
              {SITE_CONFIG.tagline}
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/85">
              Full-service creative &amp; digital marketing agency serving businesses in Pokhara, Kathmandu, and across Nepal.
            </p>
            <div className="mt-7">
              <a
                href={getWhatsAppUrl("Hello Funmedia, I would like to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'footer_cta' })}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold tracking-wider text-[#FF4F17] uppercase shadow-sm transition-transform duration-150 hover:bg-zinc-100 active:scale-[0.98]"
              >
                <span>DISCUSS YOUR PROJECT</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Services
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-white/85">
                {SERVICES.slice(0, 7).map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/${service.slug}`}
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                More Services
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-white/85">
                {SERVICES.slice(7).map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/${service.slug}`}
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {service.shortTitle}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    className="font-semibold text-white transition-colors hover:underline"
                  >
                    All 12 Services
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Company &amp; Cities
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-white/85">
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/digital-marketing-agency-pokhara"
                    className="font-semibold text-white transition-colors hover:underline"
                  >
                    Pokhara Agency
                  </Link>
                </li>
                <li>
                  <Link
                    to="/digital-marketing-agency-kathmandu"
                    className="font-semibold text-white transition-colors hover:underline"
                  >
                    Kathmandu Agency
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Locations &amp; Contact
              </h3>
              <ul className="mt-4 space-y-3 text-xs text-white/90">
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'footer_contact' })}
                    className="font-semibold transition-colors hover:text-white hover:underline"
                  >
                    WhatsApp: {SITE_CONFIG.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    onClick={() => trackEvent('email_click', { location: 'footer' })}
                    className="font-semibold break-all transition-colors hover:text-white hover:underline"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                {SITE_CONFIG.offices.map((office) => (
                  <li key={office.city} className="leading-snug">
                    <Link
                      to={`/${office.slug}`}
                      className="group block hover:underline"
                    >
                      <span className="block text-[10px] font-bold tracking-wider text-white/75 uppercase">
                        {office.city} Office
                      </span>
                      <span className="font-medium text-white">{office.address}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={getWhatsAppUrl('Hello Funmedia, I would like to request a proposal.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'footer_proposal' })}
                    className="font-semibold hover:underline"
                  >
                    Request a Proposal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dedicated Office Locations Strip */}
        <div className="grid gap-4 border-t border-white/20 py-6 sm:grid-cols-2">
          {SITE_CONFIG.offices.map((office, idx) => (
            <Reveal key={office.city} delay={idx * 0.06}>
              <Link
                to={`/${office.slug}`}
                className="group flex items-center justify-between gap-3.5 rounded-2xl bg-black/15 px-5 py-4 transition-colors hover:bg-black/25"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#FF4F17]">
                    <MapPin className="h-4 w-4 stroke-[2.3]" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-[11px] font-bold tracking-widest text-white/80 uppercase">
                      {office.city} Office
                    </div>
                    <div className="font-display text-sm font-bold text-white sm:text-base">
                      {office.address}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/20 py-7 text-xs text-white/85 sm:flex-row sm:items-center">
          <p>{SITE_CONFIG.copyright}</p>
          <p>Funmedia — Creative &amp; Digital Marketing Agency · Nepal</p>
          <div className="flex gap-6">
            <Link to="/digital-marketing-agency-pokhara" className="hover:underline">
              Pokhara
            </Link>
            <Link to="/digital-marketing-agency-kathmandu" className="hover:underline">
              Kathmandu
            </Link>
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
