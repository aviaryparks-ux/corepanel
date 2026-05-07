# Nametag Restaurant System

Modern nametag generator for restaurant staff with registration, CMS, and export capabilities.

## Tech Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Auth + Firestore)
- jsPDF + html2canvas for export

## Features
1. Public registration with photo upload
2. Preview nametag before generating
3. Download as PNG or PDF
4. CMS for managing members
5. Export data to CSV

## Setup
```bash
npm install
npm run dev
```

## Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```