// tests/check-structure.js - Verify the project structure
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking project structure...');

const requiredFiles = [
    'src/llm/index.js',
    'src/llm/openrouter-client.js',
    'src/llm/prompt-engineer.js',
    'src/llm/response-parser.js',
    'src/llm/fallbacks.js',
    'src/utils/constants.js',
    'templates/basic/index.html',
    'templates/basic/style.css',
    'templates/basic/script.js',
    '.env'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

if (allFilesExist) {
    console.log('\n🎉 All required files are present!');
} else {
    console.log('\n❌ Some files are missing. Please check the structure.');
    process.exit(1);
}