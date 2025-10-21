# Task Manager

A Next.js task management application with PostgreSQL database and Prisma ORM.

## ✨ Features

- ⚡ Built with **Next.js 15**, **React**, **TypeScript**
- 📱 Fully responsive design
- 🗄️ PostgreSQL database with Prisma ORM
- ✅ Create and manage tasks
- 🔄 Real-time updates

## Prerequisites

- Node.js 18+ 
- PostgreSQL (local installation or cloud provider)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/faninv/nextjs-task-manager.git
cd nextjs-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

#### Option A: Local PostgreSQL
```bash
# Create database
createdb task-manager

# Or using psql
psql -U postgres
CREATE DATABASE "task-manager";
```

#### Option B: Cloud PostgreSQL (Neon, Railway, Supabase)
1. Create a PostgreSQL database on your preferred provider
2. Get the connection string

### 4. Configure environment variables

Create a `.env` file in the root directory:

```bash
# For local PostgreSQL
DATABASE_URL="postgresql://postgres@localhost:5432/task-manager"

# For cloud PostgreSQL (replace with your actual URL)
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 5. Set up the database schema

```bash
# Generate Prisma client and create tables
npx prisma db push

# Or run migrations (recommended for production)
npx prisma migrate dev --name init
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS