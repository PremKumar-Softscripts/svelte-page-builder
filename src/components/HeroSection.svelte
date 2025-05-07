<script lang="ts">
    export let block;
  
    // Default background style based on the block type
    $: backgroundStyle =
      block.backgroundType === 'color'
        ? block.backgroundColor || 'transparent'
        : block.backgroundType === 'gradient'
        ? block.backgroundGradient || 'transparent'
        : block.backgroundType === 'image' && block.backgroundImage?.asset?.url
        ? `url(${block.backgroundImage.asset.url}) no-repeat center / cover`
        : 'transparent';
  </script>
  
  <section
    id={block.advanced?.cssId}
    class={block.advanced?.cssClass}
    style={`background: ${backgroundStyle};
      height: ${block.height};
      color: ${block.textColor};
      margin: ${block.advanced?.margin};
      padding: ${block.advanced?.padding};
      z-index: ${block.advanced?.zIndex};
      position: ${block.advanced?.position};`}
  >
    {#if block.backgroundType === 'video' && block.backgroundVideo?.asset?.url}
      <video
        autoplay
        muted
        loop
        playsinline
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;"
      >
        <source src={block.backgroundVideo.asset.url} type="video/mp4" />
      </video>
    {/if}
  
    <div class="hero-content" style="text-align: {block.alignment}">
      {#if block.title}
        <h2>{block.title}</h2>
        <p>{block.subtitle}</p>
      {:else}
        <div>Loading hero section...</div>
      {/if}
  
      {#if block.buttons}
        <div class="hero-buttons">
          {#each block.buttons as button}
            <a href={button.url} target={button.openInNewTab ? '_blank' : '_self'}>
              {button.text}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </section>
  