const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let swiftVersion = '';
try {
  swiftVersion = execSync('swift --version').toString();
} catch (e) {
  swiftVersion = '';
}

console.log('Active Swift environment:\n', swiftVersion);

// If Swift version is 6.2 or higher, all Swift 6.2 features work natively out of the box!
if (/Swift version (6\.[2-9]|[7-9]\.)/.test(swiftVersion)) {
  console.log('Swift is 6.2+, no patching needed. Preserving native packages.');
  process.exit(0);
}

console.log('Swift is older than 6.2, patching packages for backwards compatibility...');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file === 'Package.swift') {
      results.push(fullPath);
    }
  }
  return results;
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = content.replace(/swift-tools-version:\s*6\.\d+/g, 'swift-tools-version: 6.0');
  content = content.replace(/swiftLanguageModes:\s*\[\.v6\],?/g, '');
  content = content.replace(/,(\s*\))/g, '$1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched Package.swift:', filePath);
  }
}

const targetFiles = walk('node_modules').concat(walk('ios'));
targetFiles.forEach(patchFile);
