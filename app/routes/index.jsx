import { useEffect } from "react";
import { ClientOnly, useHydrated } from "remix-utils";
import styles from "@esri/calcite-components/dist/calcite/calcite.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Index() {
  const hydrated = useHydrated();

  useEffect(() => {
    const {
      setAssetPath,
    } = require("@esri/calcite-components/dist/components");
    setAssetPath(
      "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
    );
    require("@esri/calcite-components/dist/components/calcite-button.js");
    require("@esri/calcite-components/dist/components/calcite-card.js");
    require("@esri/calcite-components/dist/components/calcite-link.js");
    require("@esri/calcite-components/dist/components/calcite-icon.js");
  }, []);

  return (
    <>
      <h1>Stencil components in Remix.run</h1>
      <p>
        If you're forcing the components to load on the client like this, then
        you might as well use CRA.
      </p>
      <ClientOnly fallback={<p>Loading...</p>}>
        <calcite-card>
          <span slot="title">Card title</span>
          <span slot="subtitle">
            by &nbsp;<calcite-link href>username</calcite-link>
          </span>
          <div>
            Created: Jan 1, 2020
            <br />
            Updated: Feb 2, 2021
            <br />
            View Count: 0
          </div>
          <calcite-button
            onClick={() => alert("I'm a working button")}
            slot="footer-leading"
            color="light"
            scale="s"
            icon-start="plus"
          ></calcite-button>
          <div slot="footer-trailing">
            <calcite-button
              onClick={() => alert("I'm a working button")}
              color="light"
              id="card-icon-test-2"
              icon-start="layer"
            ></calcite-button>
            <calcite-button
              onClick={() => alert("I'm a working button")}
              color="light"
              id="card-icon-test-1"
              icon-start="attachment"
            ></calcite-button>
          </div>
        </calcite-card>

        {/* https://github.com/remix-run/remix/tree/main/examples/client-only-components */}
        <button
          type="button"
          disabled={!hydrated}
          onClick={() => alert("I has JS loaded!")}
        >
          Try me!
        </button>
      </ClientOnly>
    </>
  );
}

export default Index;
