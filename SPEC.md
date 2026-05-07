# Nametag Restaurant System - SPEC

## Overview
Modern nametag generator for restaurant staff with registration, CMS, and CSV export.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- JSON file storage (simple, no DB needed)
- html2canvas + jsPDF for export

## Project Structure

```
nametag-system/
├── app/
│   ├── page.tsx              # Landing page
│   ├── register/page.tsx     # Staff registration form
│   ├── admin/members/        # CMS dashboard
│   │   ├── page.tsx          # Member list
│   │   └── new/page.tsx      # Add new member
│   └── api/
│       ├── members/route.ts   # GET, POST members
│       └── export/route.ts    # CSV export
├── components/
│   ├── PhotoUpload.tsx       # Photo upload with drag & drop
│   └── NametagCard.tsx       # Nametag visual component
├── lib/
│   └── db.ts                 # JSON file database operations
└── public/
```

## Features

### 1. Public Registration (`/register`)
- Upload photo (drag & drop or click)
- Enter name, email, address
- Preview nametag before saving
- Save generates unique ID
- Download as PNG or PDF

### 2. CMS Dashboard (`/admin/members`)
- View all members in table
- Search by name or email
- Add new members
- Edit existing members
- Delete members
- Export all data to CSV

### 3. Nametag Design
- Blue gradient card
- Circular photo on left
- Name, email, address on right
- Available in 3 sizes: sm, md, lg

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/members | List all members |
| POST | /api/members | Create new member |
| GET | /api/export | Download CSV |

## Data Model

```typescript
interface Member {
  id: string
  name: string
  email: string
  address: string
  photo: string  // base64
  createdAt: string
  updatedAt: string
}
```

## Setup Instructions

1. Clone repo
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000

## Deployment (Vercel)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

No environment variables needed - data stored in JSON file.