# Funmedia — Hostinger Production & Deployment Guide

This website is a full-stack React + TypeScript + Vite frontend paired with a lightweight Express (`server.ts`) backend for handling contact enquiry validation, persistent enquiry logging, and SMTP email delivery.

---

## 1. Recommended Hosting Option on Hostinger

Because the contact form (`POST /api/enquiries`) runs on Node.js (`server.ts`) to keep SMTP credentials off the browser and persist enquiries safely:

- **Recommended Plan**: **Hostinger Node.js Web Hosting (Business / Cloud)** or **Hostinger VPS (Ubuntu + Node.js 22+ / PM2 / Nginx)**.
- **Node.js Version**: `22.x` or newer (supports native `node server.ts` execution).

---

## 2. Environment Variables (`.env`)

Copy `.env.example` to `.env` on your Hostinger server and configure your SMTP credentials (never commit `.env` to Git):

```env
NODE_ENV=production
PORT=3000

# Hostinger Email (Titan / Hostinger Mail) SMTP settings
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@funmedia.com.np
SMTP_PASS=YOUR_MAILBOX_PASSWORD
CONTACT_RECIPIENT_EMAIL=hello@funmedia.com.np
```

When `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are configured, every validated enquiry sent through `/contact` is:
1. Validated and sanitized server-side.
2. Saved to `data/enquiries.json` with a unique `FM-XXXXXX` reference ID.
3. Emailed directly to `hello@funmedia.com.np` with `Reply-To` set to the client's email address.

---

## 3. Build & Run Commands

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Build the production frontend (`dist/`)**:
   ```bash
   npm run build
   ```
3. **Start the production server**:
   ```bash
   npm start
   ```
   (`npm start` runs `NODE_ENV=production node server.ts`, serving the optimized `dist/` bundle, handling SPA routes, and exposing `/api/enquiries`.)

---

## 4. Hostinger VPS Setup (Nginx + PM2)

1. Point your domain DNS (`A` record) to your Hostinger VPS IP.
2. Install Node.js 22+ and PM2 (`npm install -g pm2`).
3. Run `npm install && npm run build`.
4. Start the app with PM2:
   ```bash
   pm2 start npm --name "funmedia" -- start
   pm2 save
   ```
5. Configure Nginx as a reverse proxy forwarding port `80/443` to `http://127.0.0.1:3000` and enable SSL via Certbot.

---

## 5. Updating Portfolio, Services, or Social Links

All website content is organized in clean TypeScript modules:
- **Portfolio Projects**: `src/data/projects.ts`
- **Services & Deliverables**: `src/data/services.ts`
- **Industries**: `src/data/industries.ts`
- **Contact Email & Social Links**: `src/data/site.ts`

After updating content files, run `npm run build` and restart the server (`pm2 restart funmedia`).
