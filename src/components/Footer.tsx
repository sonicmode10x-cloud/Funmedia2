import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '../data/site';
import { SERVICES } from '../data/services';
import { INDUSTRIES } from '../data/industries';

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

        {/* Main Footer Grid: Left Bold Headline + White Pill CTA, Right 4 Link Columns */}
        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-5">
            <h2 className="font-display max-w-md text-2xl leading-[1.08] font-extrabold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
              READY TO MAKE YOUR BRAND STAND OUT?
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/85">
              Let&apos;s create something people remember. Strategy. Content. Campaigns. Events.
            </p>
            <div className="mt-7">
              <Link
                to="/contact"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold tracking-wider text-[#FF4F17] uppercase shadow-sm transition-transform duration-150 hover:bg-zinc-100 active:scale-[0.98]"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Services
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-white/85">
                {SERVICES.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${service.slug}`}
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
                Company
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
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Industries
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-white/85">
                {INDUSTRIES.slice(0, 5).map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      to="/industries"
                      className="transition-colors hover:text-white hover:underline"
                    >
                      {ind.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-white uppercase">
                Locations &amp; Contact
              </h3>
              <ul className="mt-4 space-y-3 text-xs text-white/90">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-semibold break-all transition-colors hover:text-white hover:underline"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                {SITE_CONFIG.offices.map((office) => (
                  <li key={office.city} className="leading-snug">
                    <span className="block text-[10px] font-bold tracking-wider text-white/75 uppercase">
                      {office.city} Office
                    </span>
                    <span className="font-medium text-white">{office.address}</span>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className="font-semibold hover:underline">
                    Project Enquiry
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dedicated Office Locations Strip */}
        <div className="grid gap-4 border-t border-white/20 py-6 sm:grid-cols-2">
          {SITE_CONFIG.offices.map((office) => (
            <div
              key={office.city}
              className="flex items-center gap-3.5 rounded-2xl bg-black/15 px-5 py-4"
            >
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
          ))}
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/20 py-7 text-xs text-white/85 sm:flex-row sm:items-center">
          <p>{SITE_CONFIG.copyright}</p>
          <p>Funmedia — Full-Service Marketing Agency · Kathmandu &amp; Pokhara</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:underline">
              Agency Philosophy
            </Link>
            <Link to="/contact" className="hover:underline">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
