# 📋 cPanel Deployment Guide

## ⚠️ **Important Notes About cPanel**

cPanel hosting memiliki beberapa keterbatasan untuk aplikasi Next.js seperti email.in:

### 🔴 **Tidak Kompatibel:**
- **Custom Server (server.ts)** - cPanel tidak support custom Node.js server
- **Socket.IO** - Membutuhkan WebSocket server khusus
- **SQLite file-based** - Permission issues di shared hosting
- **Local file uploads** - Restricted file system access

### 🟡 **Perlu Modifikasi Besar:**
- Database ke MySQL/PostgreSQL
- File storage ke cloud (AWS S3, dll)
- Remove Socket.IO dependency
- Standar Next.js deployment

## 🚀 **Hosting Alternatives yang Lebih Baik**

### **1. VPS (Recommended)**
```bash
# Example deployment di DigitalOcean/Vultr
# 1. Setup server
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Clone dan deploy
git clone your-repo
cd email.in
npm install
npm run build
npm start

# 3. Setup dengan PM2 untuk production
npm install -g pm2
pm2 start server.ts --name emailin
```

### **2. Vercel (Easiest)**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Setup environment variables di Vercel dashboard
```

### **3. Railway (Good Alternative)**
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login dan deploy
railway login
railway init
railway up
```

## 🛠️ **Jika Tetap Ingin cPanel**

### **Step 1: Modifikasi Aplikasi**
```typescript
// Hapus server.ts, gunakan standar Next.js
// next.config.ts - remove custom server config
// package.json - update scripts
```

### **Step 2: Database Migration**
```prisma
// prisma/schema.prisma
datasource db {
  provider = "mysql" // ganti dari sqlite
  url      = env("DATABASE_URL")
}
```

### **Step 3: File Storage**
```typescript
// Ganti local storage ke cloud
// AWS S3, Cloudinary, atau cPanel file manager
```

### **Step 4: Environment Setup**
```bash
# Di cPanel Node.js Selector
# Setup .env dengan database MySQL
# Set folder permissions untuk uploads
```

## 💰 **Biaya Comparison**

| Hosting Type | Setup Difficulty | Monthly Cost | Performance | Recommendation |
|--------------|------------------|---------------|--------------|----------------|
| cPanel | 🔴 Sangat Sulit | $5-15 | 🟡 Terbatas | ❌ Tidak Direkomendasikan |
| VPS | 🟢 Mudah | $6-20 | 🟢 Tinggi | ✅ Direkomendasikan |
| Vercel | 🟢 Sangat Mudah | $0-20 | 🟢 Tinggi | ✅ Direkomendasikan |
| Railway | 🟢 Mudah | $5-20 | 🟢 Tinggi | ✅ Direkomendasikan |

## 🎯 **Rekomendasi Final**

### **Untuk Kemudahan: Vercel**
- Free tier untuk testing
- Deploy dengan 1 command
- Auto SSL dan CDN
- Tidak perlu manage server

### **Untuk Kontrol Penuh: VPS**
- DigitalOcean/Vultr $6/bulan
- Full control atas environment
- Bisa install custom software
- Scale sesuai kebutuhan

### **Hanya cPanel Jika:**
- Sudah ada hosting aktif
- Provider support Node.js terbaru
- Siap untuk modifikasi kode kompleks

## 📞 **Deployment Help**

Jika butuh bantuan deployment:
1. Pilih hosting provider (Vercel recommended)
2. Saya akan buat deployment guide spesifik
3. Setup environment variables
4. Test production deployment

Aplikasi ini production-ready, hanya perlu hosting yang tepat! 🚀