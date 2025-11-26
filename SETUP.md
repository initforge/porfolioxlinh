# Setup Guide

## Prerequisites

- Node.js 18+ installed
- Firebase project created
- Cloudinary account created

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Fill in your `.env.local` file with:
   - Firebase configuration (from Firebase Console)
   - Cloudinary credentials (from Cloudinary Dashboard)
   - Admin password hash (generate with bcrypt)

## Generate Admin Password Hash

To generate a password hash for admin authentication:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash))"
```

Add the output to `ADMIN_PASSWORD_HASH` in `.env.local`.

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Get your Firebase config from Project Settings
4. Add the config to `.env.local`

## Cloudinary Setup

1. Create a Cloudinary account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret from Dashboard
3. Add them to `.env.local`

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Admin Dashboard

Access the admin dashboard at `/admin` and login with your password.

## Initial Data Setup

After setting up Firebase, you'll need to create initial data:

1. Go to `/admin/personal` and add your personal information
2. Go to `/admin/skills` and add your skills
3. Go to `/admin/services` and add your services
4. Go to `/admin/social` and add your social links
5. Go to `/admin/projects` and add your projects
6. Go to `/admin/home` and configure the home page

## Project Structure

- `/src/app` - Next.js pages
- `/src/components` - React components
- `/src/lib` - Utility functions and configurations
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks
- `/src/styles` - Global styles and animations

## Features

- ✅ Three.js 3D effects
- ✅ GSAP scroll animations
- ✅ Firebase integration
- ✅ Cloudinary image upload
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Accessibility features

