# Podcast Script Generator & Prompt-Driven Static Site Generator

## Overview

This project generates modern, production-ready websites or podcast scripts using Large Language Models (LLMs) via the OpenRouter API. You provide a prompt, and the tool creates HTML, CSS, and JS files based on your requirements. It supports multiple templates, fallback options, and is fully extensible.

---

## Features

- Generate sites or scripts from a prompt
- LLM integration via OpenRouter
- Multiple templates: landing page, portfolio, basic
- Fallback templates if LLM fails
- CLI interface
- Environment variable support
- Unit tests for core modules

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/podcast_script_generator.git
cd podcast_script_generator
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
OUTPUT_DIR=generated-sites
```

---

## Usage

### Generate a Site

```sh
node bin/generate-site.js generate "Your prompt here"
```

- **Prompt:** Describe the site or script you want (e.g., "portfolio for a web developer").
- **Preset:** Defaults to `landing-page`. You can change presets in the code or by editing CLI options.

### Output

- Generated files are saved in the folder specified by `OUTPUT_DIR` (default: `generated-sites/` or `generated-site/`).

---

## Project Structure

```
podcast_script_generator/
│
├── bin/
│   └── generate-site.js         # CLI entrypoint
├── src/
│   ├── llm/
│   │   ├── index.js             # Main LLM integration logic
│   │   ├── openrouter-client.js # OpenRouter API client
│   │   ├── response-parser.js   # Parses LLM responses
│   │   ├── prompt-engineer.js   # Prompt engineering helpers
│   │   └── fallbacks.js         # Fallback templates
│   └── utils/
│       └── constants.js         # Utility constants
├── templates/
│   ├── basic/
│   ├── landing-page/
│   └── portfolio/
├── tests/
│   └── ...                      # Test scripts
├── package.json
├── package-lock.json
├── .env                         # Environment variables (not committed)
└── README.md
```

---

## Templates

- **basic/**, **landing-page/**, **portfolio/**: Each contains `index.html`, `style.css`, and `script.js`.
- Add your own templates by creating a new folder in `/templates`.

---

## LLM Integration

- Uses OpenRouter API.
- Model can be set via `.env` or CLI (default: `openai/gpt-3.5-turbo`, supports `openai/gpt-oss-20b`).
- Handles retries and fallback templates if LLM fails.

---

## Testing

Run all tests:

```sh
node tests/test.js
```

Or run individual test scripts in `/tests`.

---

## Troubleshooting

- **Missing module errors:** Check require paths and file names.
- **API errors:** Ensure `.env` contains a valid OpenRouter API key.
- **LLM failures:** Fallback templates are used if the LLM response is invalid.

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

---

## License

MIT

---

## Credits

- [OpenRouter](https://openrouter.ai/)
- [Node.js](https://nodejs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [axios](https://www.npmjs.com/package/axios)

---

## Contact

For questions or support, open an issue or contact the maintainer.
