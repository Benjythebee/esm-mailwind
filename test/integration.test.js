import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import juice from 'juice';
import hypeJuicedHtml from '../src/hype.js';
import postHypeCss from '../src/post-hype.js';
import { protectTemplates, restoreTemplates } from '../src/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Integration Tests', () => {
  // Create a temporary directory for test output
  const tempDir = path.join(__dirname, 'tmp');
  
  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
  });

  afterAll(() => {
    // Clean up temp files
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('should process HTML with template expressions correctly', () => {
    // Test HTML with template expressions
    const testHtml = `
    <html>
      <head>
        <title>{{ page_title }}</title>
      </head>
      <body>
        <div class="container mx-auto">
          <h1 class="text-2xl font-bold">{{ header }}</h1>
          <img src="{{ url("/images/portrait_footer.png") }}" class="object-cover mt-3">
          <p class="text-base">{{ content }}</p>
          <a href="{{ url('page', {"id": "123"}) }}" class="text-blue-500">Link</a>
        </div>
      </body>
    </html>
    `;
    
    // Test CSS
    const testCss = `
    .container { max-width: 1200px; margin-left: auto; margin-right: auto; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .text-2xl { font-size: 24px; }
    .font-bold { font-weight: 700; }
    .text-base { font-size: 16px; }
    .object-cover { object-fit: cover; }
    .mt-3 { margin-top: 12px; }
    .text-blue-500 { color: #3b82f6; }
    `;
    
    // Process the HTML
    const protected_html = protectTemplates(testHtml);
    const inlined_html = juice.inlineContent(protected_html, testCss);
    const hyped_html = hypeJuicedHtml(inlined_html);
    const processed_html = postHypeCss(hyped_html, { basePx: 16 });
    const final_html = restoreTemplates(processed_html);
    
    // Verify that template expressions are preserved
    expect(final_html).toContain('{{ page_title }}');
    expect(final_html).toContain('{{ header }}');
    expect(final_html).toContain('{{ content }}');
    expect(final_html).toContain('{{ url("/images/portrait_footer.png") }}');
    expect(final_html).toContain('{{ url(\'page\', {"id": "123"}) }}');
    
    // Verify that CSS is inlined
    expect(final_html).toContain('font-size: 24px');
    expect(final_html).toContain('font-weight: 700');
    expect(final_html).toContain('margin-top: 12px');
    expect(final_html).toContain('color: #3b82f6');
  });

  test('should handle real world example with image', () => {
    const testHtml = `
    <html>
      <body>
        <img src="{{ url("/images/portrait_footer.png") }}" class="object-cover mt-3">
      </body>
    </html>
    `;
    
    const testCss = `
    .object-cover { object-fit: cover; }
    .mt-3 { margin-top: 12px; }
    `;
    
    // Process without template protection
    const inlined_html_without_protection = juice.inlineContent(testHtml, testCss);
    const hyped_html_without_protection = hypeJuicedHtml(inlined_html_without_protection);
    const processed_html_without_protection = postHypeCss(hyped_html_without_protection, { basePx: 16 });
    
    // Verify the issue exists without protection
    expect(processed_html_without_protection).not.toContain('{{ url("/images/portrait_footer.png") }}');
    
    // Process with template protection
    const protected_html = protectTemplates(testHtml);
    const inlined_html = juice.inlineContent(protected_html, testCss);
    const hyped_html = hypeJuicedHtml(inlined_html);
    const processed_html = postHypeCss(hyped_html, { basePx: 16 });
    const final_html = restoreTemplates(processed_html);
    
    // Verify that the issue is fixed with protection
    expect(final_html).toContain('{{ url("/images/portrait_footer.png") }}');
    expect(final_html).toContain('object-fit: cover');
    expect(final_html).toContain('margin-top: 12px');
  });
});
