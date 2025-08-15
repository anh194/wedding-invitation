// Simple test function to verify Vercel API is working
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Test API function is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
