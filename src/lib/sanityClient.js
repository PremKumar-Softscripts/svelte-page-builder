// src/lib/sanityClient.js

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create the Sanity client instance
const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Function to generate the image URL
export const urlFor = (source) => builder.image(source);

export default client;
