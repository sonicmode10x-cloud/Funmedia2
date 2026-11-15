import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/site';

interface FormValues {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  budget: string;
  projectDescription: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const BUDGET_OPTIONS = [
  'Under NPR 1,50,000',
  'NPR 1,50,000 – 3,50,000',
  'NPR 3,50,000 – 7,50,000',
  'NPR 7,50,000+',
  'Monthly Retainer / Ongoing',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s()-]{7,24}$/;

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceRequired: preselectedService,
    budget: '',
    projectDescription: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  function validateClient(form: FormValues): FieldErrors {
    const errors: FieldErrors = {};
    if (form.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (form.companyName.trim().length < 2) {
      errors.companyName = 'Please enter your company or brand name.';
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!PHONE_REGEX.test(form.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!form.serviceRequired.trim()) {
      errors.serviceRequired = 'Please select a service.';
    }
    if (!form.budget.trim()) {
      errors.budget = 'Please select an estimated budget.';
    }
    if (form.projectDescription.trim().length < 15) {
      errors.projectDescription =
        'Please describe your project goals in at least 15 characters.';
    }
    return errors;
  }

  function handleChange<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (serverError) setServerError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const errors = validateClient(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors && typeof data.errors === 'object') {
          setFieldErrors(data.errors);
        }
        setServerError(
          data.message ||
            'Unable to send your enquiry right now. Please check your details and try again.',
        );
        return;
      }

      setSubmittedRef(data.referenceId || 'RECEIVED');
      setValues({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        serviceRequired: '',
        budget: '',
        projectDescription: '',
      });
      setFieldErrors({});
    } catch {
      setServerError(
        `Network error while sending your enquiry. Please try again or email ${SITE_CONFIG.email}.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    'mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#090909] placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF4F17]';

  return (
    <>
      <SEOHead
        title="Contact Us | Funmedia — Marketing Agency Nepal"
        description="Start a project with Funmedia in Nepal. Enquire about brand strategy, social media management, content creation, digital ads, or event marketing."
        keywords="Contact Marketing Agency Nepal, Hire Creative Agency Kathmandu, Funmedia Nepal Contact"
      />

      <section className="bg-[#090909] pt-28 pb-16 text-white sm:pt-32 lg:pt-36 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FF4F17] uppercase">
                START A CONVERSATION
              </span>
              <h1 className="font-display mt-3 text-4xl leading-[1.02] font-extrabold tracking-tight text-white uppercase sm:text-5xl">
                Let&apos;s Build Something Together.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Tell us about your brand, upcoming launch, or marketing goals. Our team in Nepal will review your brief and follow up with clear next steps.
              </p>

              <div className="mt-8 space-y-5 rounded-[24px] border border-white/15 bg-[#121214] p-7 text-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wider text-white/60 uppercase">
                      Email
                    </div>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="mt-1 block text-base font-semibold text-white transition-colors hover:text-[#FF4F17]"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-white/15 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF4F17] text-white">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs font-semibold tracking-wider text-white/60 uppercase">
                      Office Locations
                    </div>
                    {SITE_CONFIG.offices.map((office) => (
                      <div key={office.city}>
                        <div className="text-xs font-bold tracking-wider text-[#FF4F17] uppercase">
                          {office.city}
                        </div>
                        <div className="mt-0.5 text-base font-semibold text-white">
                          {office.address}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[28px] bg-white p-6 text-[#090909] shadow-2xl sm:p-9">
                {submittedRef ? (
                  <div
                    role="status"
                    className="rounded-[20px] bg-[#F3F4F6] p-6 ring-1 ring-[#FF4F17]/30 sm:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2
                        className="mt-0.5 h-6 w-6 shrink-0 text-[#FF4F17]"
                        aria-hidden="true"
                      />
                      <div>
                        <h2 className="font-display text-2xl font-bold text-[#090909]">
                          Project Enquiry Received
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
                          Thank you for reaching out to Funmedia. Your brief has been logged under reference{' '}
                          <span className="font-mono font-bold text-[#FF4F17]">
                            {submittedRef}
                          </span>
                          . Our team will review your project details and reply via email.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmittedRef(null)}
                          className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-[#FF4F17] px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#e54310]"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {serverError && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-[#FF4F17]/40 bg-[#FF4F17]/10 p-4 text-sm text-[#090909]"
                      >
                        <AlertCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4F17]"
                          aria-hidden="true"
                        />
                        <span>{serverError}</span>
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-[#090909]"
                        >
                          Full Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          required
                          value={values.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.fullName)}
                          placeholder="Your full name"
                          className={`${inputBase} ${
                            fieldErrors.fullName ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]' : 'border-black/15'
                          }`}
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                            {fieldErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-xs font-semibold text-[#090909]"
                        >
                          Company Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          autoComplete="organization"
                          required
                          value={values.companyName}
                          onChange={(e) => handleChange('companyName', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.companyName)}
                          placeholder="Brand or business name"
                          className={`${inputBase} ${
                            fieldErrors.companyName ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]' : 'border-black/15'
                          }`}
                        />
                        {fieldErrors.companyName && (
                          <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                            {fieldErrors.companyName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[#090909]"
                        >
                          Email Address <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={values.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.email)}
                          placeholder="you@company.com"
                          className={`${inputBase} ${
                            fieldErrors.email ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]' : 'border-black/15'
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold text-[#090909]"
                        >
                          Phone Number <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={values.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          placeholder="+977 98XXXXXXXX"
                          className={`${inputBase} ${
                            fieldErrors.phone ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]' : 'border-black/15'
                          }`}
                        />
                        {fieldErrors.phone && (
                          <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="serviceRequired"
                          className="block text-xs font-semibold text-[#090909]"
                        >
                          Service Required <span aria-hidden="true">*</span>
                        </label>
                        <select
                          id="serviceRequired"
                          name="serviceRequired"
                          required
                          value={values.serviceRequired}
                          onChange={(e) => handleChange('serviceRequired', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.serviceRequired)}
                          className={`${inputBase} ${
                            fieldErrors.serviceRequired ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]' : 'border-black/15'
                          }`}
                        >
                          <option value="">Select a service</option>
                          {SERVICES.map((service) => (
                            <option key={service.slug} value={service.title}>
                              {service.number}. {service.title}
                            </option>
                          ))}
                          <option value="Full-Service Retainer">
                            Full-Service Agency Retainer
                          </option>
                        </select>
                        {fieldErrors.serviceRequired && (
                          <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                            {fieldErrors.serviceRequired}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-xs font-semibold text-[#090909]"
                        >
                          Estimated Budget <span aria-hidden="true">*</span>
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          required
                          value={values.budget}
                          onChange={(e) => handleChange('budget', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.budget)}
                          className={`${inputBase} ${
                            fieldErrors.budget ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]' : 'border-black/15'
                          }`}
                        >
                          <option value="">Select estimated budget</option>
                          {BUDGET_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.budget && (
                          <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                            {fieldErrors.budget}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="projectDescription"
                        className="block text-xs font-semibold text-[#090909]"
                      >
                        Project Description <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="projectDescription"
                        name="projectDescription"
                        rows={4}
                        required
                        value={values.projectDescription}
                        onChange={(e) =>
                          handleChange('projectDescription', e.target.value)
                        }
                        aria-invalid={Boolean(fieldErrors.projectDescription)}
                        placeholder="Share your objectives, timeline, target audience, or deliverables needed..."
                        className={`${inputBase} ${
                          fieldErrors.projectDescription
                            ? 'border-[#FF4F17] ring-1 ring-[#FF4F17]'
                            : 'border-black/15'
                        }`}
                      />
                      {fieldErrors.projectDescription && (
                        <p className="mt-1 text-xs font-medium text-[#FF4F17]">
                          {fieldErrors.projectDescription}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="rounded-full bg-[#FF4F17] px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-[#e54310]">
                        {submitting ? 'Sending Enquiry...' : 'Send Project Enquiry'}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4F17] text-white transition-transform group-hover:translate-x-0.5 group-hover:bg-[#e54310]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
