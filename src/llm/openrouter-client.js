const axios = require('axios');

class OpenRouterClient {
  constructor(apiKey, model = 'openai/gpt-3.5-turbo') {
    this.apiKey = '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';
    this.model = 'openai/gpt-3.5-turbo';
    this.baseURL = 'https://openrouter.ai/api/v1';
  }

  async generateContent(prompt) {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://github.com/prompt-driven-ssg', // Required by OpenRouter
            'X-Title': 'Prompt-Driven SSG' // Required by OpenRouter
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response) {
        throw new Error(`OpenRouter API Error: ${error.response.status} - ${error.response.data.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('OpenRouter API Error: No response received from server');
      } else {
        throw new Error(`OpenRouter API Error: ${error.message}`);
      }
    }
  }

  // Method to get available models from OpenRouter
  async getAvailableModels() {
    try {
      const response = await axios.get(`${this.baseURL}/models`);
      return response.data.data;
    } catch (error) {
      console.warn('Could not fetch available models:', error.message);
      return [
        { id: 'openai/gpt-4' },
        { id: 'openai/gpt-3.5-turbo' },
        { id: 'anthropic/claude-2' },
        { id: 'meta-llama/llama-2-70b-chat' },
        { id: 'google/palm-2-chat-bison' }
      ];
    }
  }
}

module.exports = OpenRouterClient;