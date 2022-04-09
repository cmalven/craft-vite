import { parse } from 'node-html-parser';
import fs from 'fs';
import path from 'path';

/**
 * Separate our HTML string into the parts we care about
 * @param html
 * @returns {{meta: HTMLElement[], links: HTMLElement[], scripts: HTMLElement[]}}
 */
function parseFile(html) {
  const root = parse(html);
  const scripts = root.querySelectorAll('script');
  const links = root.querySelectorAll('link');
  const meta = root.querySelectorAll('meta');

  return {
    scripts,
    links,
    meta,
  };
}

export default function craftPartials(options = {}) {
  const { outputFile, template } = Object.assign(
    {},
    {
      outputFile: './templates/_partials/vite.twig',
      template({ scripts, links, meta, proxyUrl, mode = 'production' }) {
        const scriptTags = scripts.map((script) => {
          script.setAttribute(
            'src',
            script.getAttribute('src').replace('./', `${proxyUrl}/src/`),
          );
          return script;
        });

        const linkTags = links.map((link) => {
          link.setAttribute(
            'href',
            link.getAttribute('href').replace('./', `${proxyUrl}/src/`),
          );
          return link;
        });

        let templateString = `{% html at head %}${meta.toString()}${linkTags.toString()}{% endhtml %}
{% html at endBody %}${scriptTags.toString()}{% endhtml %}`;

        if (mode === 'development') {
          templateString = `<script type="module" src="${proxyUrl}/@vite/client"></script>${templateString}`;
        }

        return templateString;
      },
    },
    options,
  );

  let config = null;
  let proxyUrl = null;
  return {
    name: 'twig:test',
    configResolved(resolvedConfig) {
      config = resolvedConfig;

      const { server } = config;
      proxyUrl = `http://localhost:${server.port}`;
    },
    buildStart({ input }) {
      const { mode } = config;
      if (mode === 'production') {
        return;
      }

      const inputFile = fs.readFileSync(input);
      const { scripts, links, meta } = parseFile(inputFile.toString(), {});

      fs.writeFileSync(
        outputFile,
        template({ scripts, links, meta, mode, proxyUrl }),
      );
    },

    transformIndexHtml(html) {
      const { mode } = config;
      if (mode !== 'production') {
        return;
      }

      const { scripts, links, meta } = parseFile(html);
      fs.writeFileSync(outputFile, template({ scripts, links, meta, mode }));
    },
    closeBundle() {
      console.log('Removing src files in dist ...');
      fs.rmSync(path.resolve(config.publicDir, './src'), {
        recursive: true,
        force: true,
      });
    },
  };
}
