import { json } from '@sveltejs/kit';
import sanity from '$lib/sanityClient';
import { getPageQuery } from '$lib/queries/getPageQuery';

export async function GET({ params }) {
  const { slug } = params;

  try {
    const page = await sanity.fetch(getPageQuery, { slug });

    if (!page) {
      return json({ error: 'Page not found' }, { status: 404 });
    }

    return json(page);
  } catch (e) {
    console.error('Sanity fetch failed:', e);
    return json({ error: 'Failed to load page' }, { status: 500 });
  }
}
