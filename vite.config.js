import { defineConfig, loadEnv } from 'vite';
import viteRestart from 'vite-plugin-restart';
import { vitePluginCraftCms } from 'vite-plugin-craftcms';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/

export default defineConfig(({ _command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: '/dist/',
    publicDir: './src/static',
    server: {
      port: process.env.VITE_DEV_PORT || 3000,
      host: true,
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
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      sassGlobImports(),
      viteRestart({
        reload: ['./templates/**/*'],
      }),
      vitePluginCraftCms({
        outputFile: './templates/_partials/vite.twig',
        devServerBaseAddress: process.env.VITE_DEV_BASE_ADDRESS || 'http://localhost',
      }),
    ],
  };
});
