# Liva Dashboard

A complete front-end-only web app built with Next.js (App Router), Tailwind CSS, featuring separate User and Admin dashboards.

## Features

### User Side
- Login page at `/login`
- Dashboard at `/dashboard` showing:
  - Hours Recorded
  - Total Earnings
  - Withdrawal Remaining
  - Available to Payout
  - Minimum Withdrawal Limit
  - Payment method selection
  - Payment request functionality with validation

### Admin Side
- Admin login at `/admin/login`
- Admin dashboard at `/admin/dashboard` showing:
  - Overall statistics (Total Users, Pending Requests, Total Paid)
  - Table of all users with payment requests
  - Approve/Reject functionality with toast notifications

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** (Icons)

## Project Structure

```
app/
  ├── login/          # User login page
  ├── dashboard/      # User dashboard
  ├── admin/
  │   ├── login/      # Admin login page
  │   └── dashboard/  # Admin dashboard
  └── layout.tsx      # Root layout
```

## Authentication

The app uses simple localStorage-based authentication for demo purposes. In a production environment, you would implement proper authentication with a backend service.

