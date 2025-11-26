# Deployment Guide - Vercel

Hướng dẫn deploy portfolio website lên Vercel.

## Bước 1: Chuẩn bị Firebase Config

1. Vào [Firebase Console](https://console.firebase.google.com)
2. Chọn project của bạn
3. Vào **Project Settings** > **General**
4. Scroll xuống phần **Your apps** > chọn Web app (hoặc tạo mới)
5. Copy các giá trị sau:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Bước 2: Setup Cloudinary

Bạn đã có:
- **Cloud Name**: `dghawsj8e`
- **API Key**: `872237255328765`
- **API Secret**: `AeKphmHpQi6c1sW2nIxOR_0mlz8`

## Bước 3: Generate Admin Password Hash

Chạy lệnh sau để tạo password hash:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password-here', 10).then(hash => console.log(hash))"
```

Thay `your-password-here` bằng password bạn muốn dùng cho admin dashboard.

## Bước 4: Tạo file .env.local (cho local development)

Tạo file `.env.local` trong root folder với nội dung:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_from_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dghawsj8e
CLOUDINARY_API_KEY=872237255328765
CLOUDINARY_API_SECRET=AeKphmHpQi6c1sW2nIxOR_0mlz8

# Admin Authentication
ADMIN_PASSWORD_HASH=your_generated_password_hash
NEXTAUTH_SECRET=generate_random_string_here

# Site URL (sẽ update sau khi deploy)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Bước 5: Push lên GitHub

1. Tạo repository mới trên GitHub
2. Push code lên:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

## Bước 6: Deploy lên Vercel

### Cách 1: Deploy qua Vercel Dashboard

1. Vào [Vercel](https://vercel.com) và đăng nhập
2. Click **Add New Project**
3. Import repository từ GitHub
4. Trong phần **Environment Variables**, thêm các biến sau:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY = [từ Firebase Console]
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = [từ Firebase Console]
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = [từ Firebase Console]
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = [từ Firebase Console]
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = [từ Firebase Console]
   NEXT_PUBLIC_FIREBASE_APP_ID = [từ Firebase Console]
   
   CLOUDINARY_CLOUD_NAME = dghawsj8e
   CLOUDINARY_API_KEY = 872237255328765
   CLOUDINARY_API_SECRET = AeKphmHpQi6c1sW2nIxOR_0mlz8
   
   ADMIN_PASSWORD_HASH = [password hash đã generate]
   NEXTAUTH_SECRET = [random string, có thể dùng: openssl rand -base64 32]
   NEXT_PUBLIC_SITE_URL = https://your-project.vercel.app
   ```

5. Click **Deploy**

### Cách 2: Deploy qua Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Thêm environment variables:
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add ADMIN_PASSWORD_HASH
vercel env add NEXTAUTH_SECRET
vercel env add NEXT_PUBLIC_SITE_URL
```

5. Deploy production:
```bash
vercel --prod
```

## Bước 7: Update Site URL

Sau khi deploy xong, update `NEXT_PUBLIC_SITE_URL` trong Vercel environment variables với URL thực tế của bạn.

## Bước 8: Setup Firebase Firestore

**Lưu ý quan trọng**: Code hiện tại sử dụng **Firestore Database**, không phải Realtime Database.

1. Vào Firebase Console
2. Vào **Firestore Database** (không phải Realtime Database)
3. Click **Create Database**
4. Chọn **Start in test mode** (hoặc production mode với rules phù hợp)
5. Chọn location (nên chọn gần với Vercel region)

## Bước 9: Firebase Security Rules

Thêm rules sau vào Firestore để bảo mật:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /projects/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /skills/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /services/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /socialLinks/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /personalInfo/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    match /homeConfig/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Admin write access (sẽ được handle bởi server-side auth)
    // Trong production, nên dùng Firebase Admin SDK trên server
  }
}
```

## Bước 10: Test và Setup Data

1. Truy cập website đã deploy
2. Vào `/admin` và login với password đã set
3. Thêm data:
   - Personal Info
   - Skills
   - Services
   - Social Links
   - Projects
   - Home Config

## Troubleshooting

### Lỗi Firebase không kết nối được
- Kiểm tra Firebase config trong environment variables
- Đảm bảo Firestore đã được enable
- Kiểm tra Firebase security rules

### Lỗi Cloudinary upload
- Kiểm tra Cloudinary credentials
- Đảm bảo API Secret đúng
- Kiểm tra CORS settings trong Cloudinary

### Lỗi build trên Vercel
- Kiểm tra tất cả environment variables đã được set
- Xem build logs trong Vercel dashboard
- Đảm bảo Node.js version phù hợp (18+)

## Lưu ý

- **Không commit** file `.env.local` lên GitHub
- **Không share** API secrets công khai
- Update `NEXT_PUBLIC_SITE_URL` sau khi có domain thực tế
- Sử dụng **Firestore**, không phải Realtime Database

