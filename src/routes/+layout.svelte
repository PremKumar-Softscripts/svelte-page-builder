<script>
  import { onMount } from 'svelte';
  import { siteSettingsToCSS } from '$lib/siteSettingsToCSS';

  let menu = null;
  let siteSettings = null;

  onMount(async () => {
    try {
      const [menuRes, settingsRes] = await Promise.all([
        fetch('/api/header'),
        fetch('/api/site-settings')
      ]);

      if (menuRes.ok) menu = await menuRes.json();
      if (settingsRes.ok) siteSettings = await settingsRes.json();

      // Inject Google Fonts
      if (siteSettings?.typography) {
        Object.values(siteSettings.typography).forEach(font => {
          if (font.googleFont) {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont.replace(/\s+/g, '+')}&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
          }
        });
      }

      // Inject favicon
      if (siteSettings?.favicon) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = siteSettings.favicon;
        document.head.appendChild(link);
      }

      // Inject CSS
      const css = siteSettingsToCSS(siteSettings);
      const styleTag = document.createElement('style');
      styleTag.id = 'site-settings-css';
      styleTag.innerHTML = css;
      document.head.appendChild(styleTag);

    } catch (e) {
      console.error('Error loading global data:', e);
    }
  });
</script>

<svelte:head>
  {#if siteSettings?.siteName}
    <title>{siteSettings.siteName}</title>
  {/if}
</svelte:head>

{#if menu}
  <header>
    <div class="container">
      {#if menu.headerLogo?.asset?.url}
        <img class="logo" src="{menu.headerLogo.asset.url}" alt="Logo" />
      {/if}
      <nav>
        <ul class="nav">
          {#each menu.items as item}
            <li class="nav-item">
              <a href="/{item.page.slug}">{item.title}</a>
              {#if item.hasSubmenu && item.submenuItems}
                <ul class="submenu">
                  {#each item.submenuItems as submenu}
                    <li><a href="/{submenu.page.slug}">{submenu.title}</a></li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </header>
{:else}
  <p>Loading header...</p>
{/if}

<main>
  <slot />
</main>

<style>
  header {
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .logo {
    height: 50px;
    width: auto;
  }

  nav {
    flex: 1 1 100%;
    margin-top: 1rem;
  }

  .nav {
    list-style: none;
    display: flex;
    gap: 1rem;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
  }

  .nav-item {
    position: relative;
  }

  .nav-item > a {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 0.75rem;
    display: inline-block;
  }

  .submenu {
    position: absolute;
    background: #fff;
    border: 1px solid #ddd;
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    display: none;
    top: 100%;
    left: 0;
    min-width: 150px;
    z-index: 999;
  }

  .submenu li a {
    display: block;
    padding: 0.5rem 1rem;
    color: #333;
    text-decoration: none;
  }

  .submenu li a:hover {
    background-color: #f0f0f0;
  }

  .nav-item:hover .submenu {
    display: block;
  }

  main {
    padding: 20px;
  }

  @media (min-width: 768px) {
    nav {
      flex: 0 0 auto;
      margin-top: 0;
    }
  }
</style>
