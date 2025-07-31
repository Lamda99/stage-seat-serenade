
require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');


console.log('🔧 Setting up theater booking backend...');

// Check if node_modules exists
if (!fs.existsSync('./node_modules')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Check environment variables
if (!process.env.MONGODB_URI) {
  console.log('⚠️ MongoDB URI not found in environment variables');
  console.log('Make sure your .env file contains MONGODB_URI');
}

console.log('🚀 Starting server...');
require('./server.js');