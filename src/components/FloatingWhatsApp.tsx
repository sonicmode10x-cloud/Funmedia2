import { SITE_CONFIG } from '../data/site';
import { trackEvent } from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsapp';

export function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl('Hello Funmedia, I would like to make an enquiry.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Enquire on WhatsApp at ${SITE_CONFIG.whatsappDisplay}`}
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      className="group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#090909] p-1.5 pr-1.5 text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] ring-1 ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:ring-[#25D366]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-6 sm:bottom-6 sm:pr-4"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.34.14 11.91c0 2.1.55 4.15 1.59 5.95L0 24l6.31-1.65a11.9 11.9 0 0 0 5.75 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.47-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.84 9.84 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7.01c0 5.46-4.45 9.88-9.9 9.88Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </span>
      <span className="hidden flex-col text-left leading-tight sm:flex">
        <span className="text-[10px] font-bold tracking-wider text-white/65 uppercase">
          WhatsApp Enquiries
        </span>
        <span className="text-xs font-bold text-white">
          {SITE_CONFIG.whatsappDisplay}
        </span>
      </span>
    </a>
  );
}
