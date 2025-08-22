// tests/test-openrouter.js - Test script for OpenRouter integration
require('dotenv').config();
const LLMIntegration = require('../src/llm');
const { PRESET_TYPES } = require('../src/utils/constants');

async function testOpenRouter() {
  console.log('🧪 Testing OpenRouter integration...');
  
  // Check if API key is available
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY environment variable is not set');
    console.log('💡 Create a .env file with: OPENROUTER_API_KEY=your_key_here');
    process.exit(1);
  }
  
  try {
    // Initialize LLM integration
    const llm = new LLMIntegration(
      process.env.OPENROUTER_API_KEY,
      'openai/gpt-3.5-turbo',
      './templates'
    );
    
    await llm.initialize();
    console.log('✅ LLM Integration initialized successfully');
    
    // Test with a simple prompt
    const testPrompt = "Create a simple landing page for a coffee shop";
    
    console.log(`\n📋 Testing with prompt: "${testPrompt}"`);
    console.log('⏳ Generating site components... (this may take a moment)');
    
    const components = await llm.generateSiteComponents(testPrompt, PRESET_TYPES.LANDING_PAGE);
    
    console.log('✅ Site components generated successfully!');
    console.log(`📄 HTML length: ${components.html.length} characters`);
    console.log(`🎨 CSS length: ${components.css.length} characters`);
    console.log(`⚡ JS length: ${components.js.length} characters`);
    
    // Show a preview of the generated content
    console.log('\n--- HTML Preview (first 200 chars) ---');
    console.log(components.html.substring(0, 200) + '...');
    
    console.log('\n--- CSS Preview (first 200 chars) ---');
    console.log(components.css.substring(0, 200) + '...');
    
    console.log('\n--- JS Preview (first 200 chars) ---');
    console.log(components.js.substring(0, 200) + '...');
    
    // Test model listing
    console.log('\n🔄 Testing model listing...');
    const models = await llm.getAvailableModels();
    console.log(`✅ Found ${models.length} available models`);
    
    if (models.length > 0) {
      console.log('📋 First 5 models:');
      models.slice(0, 5).forEach(model => {
        console.log(`   - ${model.id}`);
      });
    }
    
    console.log('\n🎉 All tests passed! OpenRouter integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testOpenRouter();
}

module.exports = testOpenRouter;