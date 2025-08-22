const { PRESET_TYPES } = require('../utils/constants');

class PromptEngineer {
  constructor() {
    this.presets = {
      [PRESET_TYPES.LANDING_PAGE]: this.getLandingPagePrompt(),
      [PRESET_TYPES.PORTFOLIO]: this.getPortfolioPrompt(),
      [PRESET_TYPES.BLOG]: this.getBlogPrompt(),
      [PRESET_TYPES.ECOMMERCE]: this.getEcommercePrompt(),
      [PRESET_TYPES.DOCUMENTATION]: this.getDocumentationPrompt(),
    };
  }

  generatePrompt(userPrompt, presetType = null) {
    let basePrompt;
    
    if (presetType && this.presets[presetType]) {
      basePrompt = `${this.presets[presetType]}\n\nAdditional requirements: ${userPrompt}`;
    } else {
      basePrompt = this.getBasePrompt(userPrompt);
    }
    
    // Add system instructions for OpenRouter
    return `${basePrompt}\n\nRemember to respond with ONLY the JSON object, no additional text or explanations.`;
  }

  // In the getBasePrompt method, make the JSON requirement more explicit
getBasePrompt(userPrompt) {
  return `
You are an expert web developer. Generate a complete static website based on: "${userPrompt}".

CRITICAL: You MUST return ONLY a valid JSON object with exactly these three keys:
- "html": Full HTML5 markup
- "css": CSS styles  
- "js": JavaScript code

Do NOT include any other text, explanations, or markdown formatting. Only the raw JSON.

Example of the exact format required:
{
  "html": "<!DOCTYPE html><html>...</html>",
  "css": "body { color: black; }",
  "js": "console.log('hello');"
}

Requirements:
1. HTML must be complete with doctype, html, head, and body tags
2. CSS must be responsive and modern
3. JS must be vanilla ES6+ without external dependencies
4. All code must be production-ready and follow best practices
`;
}

  getLandingPagePrompt() {
    return `Generate a modern landing page with:
- Hero section with compelling headline and clear call-to-action button
- Features/benefits section with icons or illustrations
- Testimonials section with customer reviews
- Pricing section (if applicable)
- Contact form or signup section
- Footer with social links and additional navigation
- Responsive design that works perfectly on mobile and desktop
- Modern, attractive styling with appropriate whitespace and typography`;
  }

  getPortfolioPrompt() {
    return `Generate a professional portfolio website with:
- Hero section with personal introduction and profile picture area
- Projects showcase section with grid layout, project images, and descriptions
- Skills/technologies section with visual indicators or icons
- About me section with detailed background information
- Contact information with working links
- Clean, professional design with good typography and spacing
- Responsive design that works on all devices`;
  }

  getBlogPrompt() {
    return `Generate a blog website with:
- Header with site logo and navigation menu
- Featured posts section with highlighted content
- Blog post listing with excerpts, publication dates, and categories
- Sidebar for categories, tags, or author information
- Footer with subscription option, recent posts, and social links
- Clean, readable typography with good contrast
- Responsive design optimized for reading on all devices`;
  }

  getEcommercePrompt() {
    return `Generate an e-commerce product page with:
- Product image gallery with thumbnail navigation
- Product title, price, and description
- Product options selection (size, color, etc.)
- Add to cart button with quantity selector
- Product details and specifications tabs
- Customer reviews section
- Related products suggestions
- Responsive design optimized for conversions`;
  }

  getDocumentationPrompt() {
    return `Generate a documentation website with:
- Sidebar navigation with collapsible sections
- Main content area with proper documentation formatting
- Code examples with syntax highlighting
- Table of contents for quick navigation
- Search functionality placeholder
- Responsive design that works well for technical content
- Clean, professional styling focused on readability`;
  }
}

module.exports = PromptEngineer;