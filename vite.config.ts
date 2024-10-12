import { readFileSync } from 'fs';

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    {
      name: 'set-headers',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((_, res, next) => {
          res.setHeader('Access-Control-Allow-Private-Network', 'true');
          next();
        });
      },
    },
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: `data:image/png;base64,${readFileSync('./assets/honkoku.png').toString('base64')}`,
        namespace: 'https://mkpo.li/',
        match: ['https://honkoku.org/app/'],
      },
    }),
  ],
  resolve: {
    alias: {
      $lib: '/src/lib',
    },
  },
});
