// tests/test-axios.js - Test if axios is working
console.log('🧪 Testing axios...');

try {
    const axios = require('axios');
    console.log('✅ Axios loaded successfully');
    
    // Test a simple HTTP request
    axios.get('https://httpbin.org/get')
        .then(response => {
            console.log('✅ Axios HTTP request successful');
            console.log('Status:', response.status);
        })
        .catch(error => {
            console.log('❌ Axios HTTP request failed:', error.message);
        });
        
} catch (error) {
    console.error('❌ Failed to load axios:', error.message);
    console.error('Make sure axios is installed: npm install axios');
}