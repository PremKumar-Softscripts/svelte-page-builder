import client from '$lib/sanityClient';  // Import the Sanity client
import { getHeroSectionQuery } from '$lib/queries/getHeroSectionQuery';  // Import the query

export async function load() {
  try {
    // Fetch the hero section data
    const heroSectionData = await client.fetch(getHeroSectionQuery);

    // Handle the case where multiple hero sections might exist
    const heroSection = heroSectionData[0];

    // Return the hero section data to be used in the component
    return {
      heroSection,
    };
  } catch (error) {
    console.error('Error fetching hero section data:', error);
    return {
      heroSection: null,  // Handle error by passing null or fallback data
    };
  }
}
