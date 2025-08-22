const { Command } = require('commander');
const { 
  intro, 
  outro, 
  text, 
  select, 
  multiselect, 
  confirm,
  spinner,
  cancel,
  log,
  note
} = require('@clack/prompts');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const figlet = require('figlet');
const axios = require('axios');
require('dotenv').config();

const program = new Command();

// Template types
const TEMPLATES = ['normal', 'modern', 'portfolio', 'landing', 'blog', 'business'];

// ASCII Logo
function showLogo() {
  console.log(chalk.cyan(figlet.textSync('AI Site Gen', {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted'
  })));
  console.log(chalk.gray('🚀 AI-Powered Website Generator\n'));
  console.log(chalk.yellow('Generate beautiful HTML websites with AI magic! ✨\n'));
}

// Interactive questions using clack prompts
async function getProjectDetails() {
  intro(chalk.bold.blue('📋 Let\'s create your website!'));

  const projectName = await text({
    message: '🎯 What\'s your project name?',
    placeholder: 'My Awesome Website',
    validate: (input) => {
      if (!input.trim()) {
        return 'Project name cannot be empty';
      }
      return undefined;
    }
  });

  if (projectName === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const description = await text({
    message: '📝 Describe your website:',
    placeholder: 'A modern website that showcases...',
    validate: (input) => {
      if (!input.trim()) {
        return 'Description cannot be empty';
      }
      return undefined;
    }
  });

  if (description === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const template = await select({
    message: '🎨 Choose a template style:',
    options: [
      { value: 'normal', label: '🔹 Normal', hint: 'Clean and simple' },
      { value: 'modern', label: '✨ Modern', hint: 'Trendy and stylish' },
      { value: 'portfolio', label: '👤 Portfolio', hint: 'Showcase your work' },
      { value: 'landing', label: '🚀 Landing', hint: 'Convert visitors' },
      { value: 'blog', label: '📝 Blog', hint: 'Share your thoughts' },
      { value: 'business', label: '🏢 Business', hint: 'Professional presence' }
    ],
    maxItems: 6
  });

  if (template === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const sections = await multiselect({
    message: '📋 Which sections do you want?',
    options: [
      { value: 'header', label: 'Header/Navigation', hint: 'Site navigation' },
      { value: 'hero', label: 'Hero Section', hint: 'Main banner' },
      { value: 'about', label: 'About Section', hint: 'About your business' },
      { value: 'services', label: 'Services/Features', hint: 'What you offer' },
      { value: 'portfolio', label: 'Portfolio/Gallery', hint: 'Your work showcase' },
      { value: 'testimonials', label: 'Testimonials', hint: 'Customer reviews' },
      { value: 'contact', label: 'Contact Form', hint: 'Get in touch form' },
      { value: 'footer', label: 'Footer', hint: 'Site footer' }
    ],
    initialValues: ['header', 'hero', 'footer'],
    maxItems: 8
  });

  if (sections === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  if (sections.length === 0) {
    log.error('Please select at least one section');
    return process.exit(1);
  }

  const tone = await select({
    message: '🎭 What tone should your website have?',
    options: [
      { value: 'professional and corporate', label: '💼 Professional and Corporate' },
      { value: 'creative and artistic', label: '🎨 Creative and Artistic' },
      { value: 'friendly and casual', label: '😊 Friendly and Casual' },
      { value: 'modern and tech-savvy', label: '🚀 Modern and Tech-savvy' },
      { value: 'elegant and luxury', label: '🌟 Elegant and Luxury' },
      { value: 'bold and energetic', label: '🎯 Bold and Energetic' }
    ],
    maxItems: 6
  });

  if (tone === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const requirements = await text({
    message: '📋 Any specific requirements? (comma-separated, optional):',
    placeholder: 'responsive design, dark mode, animations... (leave it empty for none)',
    defaultValue: '',
  });

  if (requirements === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const processedRequirements = requirements ? 
    requirements.split(',').map(req => req.trim()).filter(req => req.length > 0) : [];

  return {
    projectName,
    description,
    template,
    sections,
    tone,
    requirements: processedRequirements
  };
}

// Get output directory
async function getOutputDirectory(projectName) {
  const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  const defaultPath = `./${sanitizedName}`;

  const output = await text({
    message: '📁 Where should we save your website?',
    defaultValue: defaultPath,
    placeholder:defaultPath
  });

  if (output === undefined) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  return output;
}

// Check if directory exists and handle overwrite
async function handleOutputDirectory(outputPath) {
  const fullPath = path.resolve(outputPath);

  if (await fs.pathExists(fullPath)) {
    const shouldOverwrite = await confirm({
      message: `📁 Directory ${outputPath} already exists. Overwrite?`,
    });

    if (shouldOverwrite === undefined || !shouldOverwrite) {
      cancel('Operation cancelled');
      return process.exit(0);
    }

    log.message(`🗂️  Cleaning existing directory: ${outputPath}`);
    await fs.emptyDir(fullPath);
  } else {
    await fs.ensureDir(fullPath);
  }

  return fullPath;
}

// Show summary
function showSummary(projectDetails, outputPath) {
  note(
    `Project: ${projectDetails.projectName}\nDescription: ${projectDetails.description}\nTemplate: ${projectDetails.template}\nSections: ${projectDetails.sections.join(', ')}\nTone: ${projectDetails.tone}\nOutput: ${path.relative(process.cwd(), outputPath)}`,
    '📋 Generation Summary'
  );
}

// Generate site with AI
async function generateSite(projectDetails, outputPath) {
  const spin = spinner();
  spin.start('🤖 Connecting to AI service...');
  
  try {
    // Check if API URL exists
    if (!process.env.API_URL) {
      spin.stop('❌ API_URL not found in .env file!', 1);
      log.warning('💡 Please:');
      log.warning('1. Add API_URL to your .env file');
      log.warning('2. Example: API_URL=https://your-worker.your-domain.workers.dev');
      process.exit(1);
    }

    spin.message('✨ AI is creating your website...');
    
    // Prepare the prompt data
    const promptData = {
      projectName: projectDetails.projectName,
      description: projectDetails.description,
      requirements: projectDetails.requirements,
      sections: projectDetails.sections,
      tone: projectDetails.tone
    };

    // Make request to Cloudflare Worker
    const response = await axios.get(process.env.API_URL + '/generate', {
      params: {
        prompt: JSON.stringify(promptData),
        template: projectDetails.template
      },
      timeout: 60000 // 60 second timeout
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    spin.message('📁 Saving HTML file...');
    
    // Extract HTML content
    let htmlContent;
    if (typeof response.data === 'string') {
      htmlContent = response.data;
    } else if (response.data.html) {
      htmlContent = response.data.html;
    } else if (response.data.response) {
      // Try to parse if it's JSON string
      try {
        const parsed = JSON.parse(response.data.response);
        htmlContent = parsed.html;
      } catch {
        htmlContent = response.data.response;
      }
    } else {
      throw new Error('No HTML content found in response');
    }

    // Clean up HTML content (remove escape characters)
    htmlContent = htmlContent.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    // Save HTML file
    const htmlFilePath = path.join(outputPath, 'index.html');
    await fs.writeFile(htmlFilePath, htmlContent, 'utf8');
    
    spin.stop('✅ Website generated successfully!');
    return true;
    
  } catch (error) {
    spin.stop('❌ Generation failed: ' + error.message, 1);
    
    if (error.response) {
      log.error('Response status: ' + error.response.status);
      log.error('Response data: ' + JSON.stringify(error.response.data, null, 2));
    }
    
    return false;
  }
}

// Create README file
async function createReadme(outputPath, projectDetails, aiGenerated) {
  const readme = `# ${projectDetails.projectName}

${projectDetails.description}

## 🛠️ Generated with AI Site Generator

- **Template:** ${projectDetails.template}
- **Tone:** ${projectDetails.tone}
- **Sections:** ${projectDetails.sections.join(', ')}
- **AI Generated:** ${aiGenerated ? 'Yes' : 'No (Generation failed)'}
- **Generated on:** ${new Date().toLocaleDateString()}

${projectDetails.requirements.length > 0 ? `## 📋 Requirements
${projectDetails.requirements.map(req => `- ${req}`).join('\n')}
` : ''}

## 🚀 Getting Started

1. **Preview your website:**
   - Open \`index.html\` in your browser
   - Or use a local server: \`npx serve .\`

2. **Edit your website:**
   - Modify \`index.html\` for content and styling
   - The CSS and JavaScript are embedded in the HTML file

## 🌐 Deployment Options

### Netlify (Recommended)
1. Drag and drop the \`index.html\` file to [netlify.com/drop](https://app.netlify.com/drop)
2. Your site will be live instantly!

### GitHub Pages
1. Create a new GitHub repository
2. Upload the \`index.html\` file
3. Enable GitHub Pages in repository settings

### Vercel
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run \`vercel\` in this directory
3. Follow the prompts

## Happy coding! 🎉
---

`;

  await fs.writeFile(path.join(outputPath, 'README.md'), readme);
}

// Show success message
function showSuccessMessage(outputPath, projectName) {
  const relativePath = path.relative(process.cwd(), outputPath);

  // Success message with note
  log.success('🎉 Your website is ready!');
  
  // Project info note
  note(
    `📁 Location: ${relativePath}\n🌐 Website: ${projectName}`,
    '✨ Generated Project'
  );

  // Quick start commands
  note(
    `cd ${relativePath}\nopen index.html    # or double-click it`,
    '🚀 Quick Start',
    {
      format: (line) => `$ ${line}`
    }
  );

  // Local server options
  note(
    `npx serve .\n# or use VS Code Live Server extension`,
    '🌐 Local Server Options',
    {
      format: (line, index) => index === 0 ? `$ ${line}` : `  ${line}`
    }
  );

  // Next steps
  note(
    `• Open index.html to see your website\n• Customize the HTML/CSS/JS as needed\n• Deploy to Netlify, Vercel, or GitHub Pages\n• Check README.md for deployment options`,
    '📖 Next Steps',
    {
      format: (line) => `  ${line}`
    }
  );
}

// Main command
program
  .name('ai-site-gen')
  .description('AI-Powered Website Generator')
  .version('2.0.0')
  .option('--no-logo', 'Skip the ASCII logo')
  .action(async (options) => {
    try {
      // Show logo unless disabled
      if (options.logo !== false) {
        showLogo();
      }

      // Get project details through interactive questions
      const projectDetails = await getProjectDetails();

      // Get output directory
      const output = await getOutputDirectory(projectDetails.projectName);

      // Handle output directory
      const fullOutputPath = await handleOutputDirectory(output);

      // Show summary and confirm
      showSummary(projectDetails, fullOutputPath);
      
      const proceed = await confirm({
        message: '🚀 Generate the website?',
      });

      if (proceed === undefined || !proceed) {
        cancel('Generation cancelled');
        return process.exit(0);
      }

      // Generate the site
      log.step('🚀 Starting generation...');
      const aiGenerated = await generateSite(projectDetails, fullOutputPath);

      if (aiGenerated) {
        // Create README
        await createReadme(fullOutputPath, projectDetails, aiGenerated);

        // Show success message
        showSuccessMessage(fullOutputPath, projectDetails.projectName);
        
        outro('✨ Happy coding! ✨');
      } else {
        log.error('💥 Failed to generate website. Please check your API_URL and try again.');
        process.exit(1);
      }

    } catch (error) {
      log.error('💥 An error occurred: ' + error.message);
      if (process.env.NODE_ENV === 'development') {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  log.error('💥 Unhandled Rejection at: ' + promise + ' reason: ' + reason);
  process.exit(1);
});

// Parse command line arguments
program.parse();

module.exports = { program };