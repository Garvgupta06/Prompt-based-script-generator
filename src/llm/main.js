// src/main.js - Main CLI logic
const { Command } = require('commander');
const LLMIntegration = require('./llm');
const Scaffolder = require('./scaffolder'); // You'll need to create this
const { PRESET_TYPES } = require('./utils/constants');

const program = new Command();

program
  .name('generate-site')
  .description('CLI tool to generate static sites using AI prompts')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a static site from a prompt')
  .argument('<prompt>', 'Prompt describing the site to generate')
  .option('-p, --preset <type>', 'Preset type', 'landing-page')
  .option('-o, --output <dir>', 'Output directory', 'generated-sites')
  .action(async (prompt, options) => {
    try {
      console.log('🚀 Generating site...');
      const llm = new LLMIntegration(
        process.env.OPENROUTER_API_KEY,
        'openai/gpt-3.5-turbo',
        './templates'
      );
      
      await llm.initialize();
      const components = await llm.generateSiteComponents(prompt, options.preset);
      
      // Generate files - you'll need to implement Scaffolder
      const scaffolder = new Scaffolder(options.output);
      await scaffolder.generateFiles(components);
      
      console.log('✅ Site generated successfully!');
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  });

program.parse();