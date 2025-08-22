// Supported OpenRouter models
const OPENROUTER_MODELS = {
  GPT_4: 'openai/gpt-4',
  GPT_3_5_TURBO: 'openai/gpt-3.5-turbo',
  CLAUDE_2: 'anthropic/claude-2',
  LLAMA_2_70B: 'meta-llama/llama-2-70b-chat',
  PALM_2: 'google/palm-2-chat-bison'
};

// Preset types
const PRESET_TYPES = {
  LANDING_PAGE: 'landing-page',
  PORTFOLIO: 'portfolio',
  BLOG: 'blog',
  ECOMMERCE: 'ecommerce',
  DOCUMENTATION: 'documentation'
};

// Default configuration
const DEFAULT_CONFIG = {
  model: OPENROUTER_MODELS.GPT_3_5_TURBO,
  temperature: 0.7,
  maxTokens: 4000
};

module.exports = {
  OPENROUTER_MODELS,
  PRESET_TYPES,
  DEFAULT_CONFIG
};