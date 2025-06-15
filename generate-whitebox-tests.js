const fs = require("fs");
const path = require("path");

// Path to your controller
const controllerPath = path.join(__dirname, "server/controllers/products.js");
const testOutputPath = path.join(__dirname, "tests/products.whitebox.test.js");

// Read file content
const fileContent = fs.readFileSync(controllerPath, "utf-8");

// Match all exported functions
const exportRegex = /exports\.(\w+)\s*=\s*\(([^)]*)\)\s*=>/g;
let match;
const tests = [];

while ((match = exportRegex.exec(fileContent)) !== null) {
  const fnName = match[1];
  const args = match[2].split(',').map(arg => arg.trim()).filter(Boolean);

  const hasRes = args.includes("res");
  const mockRes = hasRes
    ? `const res = { json: jest.fn(), status: jest.fn(() => res) };`
    : "";

  const testFn = `
describe('${fnName}', () => {
  it('should execute without errors', () => {
    const req = {};
    ${mockRes}
    const ${fnName} = require('../server/controllers/products').${fnName};
    ${fnName}(req${hasRes ? ", res" : ""});
    ${hasRes ? `expect(res.json).toHaveBeenCalled();` : ""}
  });
});
  `;

  tests.push(testFn.trim());
}

// Final test file content
const output = `const { describe, it, expect, jest } = require('@jest/globals');\n\n${tests.join('\n\n')}\n`;

// Write to test file
fs.writeFileSync(testOutputPath, output);
console.log("✅ White-box test file generated:", testOutputPath);
