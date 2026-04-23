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

## Features

- Dashboard with real-time KPIs and entity performance
- Entity portfolio management
- Consolidated financial reporting
- Operations tracking with project management
- Intelligence reports and alerts
- Responsive design optimized for enterprise use
- Secure authentication and protected routes
