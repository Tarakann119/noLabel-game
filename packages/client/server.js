import axios from "axios";
import cookieParser from 'cookie-parser';
import express from "express";
import fs from "node:fs";
import path from "node:path";


const instance = axios.create({
  baseURL: 'https://ya-praktikum.tech',
  withCredentials: true,
});

class YandexAPISSR {
  constructor(_cookieHeader) {
    this._cookieHeader = _cookieHeader;
  }

  async getCurrent() {
    const { data: result } = await instance.get("/api/v2/auth/user", {
      headers: {
        cookie: this._cookieHeader,
      },
    });

    return result;
  }
}

async function start() {
  const port = Number(process.env.CLIENT_PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';
  const indexProd = isProduction
    ? fs.readFileSync(path.resolve('dist/client/index.html'), 'utf-8')
    : '';
  const root = process.cwd();

  const app = express();

  app.use(cookieParser());
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProduction) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(path.resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProduction) {
        template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = indexProd;
        render = (await import('./dist/server/entry-server.js')).render;
      }


      const { html, initialState } = await render(url, new YandexAPISSR(req.headers["cookie"]));

      const cssDir = path.resolve('dist/client/assets');
      const files = fs.readdirSync(cssDir);

      const cssFiles = files.filter((file) => path.extname(file) === '.css');
      let css = '';

      if (cssFiles.length > 0) {
        css = cssFiles.map((cssFile) => fs.readFileSync(path.join(cssDir, cssFile))).join('\n');
      } else {
        console.error('No CSS files found in directory:', cssDir);
      }

      const htmlWithReplacements = template
        .replace(`<!--app-html-->`, html)
        .replace(`<!--css-->`, `${css ? `<style>${css}</style>` : ''} `)
        .replace(`<!--store-data-->`, JSON.stringify(initialState)
        .replace(/</g, '\\u003c'));
      res.status(200).set({ "Content-Type": "text/html" }).end(htmlWithReplacements);
    } catch (e) {
      !isProduction && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

start();
