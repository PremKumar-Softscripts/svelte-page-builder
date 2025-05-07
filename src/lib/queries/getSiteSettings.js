// src/lib/queries/getSiteSettings.js
export const getSiteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    "favicon": favicon.asset->url,
    typography,
    colors
  }
`;
