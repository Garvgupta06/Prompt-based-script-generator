# AI Site Generator CLI

🚀 Generate beautiful HTML websites with AI magic!

## Features

- ✨ Interactive CLI with beautiful prompts
- 🎨 Multiple template styles (normal, modern, portfolio, landing, blog, business)
- 🤖 AI-powered content generation via Cloudflare Worker
- 📱 Single HTML file output (fully self-contained)
- 🌐 Ready for instant deployment

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
3. **Update your API URL in `.env`:**
   ```env
   API_URL=https://your-worker.your-domain.workers.dev
   ```

## Usage

### Interactive Mode (Recommended)
```bash
node cli.js
```

This will guide you through:
- Project name and description
- Template selection
- Section choices (header, hero, about, etc.)
- Tone selection (professional, creative, etc.)
- Custom requirements
- Output directory

### No Logo Mode
```bash
node cli.js --no-logo
```

## Templates

- 🔹 **Normal** - Clean and simple
- ✨ **Modern** - Trendy and stylish  
- 👤 **Portfolio** - Showcase your work
- 🚀 **Landing** - Convert visitors
- 📝 **Blog** - Share your thoughts
- 🏢 **Business** - Professional presence

## Output

The CLI generates:
- `index.html` - Complete single-file website with embedded CSS and JS
- `README.md` - Deployment instructions and project info

## Deployment

The generated HTML file can be deployed to:
- **Netlify** - Drag & drop to netlify.com/drop
- **GitHub Pages** - Upload to GitHub repository
- **Vercel** - Use Vercel CLI
- **Any static hosting** - Just upload the HTML file!

## API Integration

The CLI communicates with your Cloudflare Worker that processes the AI prompts. Make sure your worker endpoint matches the prompt structure defined in the worker's `index.ts`.

## License

MIT
