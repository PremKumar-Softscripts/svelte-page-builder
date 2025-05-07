export const getHeaderQuery = `
  *[_type == "menu"][0] {
    title,
    headerLogo {
      asset-> {
        url
      }
    },
    items[] {
      title,
      hasSubmenu,
      page-> {
        "slug": slug.current
      },
      submenuItems[] {
        title,
        page-> {
          "slug": slug.current
        }
      }
    }
  }
`;
