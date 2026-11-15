import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/site';
import { Reveal } from './Reveal';

interface CTABannerProps {
  headline?: string;
  subtext?: string;
}

const BUDGET_OPTIONS = [
  'Under NPR 1,50,000',
  'NPR 1,50,000 – 3,50,000',
  'NPR 3,50,000 – 7,50,000',
  'NPR 7,50,000+',
  'Monthly Retainer / Ongoing',
];

export function CTABanner({
  headline = "Let's Connect",
  subtext = "Ready to make your brand stand out? Tell us about your goals and let's create something people remember.",
}: CTABannerProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState(SERVICES[0].title);
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [projectDescription, setProjectDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  async function handleQuickSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (
      fullName.trim().length < 2 ||
      companyName.trim().length < 2 ||
      !email.includes('@') ||
      phone.trim().length < 7 ||
      projectDescription.trim().length < 15
    ) {
      setErrorMsg(
        'Please complete all fields (and include at least 15 characters describing your project).',
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          phone,
          serviceRequired,
          budget,
          projectDescription,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'Please check your input and try again.');
        return;
      }
      setReferenceId(data.referenceId || 'RECEIVED');
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setProjectDescription('');
    } catch {
      setErrorMsg(`Unable to submit right now. Email ${SITE_CONFIG.email} directly.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-[#090909] p-5 sm:p-8 lg:p-12">
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
            {/* Left Floating White Form Card */}
            <div className="rounded-[24px] bg-white p-6 text-[#090909] shadow-xl sm:p-9 lg:col-span-7">
              <p className="text-[11px] font-bold tracking-[0.18em] text-[#FF4F17] uppercase">
                READY TO MAKE YOUR BRAND STAND OUT?
              </p>
              <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-[#090909] uppercase sm:text-4xl">
                {headline}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#52525B] sm:text-sm">
                {subtext}
              </p>

              {referenceId ? (
                <div className="mt-6 rounded-2xl border border-[#FF4F17]/30 bg-[#F3F4F6] p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4F17]" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#090909]">
                        Project Enquiry Logged ({referenceId})
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                        Thank you. Our team at Funmedia Nepal will review your brief and reply shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setReferenceId(null)}
                        className="mt-4 rounded-full bg-[#FF4F17] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#e54310]"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} noValidate className="mt-6 space-y-3.5">
                  {errorMsg && (
                    <div className="flex items-center gap-2 rounded-xl border border-[#FF4F17]/30 bg-[#FF4F17]/10 px-3.5 py-2.5 text-xs text-[#090909]">
                      <AlertCircle className="h-4 w-4 shrink-0 text-[#FF4F17]" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cta-fullName" className="block text-[11px] font-semibold text-[#52525B]">
                        Full Name *
                      </label>
                      <input
                        id="cta-fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your name"
                        className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] placeholder:text-zinc-400 focus:border-[#FF4F17] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="cta-companyName" className="block text-[11px] font-semibold text-[#52525B]">
                        Company Name *
                      </label>
                      <input
                        id="cta-companyName"
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Brand or venue"
                        className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] placeholder:text-zinc-400 focus:border-[#FF4F17] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cta-email" className="block text-[11px] font-semibold text-[#52525B]">
                        Work Email *
                      </label>
                      <input
                        id="cta-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] placeholder:text-zinc-400 focus:border-[#FF4F17] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="cta-phone" className="block text-[11px] font-semibold text-[#52525B]">
                        Phone Number *
                      </label>
                      <input
                        id="cta-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977 98XXXXXXXX"
                        className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] placeholder:text-zinc-400 focus:border-[#FF4F17] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cta-service" className="block text-[11px] font-semibold text-[#52525B]">
                        Service Required
                      </label>
                      <select
                        id="cta-service"
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] focus:border-[#FF4F17] focus:outline-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cta-budget" className="block text-[11px] font-semibold text-[#52525B]">
                        Estimated Budget
                      </label>
                      <select
                        id="cta-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] focus:border-[#FF4F17] focus:outline-none"
                      >
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cta-desc" className="block text-[11px] font-semibold text-[#52525B]">
                      How can we help you? *
                    </label>
                    <input
                      id="cta-desc"
                      type="text"
                      required
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Tell us about your campaign, launch, or production goals..."
                      className="mt-1 w-full border-b border-black/20 bg-transparent py-2 text-sm text-[#090909] placeholder:text-zinc-400 focus:border-[#FF4F17] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF4F17] disabled:opacity-60"
                    >
                      <span className="rounded-full bg-[#FF4F17] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                        {submitting ? 'Sending...' : 'Start a Project'}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>

                    <Link
                      to="/contact"
                      className="text-xs font-semibold text-[#52525B] underline decoration-black/25 underline-offset-4 hover:text-[#FF4F17]"
                    >
                      Open full project brief form
                    </Link>
                  </div>
                </form>
              )}
            </div>

            {/* Right Typographic & Icon Contact Column */}
            <div className="flex flex-col justify-between gap-8 p-4 text-white sm:p-6 lg:col-span-5">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display mt-6 text-3xl leading-tight font-extrabold tracking-tight text-white uppercase">
                  Strategy. Content. Campaigns. Events.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Whether you are launching a new hospitality venue, planning a live festival, or scaling a consumer brand across Nepal, our team builds the creative and media engine around your goals.
                </p>
              </div>

              <div className="space-y-4 border-t border-white/15 pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF4F17]/20 text-[#FF4F17]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-medium text-white hover:text-[#FF4F17]"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF4F17]/20 text-[#FF4F17]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-white/90">
                    {SITE_CONFIG.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
