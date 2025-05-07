// src/lib/siteSettingsToCSS.js

export function siteSettingsToCSS(settings) {
    if (!settings) return '';
  
    let css = ':root {\n';
  
    // Colors
    if (settings.colors) {
      for (const [key, value] of Object.entries(settings.colors)) {
        css += `  --color-${key}: ${value.hex};\n`;
      }
    }
  
    // Typography
    if (settings.typography) {
      for (const [tag, config] of Object.entries(settings.typography)) {
        if (config.fontSize)
          css += `  --${tag}-font-size: ${config.fontSize}${config.fontSizeUnit || 'px'};\n`;
        if (config.lineHeight)
          css += `  --${tag}-line-height: ${config.lineHeight};\n`;
        if (config.fontWeight)
          css += `  --${tag}-font-weight: ${config.fontWeight};\n`;
        if (config.googleFont)
          css += `  --${tag}-font-family: '${config.googleFont}', sans-serif;\n`;
      }
    }
  
    css += '}\n';
  
    // Apply styles to headings & body
    css += '\n';
    for (const tag of ['h1', 'h2', 'h3', 'h4', 'h5', 'body']) {
      css += `${tag} {\n`;
      css += `  font-size: var(--${tag}-font-size, inherit);\n`;
      css += `  line-height: var(--${tag}-line-height, normal);\n`;
      css += `  font-weight: var(--${tag}-font-weight, normal);\n`;
      css += `  font-family: var(--${tag}-font-family, inherit);\n`;
      css += '}\n\n';
    }
  
    css += `body {\n  color: var(--color-text);\n  background-color: var(--color-background);\n}`;
  
    return css;
  }
  