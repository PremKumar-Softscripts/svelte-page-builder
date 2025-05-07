<script>
    import { onMount } from 'svelte';
  
    let menu = null;
  
    onMount(async () => {
      try {
        const res = await fetch('/api/header');
        if (res.ok) {
          menu = await res.json();
          console.log('Fetched menu:', menu); // 👈 Inspect this in browser console
        } else {
          console.error('Failed to load header');
        }
      } catch (e) {
        console.error('Fetch error:', e);
      }
    });
</script>
  
{#if menu}
  <header>
    {#if menu.headerLogo && menu.headerLogo.asset}
      <img src="{menu.headerLogo.asset.url}" alt="Logo" />
    {/if}
    <h1>{menu.title}</h1>
    <nav>
      <ul>
        {#each menu.items as item}
          <li>
            <!-- Dynamically link to the slug of each menu item -->
            <a href="/{item.page.slug}">{item.title}</a>
            {#if item.hasSubmenu && item.submenuItems}
              <ul>
                {#each item.submenuItems as submenu}
                  <li><a href="/{submenu.page.slug}">{submenu.title}</a></li> <!-- Dynamically link to the submenu slug -->
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    </nav>
  </header>
{:else}
  <p>Loading header...</p>
{/if}
