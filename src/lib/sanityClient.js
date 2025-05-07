import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true
});

export default client;
