# Golf Charity Subscription Platform

A production-ready starter for a subscription-based golf platform that combines score tracking, monthly prize draws, and charity contributions.

## Features

### Subscriber
- Sign up and log in
- Track latest 5 Stableford scores
- Choose charity contribution percentage
- View dashboard summary
- Upload winner proof

### Admin
- Separate admin dashboard
- Role-based route protection
- Draw publishing endpoint
- Winner verification workflow starter

## Tech stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- JWT auth with bcrypt
- Zod validation
- Stripe checkout starter

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables
Use the values from `.env.example`.

## Notes
- This starter includes the core schema, auth flow, score retention logic, and Stripe checkout creation.
- You still need to connect real Stripe price IDs, storage for proof uploads, and any final deployment secrets.
