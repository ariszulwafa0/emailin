#!/bin/bash

# 🚀 Vercel Deployment Script - email.in

echo "🚀 Starting Vercel deployment for email.in..."

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next

# Install missing dependencies
echo "📦 Installing missing dependencies..."
npm install critters

# Production build
echo "🔨 Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Test production server locally (optional)
    echo "🧪 Testing production build..."
    npm start &
    PID=$!
    
    sleep 3
    
    if curl -s http://localhost:3000/api/health > /dev/null; then
        echo "✅ Production health check passed!"
        kill $PID
    else
        echo "❌ Production health check failed!"
        kill $PID
        exit 1
    fi
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo ""
        echo "📋 Next steps:"
        echo "1. Setup production database (PlanetScale/Supabase)"
        echo "2. Configure environment variables in Vercel dashboard"
        echo "3. Test all functionality in production"
        echo ""
        echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
        echo "📚 Documentation: VERCEL_DEPLOYMENT.md"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi