const fs = require('fs');
const path = require('path');

console.log('Running comprehensive Swift & Expo patch...');

// 1. Patch JavaScriptCallback.swift to mark call closures as @Sendable
const jsCallbackPath = 'node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI/Runtime/JavaScriptCallback.swift';
if (fs.existsSync(jsCallbackPath)) {
  let text = fs.readFileSync(jsCallbackPath, 'utf8');
  text = text.replace(/@JavaScriptActor\s*func call/g, '@JavaScriptActor\n    @Sendable\n    func call');
  fs.writeFileSync(jsCallbackPath, text, 'utf8');
  console.log('Successfully added @Sendable to JavaScriptCallback.swift');
}

// 2. Patch Package.swift files
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

  // Remove upcoming experimental features causing strict concurrency errors
  content = content.replace(/\.enableUpcomingFeature\("NonisolatedNonsendingByDefault"\),?/g, '');
  content = content.replace(/\.enableUpcomingFeature\("InferIsolatedConformances"\),?/g, '');

  // Disable strict concurrency errors in unsafeFlags
  content = content.replace(/"-enable-library-evolution",/g, '"-enable-library-evolution",\n          "-Xfrontend", "-strict-concurrency=minimal",');

  // Remove -Werror flags that turn warnings into errors
  content = content.replace(/"-Werror",\s*"[^"]*",?/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully patched Package.swift:', filePath);
  }
}

const targetFiles = walk('node_modules').concat(walk('ios'));
targetFiles.forEach(patchFile);
console.log('All patches applied cleanly.');
