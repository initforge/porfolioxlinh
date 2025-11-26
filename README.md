# Portfolio Website

A modern, interactive portfolio website built with Next.js, Three.js, and Firebase.

## Features

- 🎨 Modern design with black & white theme
- 🎭 Three.js 3D effects and animations
- 📱 Fully responsive
- 🔐 Admin dashboard for content management
- 🚀 Fast performance with Next.js
- ☁️ Firebase for data storage
- 🖼️ Cloudinary for image management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Fill in your Firebase and Cloudinary credentials
```

3. Generate admin password hash:
```bash
node scripts/generate-password-hash.js
# Or manually: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash))"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Xem file [DEPLOY.md](./DEPLOY.md) để biết hướng dẫn chi tiết deploy lên Vercel.

### Quick Deploy to Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm environment variables (xem DEPLOY.md)
4. Deploy!

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Three.js + React Three Fiber
- GSAP + Framer Motion
- Tailwind CSS
- Firebase (Firestore)
- Cloudinary

## Project Structure

See the plan file for detailed structure.

