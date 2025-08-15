// Vercel API function to proxy ALL requests to your private ECS backend
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
    console.log("Backend URL:", backendUrl);
    
    // Get the path from the request URL instead of query params
    const requestPath = req.url.replace('/api/', '');
    const apiPath = requestPath || '';
    
    // Construct the full backend URL
    const fullBackendUrl = `${backendUrl}/${apiPath}`;
    
    console.log(`🔍 Debug Info:`);
    console.log(`- Original path: ${req.url}`);
    console.log(`- Query path: ${JSON.stringify(path)}`);
    console.log(`- apiPath: "${apiPath}"`);
    console.log(`- backendUrl: ${backendUrl}`);
    console.log(`- fullBackendUrl: ${fullBackendUrl}`);
    console.log(`Proxying request to: ${fullBackendUrl}`);
    
    // Forward the request to your ECS backend
    const response = await fetch(fullBackendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward any other headers if needed
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    // Get the response data
    const data = await response.json();

    // Return the response with the same status code
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}
