// src/routes/api/site-settings/+server.js
import { json } from '@sveltejs/kit';
import sanity from '$lib/sanityClient';
import { getSiteSettingsQuery } from '$lib/queries/getSiteSettings';

export async function GET() {
  try {
    const settings = await sanity.fetch(getSiteSettingsQuery);
    return json(settings);
  } catch (err) {
    console.error('Failed to fetch site settings:', err);
    return json({ error: 'Failed to load site settings' }, { status: 500 });
  }
}
