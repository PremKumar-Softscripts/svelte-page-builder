import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const { slug } = params;
  const res = await fetch(`/api/pages/${slug}`);

  if (!res.ok) {
    throw error(404, 'Page not found');
  }

  const page = await res.json();

  return {
    page
  };
}
