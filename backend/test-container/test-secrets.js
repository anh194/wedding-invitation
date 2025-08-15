#!/usr/bin/env node

console.log('🔍 === Testing ECS Secrets ===');
console.log('');

// Test environment variables
console.log('📋 Environment Variables:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  PORT:', process.env.PORT);
console.log('');

// Test database secrets
console.log('🗄️ Database Secrets:');
console.log('  DB_HOST:', process.env.DB_HOST);
console.log('  DB_PORT:', process.env.PORT);
console.log('  DB_NAME:', process.env.DB_NAME);
console.log('  DB_USER:', process.env.DB_USER);
console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***');
console.log('');

// Test database connectivity if we have the values
if (process.env.DB_HOST && process.env.DB_PORT) {
  console.log('🔌 Testing Database Connectivity:');
  console.log('  Host:', process.env.DB_HOST);
  console.log('  Port:', process.env.DB_PORT);
  console.log('  Database:', process.env.DB_NAME);
  console.log('  User:', process.env.DB_USER);
  console.log('  Password:', process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***');
  console.log('');
  
  // Test network connectivity
  const net = require('net');
  const client = new net.Socket();
  
  client.connect(process.env.DB_PORT, process.env.DB_HOST, () => {
    console.log('✅ Network connectivity successful!');
    console.log('  Connected to:', process.env.DB_HOST + ':' + process.env.DB_PORT);
    client.destroy();
  });
  
  client.on('error', (err) => {
    console.log('❌ Network connectivity failed:', err.message);
  });
  
  client.on('close', () => {
    console.log('🔒 Connection closed');
  });
} else {
  console.log('❌ Cannot test connectivity - missing DB_HOST or DB_PORT');
}

console.log('');
console.log('⏳ Container will stay running for 1 hour...');
console.log('Use: docker exec -it <CONTAINER_ID> /bin/bash to inspect further');

// Keep container running
setTimeout(() => {
  console.log('🕐 Container timeout reached');
  process.exit(0);
}, 3600000); // 1 hour
