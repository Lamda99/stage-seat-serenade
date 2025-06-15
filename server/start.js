
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting theater booking backend server...');
console.log('MongoDB URI configured:', process.env.MONGODB_URI ? 'Yes' : 'No');

// Start the server
const serverProcess = spawn('node', ['server.js'], {
  cwd: path.join(__dirname),
  stdio: 'inherit',
  env: { ...process.env }
});

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down server...');
  serverProcess.kill('SIGTERM');
  process.exit(0);
});
