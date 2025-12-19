const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting build...');

// 1. Clean and Create dist
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
    console.log('Cleaning dist...');
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

// 2. Copy public to dist
console.log('Copying public to dist...');
if (fs.existsSync('public')) {
    fs.cpSync('public', distDir, { recursive: true });
}

// 3. Copy app to dist/app
console.log('Copying app to dist/app...');
if (fs.existsSync('app')) {
    const appDest = path.join(distDir, 'app');
    fs.cpSync('app', appDest, { recursive: true });
}

// 4. Run Tailwind CSS
console.log('Compiling Tailwind CSS...');
try {
    // Input: src/css/input.css
    // Output: dist/assets/css/style.css
    // Ensure output dir exists
    const cssOutputDir = path.join(distDir, 'assets', 'css');
    fs.mkdirSync(cssOutputDir, { recursive: true });

    execSync('node node_modules/@tailwindcss/cli/dist/index.mjs -i ./src/css/input.css -o ./dist/assets/css/style.css --minify', { stdio: 'inherit' });
    console.log('CSS compiled successfully.');
} catch (error) {
    console.error('Failed to compile CSS:', error);
    process.exit(1);
}

console.log('Build completed successfully.');
