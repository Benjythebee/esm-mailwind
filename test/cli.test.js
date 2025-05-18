// tests/cli.test.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CLI Tests', () => {
  // Create a temporary directory for test output
  let tempDir = path.join(__dirname, 'tmp').replace(/\\/g, '/');
  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up temp files
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  // This is a basic CLI test that would need to be adapted to your actual CLI implementation
  test('CLI should process HTML files correctly', async () => {
    // Skip this test in CI environments or when CLI testing is not possible
    if (process.env.CI || process.env.SKIP_CLI_TESTS) {
      return;
    }
    
    // Create test files
    const inputHtmlPath = path.join(tempDir, 'input.html');
    const outputHtmlPath = path.join(tempDir, 'output.html');
    
    const testHtml = `
    <html>
      <body>
        <div class="text-lg font-bold">Hello World</div>
      </body>
    </html>
    `;
    
    fs.writeFileSync(inputHtmlPath, testHtml);
    
    // Run the CLI
    try {
      await execAsync(`node src/index.js --input-html ${inputHtmlPath} --output-html ${outputHtmlPath}`);
      
      // Check if output file exists
      expect(fs.existsSync(outputHtmlPath)).toBe(true);
      
      // Read output file
      const outputHtml = fs.readFileSync(outputHtmlPath, 'utf8');
      
      // Verify CSS was inlined
      expect(outputHtml).toContain('font-size: 18px');
      expect(outputHtml).toContain('font-weight: 700');
    } catch (error) {
      console.error('CLI test failed:', error);
      throw error;
    }
  }, 30000); // Increase timeout for CLI test
});