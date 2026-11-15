import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

interface EnquiryPayload {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  budget: string;
  projectDescription: string;
}

interface StoredEnquiry extends EnquiryPayload {
  referenceId: string;
  submittedAt: string;
  emailDispatched: boolean;
}

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s()-]{7,24}$/;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function validateEnquiry(body: Record<string, unknown>): {
  data?: EnquiryPayload;
  errors?: Record<string, string>;
} {
  const fullName = sanitizeText(body.fullName, 120);
  const companyName = sanitizeText(body.companyName, 140);
  const email = sanitizeText(body.email, 160).toLowerCase();
  const phone = sanitizeText(body.phone, 40);
  const serviceRequired = sanitizeText(body.serviceRequired, 120);
  const budget = sanitizeText(body.budget, 80);
  const projectDescription = sanitizeText(body.projectDescription, 3000);

  const errors: Record<string, string> = {};

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (companyName.length < 2) {
    errors.companyName = 'Please enter your company or brand name.';
  }
  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!PHONE_REGEX.test(phone)) {
    errors.phone = 'Please enter a valid contact phone number.';
  }
  if (!serviceRequired) {
    errors.serviceRequired = 'Please select the primary service required.';
  }
  if (!budget) {
    errors.budget = 'Please select an estimated budget range.';
  }
  if (projectDescription.length < 15) {
    errors.projectDescription =
      'Please share a brief overview of your project (at least 15 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      fullName,
      companyName,
      email,
      phone,
      serviceRequired,
      budget,
      projectDescription,
    },
  };
}

async function persistEnquiry(record: StoredEnquiry): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let existing: StoredEnquiry[] = [];

  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }

  existing.unshift(record);
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

async function sendEnquiryEmail(record: StoredEnquiry): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return false;
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE !== 'false';
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'hello@funmedia.com.np';

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; background:#090909; color:#ffffff; padding:24px;">
      <h2 style="color:#FF7417; margin:0 0 12px;">New Funmedia Project Enquiry (${escapeHtml(record.referenceId)})</h2>
      <p style="color:#B5B5B5; margin:0 0 20px;">Submitted on ${escapeHtml(record.submittedAt)}</p>
      <table style="width:100%; border-collapse:collapse; max-width:640px;">
        <tr><td style="padding:8px 0; color:#B5B5B5;">Full Name</td><td style="padding:8px 0;">${escapeHtml(record.fullName)}</td></tr>
        <tr><td style="padding:8px 0; color:#B5B5B5;">Company</td><td style="padding:8px 0;">${escapeHtml(record.companyName)}</td></tr>
        <tr><td style="padding:8px 0; color:#B5B5B5;">Email</td><td style="padding:8px 0;">${escapeHtml(record.email)}</td></tr>
        <tr><td style="padding:8px 0; color:#B5B5B5;">Phone</td><td style="padding:8px 0;">${escapeHtml(record.phone)}</td></tr>
        <tr><td style="padding:8px 0; color:#B5B5B5;">Service Required</td><td style="padding:8px 0;">${escapeHtml(record.serviceRequired)}</td></tr>
        <tr><td style="padding:8px 0; color:#B5B5B5;">Estimated Budget</td><td style="padding:8px 0;">${escapeHtml(record.budget)}</td></tr>
      </table>
      <div style="margin-top:20px; padding:16px; background:#151515; border:1px solid #262626;">
        <strong style="color:#FF7417; display:block; margin-bottom:8px;">Project Description</strong>
        <p style="margin:0; white-space:pre-wrap; line-height:1.6;">${escapeHtml(record.projectDescription)}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Funmedia Website" <${user}>`,
    to: recipient,
    replyTo: record.email,
    subject: `[Funmedia Enquiry ${record.referenceId}] ${record.companyName} — ${record.serviceRequired}`,
    text: `Reference: ${record.referenceId}\nName: ${record.fullName}\nCompany: ${record.companyName}\nEmail: ${record.email}\nPhone: ${record.phone}\nService: ${record.serviceRequired}\nBudget: ${record.budget}\n\nProject Description:\n${record.projectDescription}`,
    html,
  });

  return true;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'funmedia-web' });
  });

  app.post('/api/enquiries', async (req: Request, res: Response) => {
    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<
      string,
      unknown
    >;

    const { data, errors } = validateEnquiry(body);
    if (errors || !data) {
      res.status(400).json({
        success: false,
        message: 'Please review the highlighted fields and try again.',
        errors,
      });
      return;
    }

    const referenceId = `FM-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    let emailDispatched = false;
    try {
      const tempRecord: StoredEnquiry = {
        ...data,
        referenceId,
        submittedAt,
        emailDispatched: false,
      };
      emailDispatched = await sendEnquiryEmail(tempRecord);
      await persistEnquiry({
        ...tempRecord,
        emailDispatched,
      });

      res.status(201).json({
        success: true,
        referenceId,
        emailDispatched,
        message:
          'Thank you. Your project enquiry has been received by the Funmedia team.',
      });
    } catch (error) {
      console.error('Failed to process project enquiry:', error);
      res.status(500).json({
        success: false,
        message:
          'We could not submit your enquiry right now. Please try again or email hello@funmedia.com.np directly.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir, { maxAge: '7d' }));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Funmedia server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
