# Deployment Guide: Supabase Hosting

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Supabase CLI**: Install the Supabase CLI

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 2: Login to Supabase

```bash
supabase login
```

## Step 3: Create a New Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `wedding-backend` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

## Step 4: Get Project Credentials

After project creation, go to **Settings > API** and note:
- **Project URL**: `https://your-project-ref.supabase.co`
- **Project API Key**: `anon` key (public)
- **Service Role Key**: `service_role` key (private)

## Step 5: Set Up Database

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the following SQL to create your tables:

```sql
-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  team VARCHAR(10) NOT NULL CHECK (team IN ('BRIDE', 'GROOM')),
  plus_one BOOLEAN NOT NULL,
  after_party BOOLEAN NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create request_logs table
CREATE TABLE IF NOT EXISTS request_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload TEXT NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_guests_team ON guests(team);
CREATE INDEX IF NOT EXISTS idx_guests_created ON guests(created);
CREATE INDEX IF NOT EXISTS idx_request_logs_created ON request_logs(created);
```

## Step 6: Configure Environment Variables

In your Supabase project dashboard, go to **Settings > Environment Variables** and add:

```
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
DB_HOST=your-project-ref.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-database-password
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Step 7: Deploy to Supabase Hosting

1. **Connect GitHub Repository**:
   - Go to **Hosting** in your Supabase dashboard
   - Click "Connect Repository"
   - Select your GitHub repository
   - Choose the branch to deploy (usually `main` or `master`)

2. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)

3. **Environment Variables**:
   - Copy all environment variables from Step 6
   - Make sure `DB_PASSWORD` is set to your actual database password

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete

## Step 8: Update Frontend Configuration

Update your frontend's backend URL to point to your Supabase Hosting URL:

```typescript
// In your frontend App.tsx
const backendUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/api/guests'
  : 'https://your-project-ref.supabase.co/api/guests';
```

## Step 9: Test Your Deployment

1. **Health Check**: Visit `https://your-project-ref.supabase.co/health`
2. **API Test**: Test your guest creation endpoint
3. **Database**: Check if data is being saved in Supabase dashboard

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check build logs in Supabase dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Database Connection Issues**:
   - Verify environment variables are set correctly
   - Check if database tables exist
   - Ensure database password is correct

3. **CORS Issues**:
   - Update `CORS_ORIGIN` to your actual frontend domain
   - Check if frontend URL is correct

### Useful Commands:

```bash
# Check Supabase status
supabase status

# View logs
supabase logs

# Restart deployment
# (Use Supabase dashboard)
```

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up CI/CD pipeline
4. Deploy frontend and connect to backend

## Support

- **Supabase Documentation**: [docs.supabase.com](https://docs.supabase.com)
- **Community**: [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
- **Discord**: [discord.supabase.com](https://discord.supabase.com)

