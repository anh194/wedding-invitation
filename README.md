# Wedding Invitation System

A modern wedding invitation system with a React frontend and Node.js backend deployed on AWS.

## 🏗️ Project Structure

```
wedding/
├── backend/                 # Backend application
│   ├── src/                # Source code
│   ├── infrastructure/     # AWS CDK infrastructure (excluded from git)
│   └── Dockerfile         # Docker configuration
├── wedding-invite/        # React frontend
│   ├── src/               # React components
│   ├── api/               # Vercel API functions
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🚀 Frontend (wedding-invite/)

- **Framework**: React with TypeScript
- **Deployment**: Vercel (FREE)
- **API**: Vercel Functions as proxy to backend

## 🔧 Backend

- **Framework**: Node.js with TypeScript
- **Database**: PostgreSQL on AWS RDS
- **Deployment**: AWS ECS (Elastic Container Service)
- **Infrastructure**: AWS CDK (excluded from git for security)

## 🎯 Features

- Guest RSVP management
- Team-based guest organization
- Request logging and analytics
- Responsive design
- Real-time database updates

## 🔒 Security Notes

- Infrastructure files are excluded from git
- Database credentials managed via AWS Secrets Manager
- Private backend with Vercel Functions proxy
- No sensitive data in repository

## 📱 Getting Started

### Frontend Development
```bash
cd wedding-invite
npm install
npm start
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

## 🌐 Deployment

1. **Frontend**: Deploy to Vercel via GitHub integration
2. **Backend**: Deploy via AWS CDK (requires AWS credentials)
3. **Database**: Automatically provisioned via CDK

## 📝 Environment Variables

Frontend (Vercel):
- `BACKEND_URL`: Private ECS backend URL

Backend (ECS):
- Database credentials from AWS Secrets Manager
- Environment-specific configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Private project - All rights reserved
