// src/llm/index.js
const OpenRouterClient = require('./openrouter-client');
const PromptEngineer = require('./prompt-engineer');        // ✅ Correct
const ResponseParser = require('./response-parser');        // ✅ Correct  
const FallbackTemplates = require('./fallbacks');           // ✅ Correct
const { DEFAULT_CONFIG } = require('../utils/constants');   // ✅ Correct

class LLMIntegration {
  constructor(apiKey, model = DEFAULT_CONFIG.model, templatesPath) {
    this.client = new OpenRouterClient(apiKey, model);
    this.promptEngineer = new PromptEngineer();
    this.fallbackTemplates = new FallbackTemplates(templatesPath);
  }

  async initialize() {
    await this.fallbackTemplates.loadTemplates();
  }

  async generateSiteComponents(userPrompt, presetType = null) {
    const prompt = this.promptEngineer.generatePrompt(userPrompt, presetType);
    
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        console.log(`Generating site with OpenRouter (attempt ${attempt + 1}/3)...`);
        const response = await this.client.generateContent(prompt);
        return ResponseParser.parseLLMResponse(response);
      } catch (error) {
        console.warn(`Attempt ${attempt + 1} failed: ${error.message}`);
        
        // If final attempt, use fallback
        if (attempt === 2) {
          console.log('Using fallback template due to LLM failures');
          return this.fallbackTemplates.getTemplate(presetType || 'basic');
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, 1000 * Math.pow(2, attempt))
        );
      }
    }
  }

  // Method to get available models
  async getAvailableModels() {
    return await this.client.getAvailableModels();
  }
}

module.exports = LLMIntegration;