# Vercel Deployment Guide

## 🚀 Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub, Google, or email
3. Verify your account

### Step 2: Deploy via Dashboard
1. Push your code to GitHub (if not already done)
2. Go to Vercel Dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables
In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
BACKEND_URL=http://YOUR_ECS_PRIVATE_IP:3001
```

**To get your ECS private IP:**
1. SSH to your EC2 instance
2. Run: `docker inspect <CONTAINER_ID> | grep IPAddress`
3. Use that IP address

### Step 4: Test Your API
Your frontend will now call `/api/guests` which will:
1. Be handled by Vercel Functions
2. Proxy to your private ECS backend
3. Return the response to your frontend

## 🔧 How It Works

- **Frontend**: Deployed on Vercel (FREE)
- **API Proxy**: Vercel Functions (FREE)
- **Backend**: Your private ECS instance (no load balancer needed)
- **Total Cost**: $0/month 🎉

## 📝 API Endpoints

- **GET /api/guests** - Get all guests
- **POST /api/guests** - Create new guest
- **Any other /api/* routes** - Automatically proxied to your backend
