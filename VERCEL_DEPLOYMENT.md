# 🐳 Vercel Deployment Guide - email.in

## 🚀 **Step-by-Step Deployment**

### **Prerequisites:**
- ✅ Vercel account (sign up di vercel.com)
- ✅ GitHub/GitLab/Bitbucket account
- ✅ Production database (PlanetScale/Supabase recommended)

---

## 📋 **Step 1: Setup Production Database**

### **Option A: PlanetScale (Recommended for MySQL)**
```bash
# 1. Sign up di https://planetscale.com/
# 2. Create new database
# 3. Get connection string
# Format: mysql://xxxxx@us-east.connect.psdb.cloud/dbname?ssl={"rejectUnauthorized":false}
```

### **Option B: Supabase (PostgreSQL)**
```bash
# 1. Sign up di https://supabase.com/
# 2. Create new project
# 3. Get connection string
# Format: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

---

## 📋 **Step 2: Prepare Code for Production**

### **Update Prisma Schema:**
```bash
# Replace schema.prisma dengan production version
cp prisma/schema.production.prisma prisma/schema.prisma

# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push
```

### **Install Vercel CLI:**
```bash
npm install -g vercel
```

---

## 📋 **Step 3: Deploy to Vercel**

### **Method A: GitHub Integration (Recommended)**
```bash
# 1. Push code ke GitHub
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. Connect Vercel ke GitHub
# - Login ke Vercel dashboard
# - Click "New Project"
# - Import dari GitHub
# - Configure settings
```

### **Method B: Vercel CLI**
```bash
# 1. Login ke Vercel
vercel login

# 2. Deploy dari project folder
cd /home/z/my-project
vercel --prod

# 3. Follow prompts:
# - Link ke existing project? N
# - Project name? email-in
# - Directory? ./
# - Override settings? N
```

---

## 📋 **Step 4: Configure Environment Variables**

### **Di Vercel Dashboard:**
1. Go ke Project → Settings → Environment Variables
2. Add variables berikut:

```env
DATABASE_URL=mysql://user:pass@host:3306/dbname
NEXTAUTH_URL=https://your-app.vercel.app
NODE_ENV=production
```

### **Critical Variables:**
- `DATABASE_URL`: Production database connection
- `NEXTAUTH_URL`: Your Vercel app URL
- `NODE_ENV`: production

---

## 📋 **Step 5: Post-Deployment Setup**

### **Test Health Endpoint:**
```bash
curl https://your-app.vercel.app/api/health
```

### **Verify Database:**
```bash
# Check jika tables terbuat
npx prisma db pull --print
```

### **Test Email Functionality:**
1. Login dengan Gmail credentials
2. Test kirim email
3. Test upload file ke cloud storage
4. Test semua features

---

## 🔧 **Production Considerations**

### **File Storage:**
- **Vercel Limit**: Tidak ada persistent storage
- **Solution**: Cloud storage (AWS S3, Cloudinary, Vercel Blob)
- **Current**: Files akan hilam setiap deployment

### **Database Limits:**
- **PlanetScale Free**: 5GB storage, 1B rows/month
- **Supabase Free**: 500MB storage, 60k connections/month
- **Upgrade**: $20-50/month untuk production

### **Email Service:**
- **Gmail SMTP**: Tetap works di production
- **Rate Limits**: Gmail punya sending limits
- **Alternative**: SendGrid, Mailgun untuk high volume

---

## 🎯 **Deployment Commands Quick Reference**

```bash
# Development
npm run dev

# Production Build Test
npm run build
npm start

# Deploy ke Vercel
vercel --prod

# Database operations
npx prisma generate
npx prisma db push
npx prisma studio
```

---

## 🚨 **Troubleshooting**

### **Common Issues:**
1. **Build Error**: Check `next.config.ts` settings
2. **Database Error**: Verify `DATABASE_URL` format
3. **API Error**: Check function timeouts (max 30s)
4. **File Upload Error**: Use cloud storage solution

### **Logs:**
```bash
# Vercel logs
vercel logs

# Local testing
npm run build
npm start
```

---

## 📞 **Support**

Jika ada issues deployment:
1. Check Vercel dashboard logs
2. Verify environment variables
3. Test dengan production build locally
4. Contact Vercel support jika perlu

**Selamat deployment! 🎉**