<!-- src/components/ImageBlock.svelte -->
<script lang="ts">
    import { urlFor } from '$lib/sanityClient';
    export let block;
  </script>
  
  <section
    id={block.advanced?.cssId}
    class={block.advanced?.cssClass}
    style={`
      height: ${block.height};
      margin: ${block.advanced?.margin};
      padding: ${block.advanced?.padding};
      z-index: ${block.advanced?.zIndex};
      position: ${block.advanced?.position};
      text-align: ${block.alignment};
    `}
  >
    {#if block.image?.asset}
      <a href={block.link} target="_blank" rel="noopener noreferrer">
        <img
          src={urlFor(block.image).width(1000).url()}
          alt={block.altText || 'Image'}
          style={`
            width: ${block.width || '100%'};
            height: ${block.height || 'auto'};
            border-radius: ${block.borderRadius || '0'};
            box-shadow: ${block.boxShadow || 'none'};
            transition: all 0.3s ease;
          `}
          class:hoverEffect={block.hoverEffect}
        />
      </a>
    {/if}
  </section>
  
  <style>
    img.hoverEffect\:zoom:hover {
      transform: scale(1.1);
    }
  
    img.hoverEffect\:fade:hover {
      opacity: 0.7;
    }
  
    img.hoverEffect\:grayscale:hover {
      filter: grayscale(100%);
    }
  
    img.hoverEffect\:blur:hover {
      filter: blur(4px);
    }
  </style>
  