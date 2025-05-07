<script context="module" lang="ts">
    export async function load({ params }) {
      const { slug } = params;  // Get the slug from the URL
  
      const res = await fetch(`/api/pages/${slug}`);
      const pageData = await res.json();
  
      if (!pageData) {
        return {
          status: 404,
          error: new Error('Page not found')
        };
      }
  
      return {
        props: {
          page: pageData
        }
      };
    }
  </script>
  
  <script>
    export let page;
  </script>
  
  <main>
    <h1>{page.title}</h1>
    <div>{@html page.content}</div>  <!-- Assuming the content has HTML -->
  </main>
  