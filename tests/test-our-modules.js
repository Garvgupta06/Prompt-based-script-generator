// tests/test-our-modules.js - Test our modules one by one
console.log("Testing our modules step by step...");

// Test 1: Constants
try {
  const { PRESET_TYPES } = require('../src/utils/constants');
  console.log("✅ Constants module works");
  console.log("   Preset types:", Object.keys(PRESET_TYPES));
} catch (error) {
  console.log("❌ Constants module failed:", error.message);
}

// Test 2: Prompt Engineer  
try {
  const PromptEngineer = require('../src/llm/prompt-engineer');
  const engineer = new PromptEngineer();
  console.log("✅ Prompt Engineer module works");
} catch (error) {
  console.log("❌ Prompt Engineer failed:", error.message);
}

// Test 3: Response Parser
try {
  const ResponseParser = require('../src/llm/response-parser');
  console.log("✅ Response Parser module works");
} catch (error) {
  console.log("❌ Response Parser failed:", error.message);
}

// Test 4: Fallbacks
try {
  const FallbackTemplates = require('../src/llm/fallbacks');
  console.log("✅ Fallbacks module works");
} catch (error) {
  console.log("❌ Fallbacks failed:", error.message);
}

console.log("Our modules test completed!");