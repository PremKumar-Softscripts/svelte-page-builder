<script lang="ts">
import HeroSection from '../../components/HeroSection.svelte';
  export let data;
  console.log(data.page.content);
</script>

<main>
  <h1>{data.page.title}</h1>

  {#each data.page.content as block (block._key)}
    {#if block._type === 'heroSection'}
      <HeroSection {block} />

    {:else if block._type === 'builderBlock'}
      {#each block.block as nested (nested._key)}
        {#if nested._type === 'heroSection'}
          <HeroSection block={nested} />
        {:else}
          <div class="unknown-nested-block">Unknown nested block type: {nested._type}</div>
        {/if}
      {/each}

    {:else}
      <div class="unknown-block">Unknown block type: {block._type}</div>
    {/if}
  {/each}
</main>
