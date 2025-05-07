export const getPageQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    title,
    content[] {
      _type,
      _key,
      title,
      subtitle,
      buttons[] {
        text,
        url,
        openInNewTab
      },
      backgroundType,
      backgroundColor,
      backgroundImage {
        asset-> {
          url
        }
      },
      backgroundVideo {
        asset-> {
          url
        }
      },
      backgroundGradient,
      height,
      alignment,
      textColor,
      titleTypography {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight
      },
      subtitleTypography {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight
      },
      advanced {
        margin,
        padding,
        zIndex,
        position,
        cssId,
        cssClass
      },
      block
    }
  }
`;
