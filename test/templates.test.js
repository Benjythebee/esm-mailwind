import { protectTemplates, restoreTemplates } from '../src/templates.js';

describe('Template Protection', () => {
  afterEach(() => {
    // Reset the template map after each test
    restoreTemplates(''); // This will clear the map
  });

  test('should protect and restore simple template expressions', () => {
    const html = '<div>{{ variable }}</div>';
    const protected_html = protectTemplates(html);
    
    // Check that the template was replaced with a placeholder
    expect(protected_html).not.toContain('{{ variable }}');
    expect(protected_html).toMatch(/^<div>__TEMPLATE_.+__<\/div>$/);
    
    // Restore and verify it's back to the original
    const restored_html = restoreTemplates(protected_html);
    expect(restored_html).toBe(html);
  });

  test('should handle templates with quotes correctly', () => {
    const html = '<img src="{{ url("/images/portrait_footer.png") }}" class="object-cover mt-3">';
    const protected_html = protectTemplates(html);
    
    // Check that the template was replaced with a placeholder
    expect(protected_html).not.toContain('{{ url("/images/portrait_footer.png") }}');
    expect(protected_html).toMatch(/^<img src="__TEMPLATE_.+__" class="object-cover mt-3">$/);
    
    // Restore and verify it's back to the original
    const restored_html = restoreTemplates(protected_html);
    expect(restored_html).toBe(html);
  });

  test('should handle multiple templates in the same HTML', () => {
    const html = '<div>{{ header }}</div><p>{{ content }}</p>';
    const protected_html = protectTemplates(html);
    
    // Check that both templates were replaced
    expect(protected_html).not.toContain('{{ header }}');
    expect(protected_html).not.toContain('{{ content }}');
    
    // Restore and verify it's back to the original
    const restored_html = restoreTemplates(protected_html);
    expect(restored_html).toBe(html);
  });

  test('should handle nested quotes in templates', () => {
    const html = '<a href="{{ url(\'page\', {"id": "123", "name": "test"}) }}">Link</a>';
    const protected_html = protectTemplates(html);
    
    // Check that the template was replaced with a placeholder
    expect(protected_html).not.toContain('{{ url(\'page\', {"id": "123", "name": "test"}) }}');
    
    // Restore and verify it's back to the original
    const restored_html = restoreTemplates(protected_html);
    expect(restored_html).toBe(html);
  });

  test('should handle no templates at all', () => {
    const html = '<a href="https://google.com/?a=someflag">Link</a>';
    const protected_html = protectTemplates(html);
    
    // Check that the url is untouched
    expect(protected_html).toContain('"https://google.com/?a=someflag"');
    
    // Restore and verify it's back to the original
    const restored_html = restoreTemplates(protected_html);
    expect(restored_html).toBe(html);
  });

});