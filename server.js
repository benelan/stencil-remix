const express = require("express");
const remix = require("@remix-run/express");
const stencil = require("@esri/calcite-components/hydrate");
const port = process.env.PORT || 3000;

const app = express();

app.all("*", remix.createRequestHandler({ build: require("./build") }));

app.all("*", async (req, res) => {
  // this is how it works in NextJS
  const html = await app.renderToHTML(req, res, req.path, req.query);
  const renderedHtml = await stencil.renderToString(html);
  return res.send(renderedHtml.html);
});

app.listen(port, () => {
  console.log(`> http://localhost:${port}`);
});
