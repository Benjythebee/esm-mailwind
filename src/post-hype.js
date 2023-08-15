
const remToPx = (string, basePx) => {
  // rem to px
  const pxed = string.replace(
    /([\d.-]+rem)/gi,
    (_, value) => `${parseFloat(value.replace(/rem$/, "")) * basePx}px`
  );
  return pxed;
};

/**
 * 
 * @param {string} emailHtml 
 * @param {Object} options {basePx}: The base px value for 1rem, by default 16;
 * @returns 
 */
const postHypeCss = (emailHtml,options) => {
  /**
   * Convert all px to rem
   */
  const basePx = options?.basePx ?? 16;
  const final = remToPx(emailHtml, basePx);

  return final;
};

export default postHypeCss