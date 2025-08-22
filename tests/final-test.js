// tests/final-test.js - Final comprehensive test
require('dotenv').config();

async function runTest() {
  console.log("🧪 Running final comprehensive test...");

  // Check if API key is available
  if (!process.env.OPENROUTER_API_KEY) {
    console.log("❌ OPENROUTER_API_KEY not found in .env file");
    console.log("💡 Make sure your .env file has: OPENROUTER_API_KEY=your_actual_key");
    process.exit(1);
  }

  console.log("✅ OPENROUTER_API_KEY found in environment");

  try {
    // Test 1: Load all modules
    const LLMIntegration = require('../src/llm');
    const { PRESET_TYPES } = require('../src/utils/constants');
    
    console.log("✅ All modules loaded successfully");

    // Test 2: Create LLM integration instance
    const llm = new LLMIntegration(
      process.env.OPENROUTER_API_KEY,
      'openai/gpt-3.5-turbo', // Model in quotes!
      './templates'
    );
    
    console.log("✅ LLMIntegration instance created");

    // Test 3: Initialize
    await llm.initialize();
    console.log("✅ LLM integration initialized");

    // Test 4: Test with a simple prompt (this will make actual API call)
    console.log("⏳ Testing with actual API call...");
    const components = await llm.generateSiteComponents(
      "Create a simple landing page for a coffee shop called 'Java Heaven'",
      PRESET_TYPES.LANDING_PAGE
    );

    console.log("✅ API call successful!");
    console.log(`📄 HTML generated: ${components.html.length} characters`);
    console.log(`🎨 CSS generated: ${components.css.length} characters`);
    console.log(`⚡ JS generated: ${components.js.length} characters`);

    // Show preview
    console.log("\n--- HTML Preview (first 150 chars) ---");
    console.log(components.html.substring(0, 150) + '...');

    console.log("\n🎉 SUCCESS! Everything is working correctly!");
    console.log("Your OpenRouter integration is ready to use!");

  } catch (error) {
    console.log("❌ Final test failed:", error.message);
    
    if (error.message.includes('API') || error.message.includes('OpenRouter')) {
      console.log("💡 This might be an API issue. Check:");
      console.log("   - Your OpenRouter API key is valid");
      console.log("   - You have credits in your OpenRouter account");
      console.log("   - Your internet connection is working");
    }
    
    process.exit(1);
  }
}

// Run the test
runTest();
