// generate_site.js - Main CLI file
require('dotenv').config();
const { Command } = require('commander');
const LLMIntegration = require('./src/llm');
const { PRESET_TYPES } = require('./src/utils/constants');

// You'll need to create a scaffolder - here's a simple version
const fs = require('fs').promises;
const path = require('path');

class SimpleScaffolder {
  constructor(outputDir = './generated-site') {
    this.outputDir = outputDir;
  }

  async generateFiles(components) {
    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });
    
    // Write files
    await fs.writeFile(path.join(this.outputDir, 'index.html'), components.html);
    await fs.writeFile(path.join(this.outputDir, 'style.css'), components.css);
    await fs.writeFile(path.join(this.outputDir, 'script.js'), components.js);
    
    console.log(`✅ Files generated in: ${path.resolve(this.outputDir)}`);
    console.log(`📁 ${path.join(this.outputDir, 'index.html')}`);
    console.log(`📁 ${path.join(this.outputDir, 'style.css')}`);
    console.log(`📁 ${path.join(this.outputDir, 'script.js')}`);
  }
}

const program = new Command();

program
  .name('generate-site')
  .description('CLI tool to generate static sites using AI prompts')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a static site from a prompt')
  .argument('<prompt>', 'Prompt describing the site to generate')
  .option('-p, --preset <type>', 'Preset type (landing-page, portfolio, blog)', 'landing-page')
  .option('-o, --output <dir>', 'Output directory', 'generated-site')
  .action(async (prompt, options) => {
    try {
      console.log('🚀 Generating site...');
      console.log(`📝 Prompt: ${prompt}`);
      console.log(`🎨 Preset: ${options.preset}`);
      console.log(`📁 Output: ${options.output}`);

      if (!process.env.OPENROUTER_API_KEY) {
        throw new Error('OPENROUTER_API_KEY not found in .env file');
      }

      const llm = new LLMIntegration(
        process.env.OPENROUTER_API_KEY,
        'openai/gpt-3.5-turbo',
        './templates'
      );
      
      await llm.initialize();
      const components = await llm.generateSiteComponents(prompt, options.preset);
      
      // Generate files
      const scaffolder = new SimpleScaffolder(options.output);
      await scaffolder.generateFiles(components);
      
      console.log('✅ Site generated successfully!');

    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

program.parse();