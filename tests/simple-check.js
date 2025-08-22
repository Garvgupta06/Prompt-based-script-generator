// tests/simple-check.js - Simplest possible test
console.log("✅ Node.js is working!");
console.log("Testing basic file access...");

const fs = require('fs');
const path = require('path');

// Check if package.json exists
try {
  const packageJson = fs.readFileSync('package.json', 'utf8');
  console.log("✅ package.json exists and can be read");
} catch (error) {
  console.log("❌ Cannot read package.json:", error.message);
}

// Check if .env exists
try {
  const envFile = fs.readFileSync('.env', 'utf8');
  console.log("✅ .env file exists");
  
  // Check if API key is in .env
  if (envFile.includes('OPENROUTER_API_KEY')) {
    console.log("✅ OPENROUTER_API_KEY found in .env");
  } else {
    console.log("❌ OPENROUTER_API_KEY not found in .env");
  }
} catch (error) {
  console.log("❌ Cannot read .env file:", error.message);
}

console.log("Basic check completed!");