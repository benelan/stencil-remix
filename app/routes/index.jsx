import { useState, useEffect } from "react";
import { ClientOnly, useHydrated } from "remix-utils";
import "@esri/calcite-components/dist/calcite/calcite.css";

function Index() {
  const hydrated = useHydrated();
  
  useEffect(() => {
    require("@esri/calcite-components/dist/components/calcite-button.js");
    require("@esri/calcite-components/dist/components/calcite-input.js");
    require("@esri/calcite-components/dist/components/calcite-card.js");
    require("@esri/calcite-components/dist/components/calcite-link.js");
  }, []);

  return (
    <>
      <h1>Stencil components in Remix.run</h1>
      <p>If you're forcing the components to load on the client like this, then you might as well use CRA.</p>
      <ClientOnly fallback={<p>Loading...</p>}>
        <calcite-button  onClick={() => alert("I has JS loaded!")}>Calcite Button</calcite-button>
        <calcite-input type="time" />
        <div>
          <calcite-card>
            <span slot="title">Card title</span>
            <span slot="subtitle">
              by &nbsp;<calcite-link href>username</calcite-link>
            </span>
            <div>
              Created: Jan 1, 2020
              <br />
              Updated: Feb 2, 2021
            </div>
          </calcite-card>
        </div>
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
