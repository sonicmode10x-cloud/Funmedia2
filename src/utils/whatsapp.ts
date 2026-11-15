import { SITE_CONFIG } from '../data/site';

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage =
    message?.trim() ||
    'Hello Funmedia, I would like to enquire about your creative and digital marketing services.';
  return `https://wa.me/${SITE_CONFIG.whatsappDigits}?text=${encodeURIComponent(defaultMessage)}`;
}

export interface WhatsAppEnquiryDetails {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  serviceRequired?: string;
  budget?: string;
  projectDescription?: string;
  referenceId?: string;
  context?: string;
}

export function buildEnquiryWhatsAppUrl(details: WhatsAppEnquiryDetails): string {
  const lines: string[] = ['Hello Funmedia, I have a project enquiry:'];

  if (details.referenceId) lines.push(`Reference: ${details.referenceId}`);
  if (details.context) lines.push(`Topic: ${details.context}`);
  if (details.fullName?.trim()) lines.push(`Name: ${details.fullName.trim()}`);
  if (details.companyName?.trim()) lines.push(`Company: ${details.companyName.trim()}`);
  if (details.email?.trim()) lines.push(`Email: ${details.email.trim()}`);
  if (details.phone?.trim()) lines.push(`Phone: ${details.phone.trim()}`);
  if (details.serviceRequired?.trim()) lines.push(`Service: ${details.serviceRequired.trim()}`);
  if (details.budget?.trim()) lines.push(`Estimated Budget: ${details.budget.trim()}`);
  if (details.projectDescription?.trim()) {
    lines.push(`Project Details: ${details.projectDescription.trim()}`);
  }

  return getWhatsAppUrl(lines.join('\n'));
}
