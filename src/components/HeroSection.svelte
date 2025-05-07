<script lang="ts">
  import { urlFor } from '$lib/sanityClient';
  export let block;

  const isImageBg = block.backgroundType === 'image' && block.backgroundImage?.asset;
  const isColorBg = block.backgroundType === 'color' && block.backgroundColor;
  const isVideoBg = block.backgroundType === 'video' && block.backgroundVideo?.asset?.url;

  const backgroundImageUrl = isImageBg
    ? urlFor(block.backgroundImage).width(1600).auto('format').url()
    : '';

  // Font styles for title and subtitle
  const titleStyles = `
    font-family: ${block.titleTypography?.fontFamily || 'inherit'};
    font-size: ${block.titleTypography?.fontSize || '3rem'};
    font-weight: ${block.titleTypography?.fontWeight || '700'};
    line-height: ${block.titleTypography?.lineHeight || '0'};
  `;

  const subtitleStyles = `
    font-family: ${block.subtitleTypography?.fontFamily || 'inherit'};
    font-size: ${block.subtitleTypography?.fontSize || '1.25rem'};
    font-weight: ${block.subtitleTypography?.fontWeight || '400'};
    line-height: ${block.subtitleTypography?.lineHeight || '1.5'};
  `;
</script>

<section
  id={block.advanced?.cssId}
  class={block.advanced?.cssClass}
  style={`
    height: ${block.height || '60vh'};
    color: ${block.textColor || '#fff'};
    margin: ${block.advanced?.margin};
    padding: ${block.advanced?.padding};
    z-index: ${block.advanced?.zIndex};
    position: ${block.advanced?.position || 'relative'};
    text-align: ${block.alignment || 'center'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    ${isImageBg ? `background-image: url('${backgroundImageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;` : ''}
    ${isColorBg ? `background-color: ${block.backgroundColor};` : ''}
  `}
>
  {#if isVideoBg}
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

  <div class="hero-content" style="z-index: 1;">
    {#if block.title}
      <h2 style={titleStyles}>
        {block.title}
      </h2>
      {#if block.subtitle}
        <p style={subtitleStyles}>
          {block.subtitle}
        </p>
      {/if}
    {:else}
      <div>Loading hero section...</div>
    {/if}

    {#if block.buttons?.length}
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
