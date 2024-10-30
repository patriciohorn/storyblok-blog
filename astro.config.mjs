import { defineConfig } from 'astro/config';

// Tailwind
import tailwind from '@astrojs/tailwind';

// Storyblok
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
// Setting Up HTTPS on localhost in Astro
import basicSsl from '@vitejs/plugin-basic-ssl';

// Astro config giled does not normally suppor env variables, using loadEnv function from vite to load them
const env = loadEnv('', process.cwd(), 'STORYBLOK');

const { RUNNING_LOCALLY, STORYBLOK_ACESS_TOKEN, STORYBLOK_IS_PREVIEW } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ''
);
const isLocal = RUNNING_LOCALLY === 'yes';

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        blogPost: 'storyblok/BlogPost',
        blogPostList: 'storyblok/BlogPostList',
        page: 'storyblok/Page'
      },
      apiOptions: {
        // Choose your Storyblok space region
        region: 'us' // optional,  or 'eu' (default)
      }
    }),
    tailwind()
  ],
  ...(isLocal && {
    vite: {
      plugins: [basicSsl()],
      server: {
        https: true
      }
    }
  })
});
