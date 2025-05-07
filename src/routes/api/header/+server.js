import { json } from '@sveltejs/kit';
import sanity from '$lib/sanityClient'; 
import { getHeaderQuery } from '$lib/queries/getHeaderQuery'; 

export async function GET() {
  try {
    const menu = await sanity.fetch(getHeaderQuery); 
    return json(menu);  
  } catch (error) {
    console.error('Sanity fetch failed:', error);
    return json({ error: 'Failed to load header' }, { status: 500 });
  }
}
