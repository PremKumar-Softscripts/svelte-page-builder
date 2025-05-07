// src/lib/queries/imageBlock.js
import client from './sanityClient';

export const fetchImageBlock = async () => {
  const query = `*[_type == "imageBlock"]{
    title,
    imageBlock {
      image{
        asset->{
          _id,
          url
        }
      },
      altText,
      link,
      alignment,
      width,
      height,
      borderRadius,
      boxShadow,
      hoverEffect,
      advanced {
        margin,
        padding,
        zIndex,
        position,
        cssId,
        cssClass
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
};
