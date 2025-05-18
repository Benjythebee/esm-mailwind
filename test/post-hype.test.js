import postHypeCss from '../src/post-hype.js';

describe('Post-processing CSS', () => {
  test('should convert rem to px using default base px', () => {
    const html = '<div style="margin-top: 1rem; padding: 0.5rem;">Test</div>';
    const processed = postHypeCss(html);
    
    expect(processed).toContain('margin-top: 16px');
    expect(processed).toContain('padding: 8px');
  });

  test('should convert rem to px using custom base px', () => {
    const html = '<div style="margin-top: 1rem; padding: 0.5rem;">Test</div>';
    const processed = postHypeCss(html, { basePx: 10 });
    
    expect(processed).toContain('margin-top: 10px');
    expect(processed).toContain('padding: 5px');
  });

  test('should handle multiple rem values correctly', () => {
    const html = '<div style="margin: 1rem 2rem 0.5rem 1.5rem;">Test</div>';
    const processed = postHypeCss(html);
    
    expect(processed).toContain('margin: 16px 32px 8px 24px');
  });

  test('should not affect non-rem values', () => {
    const html = '<div style="margin-top: 10px; width: 100%;">Test</div>';
    const processed = postHypeCss(html);
    
    expect(processed).toContain('margin-top: 10px');
    expect(processed).toContain('width: 100%');
  });
});
