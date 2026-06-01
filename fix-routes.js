const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('route.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'app', 'api'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes("export const dynamic = 'force-dynamic';")) {
    // Add it after the last import statement, or just at the very top.
    // Let's just put it at the very top before anything else.
    // Wait, imports must be at the top level before other statements?
    // In TypeScript/ES6, you can have export statements mixed with imports, but usually imports go first.
    // Let's insert it after the last import.
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    lines.splice(lastImportIndex + 1, 0, '\nexport const dynamic = \'force-dynamic\';\n');
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Fixed', file);
  }
}
