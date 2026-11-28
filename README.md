# Wishes Bank LTD — Frontend Application Documentation

This directory contains the user interface and client application for **Wishes Bank LTD**, developed using Next.js 16 with the App Router architecture.

---

## 1. Architecture & Technology Stack

- **Framework**: Next.js 16.4.6 (App Router with Turbopack)
- **UI Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v3, PostCSS, Lucide Icons
- **State Management**: Redux Toolkit (Slices + `createAsyncThunk` + native `fetch`)
- **Session Layer**: NextAuth.js / Auth.js v5 (stateless JWT session with server-side proxy token forwarder)
- **Theme System**: Dual Light / Dark themes using CSS semantic variables and `next-themes`

---

## 2. Environment Variables

Create `.env.local` based on `.env.example`:

| Variable | Description | Required | Example |
|---|---|:---:|---|
| `AUTH_SECRET` | 32+ character key for signing NextAuth sessions | Yes | `openssl rand -base64 32` |
| `NEXTAUTH_SECRET` | Legacy alias for NextAuth session verification | Yes | `same as AUTH_SECRET` |
| `NEXTAUTH_URL` | Canonical URL of the frontend deployment | Yes | `http://localhost:3000` |
| `BACKEND_URL` | Express API Gateway target for Next.js API proxy | Yes | `http://localhost:5000/api/v1` |
| `MONGODB_URI` | MongoDB connection string for NextAuth adapter | Yes | `mongodb+srv://...` |

---

## 3. Server-Side API Proxy Architecture

To maintain the highest security standards and prevent token leakage:
1. The browser **never** directly accesses or receives the backend JWT secret or master tokens.
2. The browser communicates with Next.js API route handlers located under `src/app/api/v1/*`.
3. The server-side proxy route calls `getCustomerAuthToken()`, `getStaffAuthToken()`, or `getAdminAuthToken()`, validates the active NextAuth session, signs or forwards the authenticated token securely to the Express backend (`http://localhost:5000/api/v1`), and pipes back the response.

### Proxy Route Organization
- `src/app/api/v1/customer/*` — Proxies customer requests (accounts, transfers, deposits, withdrawals, loans, repayments, statements).
- `src/app/api/v1/staff/*` — Proxies staff underwriting and approval queues.
- `src/app/api/v1/admin/*` — Proxies administrative controls, compliance adjudication, and loan disbursement.
- `src/app/api/v1/notifications/*` — Proxies notification reads, counts, and dismissals.

---

## 4. Redux Toolkit Structure

Located under `src/store/`:

- `authSlice.ts`: Manages authenticated user state and role details synchronized from NextAuth.
- `accountSlice.ts`: Manages customer depository accounts, balances, and limits.
- `transactionSlice.ts`: Manages transaction records, pagination, status filters, and receipts.
- `loanSlice.ts`: Manages loan application forms, portfolio, installments, and repayments (`repayLoanThunk`).
- `notificationSlice.ts`: Manages unread badge count, live dropdown items, and history list.
- `staffSlice.ts`: Manages staff queues, customer lookups, request reviews, and loan notes.
- `adminSlice.ts`: Manages administrative analytics, flagged compliance items, staff approvals, and loan disbursements.

---

## 5. Theme Configuration

The application strictly complies with Wishes Bank's visual guidelines:
- **Light Theme**: Clean, genuine light surfaces with white card backgrounds (`bg-card`), dark charcoal primary text (`text-foreground`), muted secondary text, subtle grey borders (`border-border`), and primary emerald accents.
- **Dark Theme**: Deep neutral surfaces with accessible contrast ratios.
- **Theme Switching**: Managed globally via `ThemeToggle.tsx` and persisted in `localStorage`.

---

## 6. Development & Production Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack (Port 3000)
npm run dev

# Run TypeScript typecheck without emitting files
npx tsc --noEmit

# Build production application
npm run build

# Start production server
npm start
```
