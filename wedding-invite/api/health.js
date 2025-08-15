// Specific health endpoint function
export default async function handler(req, res) {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const fullBackendUrl = `${backendUrl}/health`;
    
    console.log(`🔍 Health check - Proxying to: ${fullBackendUrl}`);
    
    const response = await fetch(fullBackendUrl);
    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Health check failed',
      error: error.message
    });
  }
}
