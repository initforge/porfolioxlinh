# Quick Start Guide

Hướng dẫn nhanh để setup và deploy portfolio website.

## Thông tin đã có

✅ **Cloudinary Config:**
- Cloud Name: `dghawsj8e`
- API Key: `872237255328765`
- API Secret: `AeKphmHpQi6c1sW2nIxOR_0mlz8`

✅ **Firebase Database URL:**
- `https://porfolioxuanlinh-default-rtdb.asia-southeast1.firebasedatabase.app/`

⚠️ **Lưu ý:** Code sử dụng **Firestore Database**, không phải Realtime Database. Bạn cần enable Firestore trong Firebase Console.

## Bước 1: Lấy Firebase Config

1. Vào [Firebase Console](https://console.firebase.google.com)
2. Chọn project `porfolioxuanlinh`
3. Vào **Project Settings** (⚙️) > **General**
4. Scroll xuống **Your apps** > chọn Web app
5. Copy các giá trị:
   - `apiKey`
   - `authDomain` 
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Bước 2: Enable Firestore

1. Trong Firebase Console, vào **Firestore Database**
2. Click **Create Database**
3. Chọn **Start in test mode** (hoặc production với rules)
4. Chọn location (nên chọn `asia-southeast1` - Singapore)

## Bước 3: Tạo .env.local

Tạo file `.env.local` trong root folder:

```env
# Firebase (thay bằng giá trị từ Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=porfolioxuanlinh.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=porfolioxuanlinh
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=porfolioxuanlinh.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary (đã có)
CLOUDINARY_CLOUD_NAME=dghawsj8e
CLOUDINARY_API_KEY=872237255328765
CLOUDINARY_API_SECRET=AeKphmHpQi6c1sW2nIxOR_0mlz8

# Admin Password (generate)
ADMIN_PASSWORD_HASH=run_npm_run_generate-password
NEXTAUTH_SECRET=generate_random_string

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Bước 4: Generate Admin Password

```bash
npm run generate-password
```

Copy hash được tạo vào `ADMIN_PASSWORD_HASH` trong `.env.local`

## Bước 5: Test Local

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Bước 6: Deploy lên Vercel

1. **Push lên GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. **Deploy trên Vercel:**
   - Vào [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Thêm tất cả environment variables từ `.env.local`
   - Deploy!

3. **Update Site URL:**
   - Sau khi deploy, copy URL (ví dụ: `https://your-project.vercel.app`)
   - Update `NEXT_PUBLIC_SITE_URL` trong Vercel environment variables

## Bước 7: Setup Data

1. Truy cập `/admin` trên website đã deploy
2. Login với password đã set
3. Thêm data:
   - Personal Info
   - Skills  
   - Services
   - Social Links
   - Projects
   - Home Config

## Checklist

- [ ] Firebase config đã được thêm vào `.env.local`
- [ ] Firestore Database đã được enable
- [ ] Admin password hash đã được generate
- [ ] Code đã được push lên GitHub
- [ ] Vercel environment variables đã được set
- [ ] Website đã được deploy thành công
- [ ] Data đã được thêm qua admin dashboard

## Troubleshooting

**Lỗi Firebase connection:**
- Kiểm tra Firestore đã enable chưa
- Kiểm tra Firebase config trong environment variables

**Lỗi Cloudinary upload:**
- Kiểm tra API Secret đúng chưa
- Kiểm tra Cloud Name và API Key

**Lỗi build trên Vercel:**
- Xem build logs
- Kiểm tra tất cả environment variables đã set

