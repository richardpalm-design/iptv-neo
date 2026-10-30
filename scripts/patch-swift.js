const fs = require('fs');
const path = require('path');

console.log('=== Running comprehensive Swift & Expo patch for Swift 6.1 / Swift 5 Mode ===');

// 1. Ensure JavaScriptCallback.swift does NOT have @Sendable on local func call
const jsCallbackPath = 'node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI/Runtime/JavaScriptCallback.swift';
if (fs.existsSync(jsCallbackPath)) {
  let text = fs.readFileSync(jsCallbackPath, 'utf8');
  if (text.includes('@Sendable')) {
    text = text.replace(/@JavaScriptActor\s*@Sendable\s*func call/g, '@JavaScriptActor\n    func call');
    text = text.replace(/@Sendable\s*func call/g, 'func call');
    fs.writeFileSync(jsCallbackPath, text, 'utf8');
    console.log('Successfully reverted @Sendable from JavaScriptCallback.swift');
  } else {
    console.log('JavaScriptCallback.swift clean (no @Sendable on local functions)');
  }
}

// 2. Patch build-xcframework.sh to pass SWIFT_VERSION=5 and SWIFT_STRICT_CONCURRENCY=minimal to xcodebuild
const xcframeworkScriptPath = 'node_modules/expo-modules-jsi/apple/scripts/build-xcframework.sh';
if (fs.existsSync(xcframeworkScriptPath)) {
  let content = fs.readFileSync(xcframeworkScriptPath, 'utf8');
  if (!content.includes('SWIFT_STRICT_CONCURRENCY=minimal')) {
    content = content.replace(
      /SWIFT_COMPILATION_MODE=wholemodule \\/g,
      'SWIFT_COMPILATION_MODE=wholemodule \\\n    SWIFT_VERSION=5 \\\n    SWIFT_STRICT_CONCURRENCY=minimal \\\n    SWIFT_TREAT_WARNINGS_AS_ERRORS=NO \\\n    GCC_TREAT_WARNINGS_AS_ERRORS=NO \\'
    );
    fs.writeFileSync(xcframeworkScriptPath, content, 'utf8');
    console.log('Successfully patched build-xcframework.sh with SWIFT_VERSION=5 and SWIFT_STRICT_CONCURRENCY=minimal');
  } else {
    console.log('build-xcframework.sh already configured with minimal strict concurrency');
  }
}

// 3. Patch all Package.swift files
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

  // Enforce Swift 5 language mode to disable Swift 6 strict concurrency errors
  if (content.includes('swiftLanguageModes:')) {
    content = content.replace(/swiftLanguageModes:\s*\[[^\]]*\]/g, 'swiftLanguageModes: [.v5]');
  } else if (content.includes('cxxLanguageStandard:')) {
    content = content.replace(/cxxLanguageStandard:/g, 'swiftLanguageModes: [.v5],\n  cxxLanguageStandard:');
  }

  // Remove trailing commas before closing parenthesis
  content = content.replace(/,(\s*\))/g, '$1');

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
