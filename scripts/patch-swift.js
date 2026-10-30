const fs = require('fs');
const path = require('path');

console.log('=== Running comprehensive Swift & Expo patch for Swift 6.1 ===');

// 1. Patch JavaScriptCallback.swift to add @Sendable to all call closures
const jsCallbackPath = 'node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI/Runtime/JavaScriptCallback.swift';
if (fs.existsSync(jsCallbackPath)) {
  let text = fs.readFileSync(jsCallbackPath, 'utf8');
  if (!text.includes('@Sendable\n    func call')) {
    text = text.replace(/@JavaScriptActor\s*func call/g, '@JavaScriptActor\n    @Sendable\n    func call');
    fs.writeFileSync(jsCallbackPath, text, 'utf8');
    console.log('Successfully patched JavaScriptCallback.swift with @Sendable');
  } else {
    console.log('JavaScriptCallback.swift already has @Sendable');
  }
}

// 2. Patch all Package.swift files
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

  // Set swift-tools-version to 6.1 to match Swift 6.1.0 on runner
  content = content.replace(/swift-tools-version:\s*[0-9]+(\.[0-9]+)*/g, 'swift-tools-version: 6.1');

  // Remove swiftLanguageModes which is not supported in tools version 6.1 or earlier
  content = content.replace(/swiftLanguageModes:\s*\[[^\]]*\],?/g, '');

  // Remove trailing commas before closing parenthesis
  content = content.replace(/,(\s*\))/g, '$1');

  // Remove experimental upcoming features causing strict data race errors
  content = content.replace(/\.enableUpcomingFeature\("NonisolatedNonsendingByDefault"\),?/g, '');
  content = content.replace(/\.enableUpcomingFeature\("InferIsolatedConformances"\),?/g, '');

  // Add -strict-concurrency=minimal to prevent concurrency warnings from failing build
  if (!content.includes('strict-concurrency=minimal')) {
    content = content.replace(
      /"-enable-library-evolution",/g,
      '"-enable-library-evolution",\n          "-Xfrontend", "-strict-concurrency=minimal",'
    );
  }

  // Remove -Werror flags
  content = content.replace(/"-Werror",\s*"[^"]*",?/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully patched Package.swift at:', filePath);
  }
}

const targetFiles = walk('node_modules').concat(walk('ios'));
targetFiles.forEach(patchFile);
console.log('=== All Swift patches applied cleanly ===');
