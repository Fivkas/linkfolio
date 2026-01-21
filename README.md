# LinkFolio 🔗

LinkFolio is a full-stack application built with modern web technologies. It allows users to create a personalized public profile to showcase all their important links in one place.

visit : https://linkfolio-blue.vercel.app/

Built to demonstrate the power of **Next.js 15**, **Server Actions**, and **Prisma** with a PostgreSQL database.

## 🚀 Features

-   **User Authentication**: Secure Sign-up and Login using [Clerk](https://clerk.com/).
-   **Dashboard**: Manage your links (Create, Delete) with real-time updates.
-   **Public Profile**: A beautiful, responsive public page (`/share/[username]`) accessible to anyone.
-   **Smart Usernames**: Support for custom usernames with fallback to User IDs.
-   **Database**: Persistent data storage using PostgreSQL (via Neon) and Prisma ORM.
-   **Server Actions**: Modern data mutation without API routes.
-   **Responsive Design**: Mobile-first UI built with Tailwind CSS.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Auth**: [Clerk](https://clerk.com/)
-   **Deployment**: [Vercel](https://vercel.com/)

## ⚙️ Getting Started Locally

Follow these steps to run the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/Fivkas/linkfolio.git
cd linkfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following keys.
You will need a **Clerk** account and a **Neon (PostgreSQL)** database URL.

```env
# Database Connection (Neon/PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Setup Database

Generate the Prisma Client and push the schema to your database.

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to DB
npx prisma db push
```

### 5. Run the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
├── app/
│   ├── actions/      # Server Actions (Create, Delete links)
│   ├── dashboard/    # Protected User Dashboard
│   ├── share/        # Public Profile Pages (Dynamic Routes)
│   ├── sign-in/      # Clerk Sign In Page
│   ├── sign-up/      # Clerk Sign Up Page
│   └── page.tsx      # Landing Page
├── components/       # Reusable UI components (Forms, Buttons, Cards)
├── lib/              # Utilities & Database connection (db.ts)
├── prisma/           # Database Schema (schema.prisma)
└── public/           # Static assets
```

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the **Environment Variables** (from step 3) in Vercel Settings.
4.  **Important**: Ensure your `package.json` includes the postinstall script to generate the Prisma Client during build:
    ```json
    "scripts": {
      "postinstall": "prisma generate"
    }
    ```
5.  Deploy!