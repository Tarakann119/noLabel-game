import express from "express";
import fs from "node:fs";
import path from "node:path";

async function start() {
  const port = Number(process.env.CLIENT_PORT) || 3000;
  const isProduction = process.env.NODE_ENV === "production";
  const indexProd = isProduction ? fs.readFileSync(path.resolve("dist/client/index.html"), "utf-8") : "";
  const root = process.cwd();

  const app = express();

  let vite;
  if (!isProduction) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(path.resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProduction) {
        template = fs.readFileSync(path.resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = indexProd;
        render = (await import("./dist/server/entry-server.js")).render;
      }

      const { html, initialState } = render(url);

      const cssDir = path.resolve('dist/client/assets');
      const files = fs.readdirSync(cssDir);

      const cssFile = files.find(file => path.extname(file) === '.css');
      let css;
      // If a CSS file was found, read its contents
      if (cssFile) {
        css = fs.readFileSync(path.join(cssDir, cssFile));
      } else {
        console.error('No CSS file found in directory:', cssDir);
      }

      const htmlWithReplacements = template
        .replace(`<!--app-html-->`, html)
        .replace(`<!--css-->`, `<style>${css}</style>`)
        .replace(`<!--store-data-->`, JSON.stringify(initialState).replace(/</g, "\\u003c"));

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
