class ResponseParser {
  static parseLLMResponse(response) {
    try {
      // OpenRouter responses might have different formatting
      // Try to extract JSON from various response formats
      let jsonString = response;
      
      // Remove markdown code blocks if present
      jsonString = jsonString.replace(/```json|```/g, '').trim();
      
      // Sometimes the response might have text before or after the JSON
      const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }
      
      const parsed = JSON.parse(jsonString);
      
      // Validate the structure
      if (!parsed.html || !parsed.css || !parsed.js) {
        throw new Error("Missing required components in LLM response");
      }
      
      return {
        html: this.sanitizeHTML(parsed.html),
        css: this.sanitizeCSS(parsed.css),
        js: this.sanitizeJS(parsed.js)
      };
    } catch (error) {
      throw new Error(`Failed to parse LLM response: ${error.message}`);
    }
  }

  static sanitizeHTML(html) {
    // Basic HTML sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/onerror\s*=\s*["'][^"']*["']/gi, '')
      .replace(/onload\s*=\s*["'][^"']*["']/gi, '');
  }

  static sanitizeCSS(css) {
    // Ensure CSS is properly formatted
    return css;
  }

  static sanitizeJS(js) {
    // Basic JS sanitization - remove obvious dangerous patterns
    return js
      .replace(/eval\(/g, '// eval(')
      .replace(/document\.cookie/g, '// document.cookie')
      .replace(/localStorage\./g, '// localStorage.')
      .replace(/sessionStorage\./g, '// sessionStorage.');
  }
}

module.exports = ResponseParser;