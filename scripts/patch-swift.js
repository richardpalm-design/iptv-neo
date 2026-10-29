const fs = require('fs');
const path = require('path');

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

  // 1. Lower swift-tools-version to 6.0
  content = content.replace(/swift-tools-version:\s*6\.\d+/g, 'swift-tools-version: 6.0');

  // 2. Remove swiftLanguageModes: [.v6]
  content = content.replace(/swiftLanguageModes:\s*\[\.v6\],?/g, '');

  // 3. Remove trailing comma before closing parenthesis
  content = content.replace(/,(\s*\))/g, '$1');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully patched Package.swift:', filePath);
  }
}

// Patch node_modules and ios
const targetFiles = walk('node_modules').concat(walk('ios'));
console.log(`Found ${targetFiles.length} Package.swift files to inspect.`);
targetFiles.forEach(patchFile);
