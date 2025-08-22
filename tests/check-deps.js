// tests/check-deps.js - Check if dependencies are installed
console.log("Checking installed dependencies...");

const dependencies = ['axios', 'commander', 'dotenv'];

dependencies.forEach(dep => {
  try {
    require(dep);
    console.log(`✅ ${dep} is installed`);
  } catch (error) {
    console.log(`❌ ${dep} is NOT installed: ${error.message}`);
  }
});

console.log("Dependency check completed!");