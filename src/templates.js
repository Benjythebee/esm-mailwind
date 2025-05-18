
// 1. Create a new file src/template-protection.js
import { v4 as uuidv4 } from 'uuid';

// Store the original template strings with unique placeholders
const templateMap = new Map();

export function protectTemplates(html) {
  // Replace {{ ... }} with unique placeholders
  return html.replace(/{{\s*(.+?)\s*}}/g, (match) => {
    const placeholder = `__TEMPLATE_${uuidv4()}__`;
    templateMap.set(placeholder, match);
    return placeholder;
  });
}

export function restoreTemplates(html) {
  // Restore original template strings from placeholders
  let result = html;
  for (const [placeholder, original] of templateMap.entries()) {
    result = result.replace(placeholder, original);
  }
  templateMap.clear();
  return result;
}