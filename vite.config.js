import { defineConfig, loadEnv } from 'vite';
import viteRestart from 'vite-plugin-restart';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import craftPartials from './vite-plugin-craft-partials';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: command === 'serve' ? '' : '/dist/',
    publicDir: './web/dist',
    server: {
      port: process.env.VITE_DEV_PORT || 3000,
    },
    build: {
      emptyOutDir: true,
      manifest: true,
      outDir: './web/dist/',
      rollupOptions: {
        input: './src/entry.html',
      },
    },
    plugins: [
      craftPartials(),
      sassGlobImports(),
      viteRestart({
        reload: ['./templates/**/*'],
      }),
    ],
  };
});
