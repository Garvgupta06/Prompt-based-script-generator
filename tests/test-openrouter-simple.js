// tests/test-openrouter-simple.js - Simple OpenRouter test
console.log("Testing OpenRouter client...");

try {
  const OpenRouterClient = require('../src/llm/openrouter-client');
  console.log("✅ OpenRouterClient module loaded");
  
  // Just test creating an instance, not making API calls
  const client = new OpenRouterClient('test-api-key');
  console.log("✅ OpenRouterClient instance created");
  
  console.log("OpenRouter client test passed!");
  
} catch (error) {
  console.log("❌ OpenRouter client test failed:", error.message);
  console.log("Error details:", error.stack);
}