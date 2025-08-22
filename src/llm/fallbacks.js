// src/llm/fallbacks.js
const fs = require('fs').promises;
const path = require('path');

class FallbackTemplates {
  constructor(templatesPath) {
    this.templatesPath = templatesPath;
    this.templates = {};
  }

  async loadTemplates() {
    try {
      const templateDirs = await fs.readdir(this.templatesPath);
      
      for (const dir of templateDirs) {
        const templatePath = path.join(this.templatesPath, dir);
        const stat = await fs.stat(templatePath);
        
        if (stat.isDirectory()) {
          try {
            this.templates[dir] = {
              html: await fs.readFile(path.join(templatePath, 'index.html'), 'utf8'),
              css: await fs.readFile(path.join(templatePath, 'style.css'), 'utf8'),
              js: await fs.readFile(path.join(templatePath, 'script.js'), 'utf8')
            };
          } catch (error) {
            console.warn(`Could not load template from ${dir}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.warn('Could not load fallback templates:', error.message);
      this.loadDefaultTemplates();
    }
  }

  loadDefaultTemplates() {
    this.templates = {
      basic: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Welcome to Our Site</h1>
  </header>
  <main>
    <section>
      <h2>Main Content</h2>
      <p>This is a generated website.</p>
    </section>
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} Generated Site</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
        css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: #f4f4f4;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

main {
  padding: 20px;
}

footer {
  background: #f4f4f4;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
}`,
        js: `document.addEventListener('DOMContentLoaded', function() {
  console.log('Website loaded successfully!');
});`
      }
    };
  }

  getTemplate(type = 'basic') {
    return this.templates[type] || this.templates.basic;
  }
}

module.exports = FallbackTemplates;