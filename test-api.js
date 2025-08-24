// Simple test to verify the API is working
const axios = require('axios');
require('dotenv').config();

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoint...');
    console.log('API_URL:', process.env.API_URL);
    
    const promptData = {
      projectName: "Test Website",
      description: "A simple test website",
      requirements: ["responsive"],
      sections: ["header", "hero"],
      tone: "professional"
    };

    const response = await axios.get(process.env.API_URL + '/generate', {
      params: {
        prompt: JSON.stringify(promptData),
        template: 'normal'
      },
      timeout: 30000
    });

    console.log('✅ API Response received!');
    console.log('Status:', response.status);
    
    if (response.data.html) {
      console.log('✅ HTML content found!');
      console.log('HTML length:', response.data.html.length, 'characters');
      console.log('HTML preview:', response.data.html.substring(0, 100) + '...');
    } else if (response.data.response) {
      console.log('✅ Response content found!');
      console.log('Response length:', response.data.response.length, 'characters');
    } else {
      console.log('⚠️  Unexpected response format:', Object.keys(response.data));
    }
    
    return true;
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return false;
  }
}

testAPI().then(success => {
  process.exit(success ? 0 : 1);
});
