# Stencil Remix
Repro case for https://github.com/ionic-team/stencil-ds-output-targets/issues/226

I haven't tried to transpile the modules with babel yet, if I get it working I'll add another branch and update this readme. Remix is an SSR framework so, even after transpiling, there will likely be additional complications using web components, which rely on browser APIs.

### Update
[Remix does not support prerendering at this time.](https://github.com/remix-run/remix/issues/179) I was able to get the components to [render on the client](https://github.com/benelan/stencil-remix/blob/fix/app/routes/index.jsx) on the [`fix` branch](https://github.com/benelan/stencil-remix/tree/fix#stencil-remix). However, you might as well use CRA if you can't render your UI on the server. The better option is to use NextJS or another framework that supports prerendering.


## Repro Setup/Steps

1. `npx create-remix@latest`
    - Named `stencil-remix`
    - Remix App Server
    - JavaScript
    - Run `npm install`
2. `cd stencil-remix`
3. Downgrade `react` and `react-dom` from `17.02` to `16.7.0` due to output target peer deps
4. `npm i @esri/calcite-components-react`
5.  Add stencil code to `app/root.jsx`:
``` diff
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
+ import { setAssetPath } from "@esri/calcite-components/dist/components";
+ import "@esri/calcite-components/dist/components/calcite-button.js";
+ import { CalciteButton } from "@esri/calcite-components-react";
+ setAssetPath("https://js.arcgis.com/calcite-components/1.0.0-beta.76/assets");

export function meta() {
  return { title: "New Remix App" };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
+       <CalciteButton>Button</CalciteButton>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
```
7. `npm run dev`
8. Open app in the browser
9. Error:
```bash
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';
^^^^^^

SyntaxError: Unexpected token 'export'
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1031:15)
    at Module._compile (node:internal/modules/cjs/loader:1065:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/home/ben/dev/stencil-remix/build/index.js:408:36)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
GET / 500 - - 29.345 ms
```


---

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
