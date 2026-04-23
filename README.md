# Atlas - Enterprise OS

A comprehensive SaaS application for managing multi-entity business operations, built with React, Express, and Supabase.

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + React Router + Zustand + Recharts
- **Backend**: Node.js + Express + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Setup

1. Clone the repository
2. Set up Supabase project and database
3. Create the required tables (see database schema below)
4. Install dependencies for both client and server
5. Configure environment variables
6. Run the seed script
7. Start the development servers

### Database Schema

Create these tables in your Supabase database:

#### entities

```sql
CREATE TABLE entities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  color TEXT NOT NULL,
  ceo TEXT NOT NULL,
  employees INTEGER NOT NULL,
  founded INTEGER NOT NULL,
  hq TEXT NOT NULL,
  status TEXT NOT NULL,
  monthly_revenue BIGINT NOT NULL,
  monthly_expenses BIGINT NOT NULL,
  monthly_net_profit BIGINT NOT NULL,
  profit_margin DECIMAL NOT NULL,
  ytd_revenue BIGINT NOT NULL,
  sparkline INTEGER[] NOT NULL,
  active_projects INTEGER NOT NULL,
  open_alerts INTEGER NOT NULL
);
```

#### group_totals

```sql
CREATE TABLE group_totals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_revenue BIGINT NOT NULL,
  total_expenses BIGINT NOT NULL,
  total_net_profit BIGINT NOT NULL,
  profit_margin DECIMAL NOT NULL,
  total_headcount INTEGER NOT NULL,
  total_active_projects INTEGER NOT NULL,
  total_open_alerts INTEGER NOT NULL,
  entities_at_risk INTEGER NOT NULL
);
```

#### alerts

```sql
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  entity TEXT NOT NULL,
  message TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### activity

```sql
CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  entity TEXT NOT NULL,
  action TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### projects

```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  entity TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  budget BIGINT NOT NULL,
  spend BIGINT NOT NULL,
  remaining BIGINT NOT NULL,
  complete INTEGER NOT NULL,
  due TEXT NOT NULL,
  lead TEXT NOT NULL
);
```

### Installation

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Environment Variables

Copy the `.env.example` files to `.env` and fill in your Supabase credentials.

### Seeding Data

```bash
cd server
npm run seed
```

### Development

```bash
# Start the server
cd server
npm run dev

# Start the client (in another terminal)
cd client
npm run dev
```

### Build for Production

```bash
# Build client
cd client
npm run build

# Build server
cd server
npm run build
npm start
```

## Deployment

### 🚀 Vercel Deployment

#### Frontend (Client)

1. **Connect to Vercel**: Go to [vercel.com](https://vercel.com) and import `https://github.com/Linkinsims/Atlas.git`
2. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables** (required):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
   _(No separate API URL needed - everything uses Supabase directly)_
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=https://your-deployed-backend-url.com
   ```

   ```

#### Backend (Server) - Deploy Separately

**Recommended: Deploy to Railway**

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set **Root Directory**: `server`
4. **Build Command**: `npm run build`
5. **Start Command**: `npm start`
6. Environment Variables:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=5000
   ```
7. Update your Vercel `VITE_API_URL` with the Railway URL

#### Alternative: Deploy Backend to Vercel

1. Create separate Vercel project for server
2. Set **Root Directory**: `server`
3. **Build Command**: `npm run build`
4. **Start Command**: `npm start`
5. Add same environment variables

### Troubleshooting Common Issues

#### ❌ "Failed to load resource: the server responded with a status of 404" for API calls

**Cause**: `VITE_API_URL` environment variable not set in Vercel
**Solution**: Add `VITE_API_URL=https://your-backend-url.com` to Vercel environment variables

#### ❌ "SyntaxError: Unexpected token 'T', "The page c"... is not valid JSON"

**Cause**: API returning HTML (404 page) instead of JSON
**Solution**: Ensure backend is deployed and `VITE_API_URL` points to correct backend URL

#### ❌ "Failed to load resource: the server responded with a status of 429"

**Cause**: Rate limiting from Supabase or backend
**Solution**: Check Supabase dashboard for usage limits, or add retry logic

#### ❌ Font loading errors (QUIC_PROTOCOL_ERROR)

**Cause**: Google Fonts CDN issues
**Solution**: Usually resolves automatically, or switch to local fonts

#### ❌ Missing vite.svg

**Solution**: Already fixed in this repository

## Features

- Dashboard with real-time KPIs and entity performance
- Entity portfolio management
- Consolidated financial reporting
- Operations tracking with project management
- Intelligence reports and alerts
- Responsive design optimized for enterprise use
- Secure authentication and protected routes
