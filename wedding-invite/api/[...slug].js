// Vercel catch-all API function to proxy requests to your private ECS backend
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Get the backend URL from environment variable
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    
    // Get the path from the request URL
    const requestPath = req.url.replace('/api/', '');
    const apiPath = requestPath || '';
    
    // Construct the full backend URL
    const fullBackendUrl = `${backendUrl}/${apiPath}`;
    
    console.log(`🔍 Catch-all function:`);
    console.log(`- Request URL: ${req.url}`);
    console.log(`- API Path: ${apiPath}`);
    console.log(`- Backend URL: ${fullBackendUrl}`);
    
    // Forward the request to your ECS backend
    const response = await fetch(fullBackendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    // Get the response data
    const data = await response.json();

    // Return the response with the same status code
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Catch-all proxy error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}
