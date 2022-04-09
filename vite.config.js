import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import viteRestart from 'vite-plugin-restart';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import { parse } from 'node-html-parser';

// https://vitejs.dev/config/

function parseFile(html) {
  const root = parse(html);
  const scripts = root.querySelectorAll('script');
  const links = root.querySelectorAll('link');
  const meta = root.querySelectorAll('meta');

  // eslint-disable-next-line no-console
  scripts.forEach((script) => {
    const initialSrc = script.getAttribute('src');
    const newSrc = initialSrc.replace('./', 'http://localhost:3300/');
    script.setAttribute('src', newSrc);
  });

  links.forEach((link) => {
    const initialValue = link.getAttribute('href');
    const newValue = initialValue.replace('./', 'http://localhost:3300/');
    link.setAttribute('href', newValue);
  });

  return {
    scripts,
    links,
    meta,
  };
}

/** TODO: Make option */
const template = ({ scripts, links, meta }) => {
  return `
{% html at head %}
<script type="module" src="http://localhost:3300/@vite/client"></script>
${meta.toString()}
${links.toString()}
{% endhtml %}
{% html at endBody %}${scripts.toString()}{% endhtml %}
`;
};

/** TODO: Make option */
const outputFile = './templates/_partials/vite.twig';

function twigTest(options = {}) {
  let config = null;
  return {
    name: 'twig:test',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    buildStart({ input }) {
      const inputFile = fs.readFileSync(input);
      const { scripts, links, meta } = parseFile(inputFile.toString());
      // eslint-disable-next-line no-console
      console.log({ config });
      fs.writeFileSync(outputFile, template({ scripts, links, meta }));
    },
    transformIndexHtml(html) {
      const { scripts, links, meta } = parseFile(html);
      fs.writeFileSync(outputFile, template({ scripts, links, meta }));
    },
  };
}

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
        input: './src/index.html',
      },
    },
    plugins: [
      twigTest(),
      sassGlobImports(),
      viteRestart({
        reload: ['./templates/**/*'],
      }),
    ],
  };
});
