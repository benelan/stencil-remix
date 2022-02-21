import { useEffect } from "react";
import {
  CalciteCard,
  CalciteButton,
  CalciteLink,
} from "@esri/calcite-components-react";
import styles from "@esri/calcite-components/dist/calcite/calcite.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Index() {
  useEffect(() => {
    import("@esri/calcite-components/dist/components").then(
      ({ setAssetPath }) =>
        setAssetPath(
          "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
        )
    );

    import("@esri/calcite-components/dist/components/calcite-button.js");
    import("@esri/calcite-components/dist/components/calcite-card.js");
    import("@esri/calcite-components/dist/components/calcite-link.js");
    import("@esri/calcite-components/dist/components/calcite-icon.js");
  }, []);

  return (
    <>
      <h1>Stencil components in Remix.run</h1>
      <p>
        If you're forcing the components to load on the client like this, then
        you might as well use CRA. Or better yet, an SSR framework that supports
        pre-rendering.
      </p>
      <CalciteCard>
        <span slot="title">Card title</span>
        <span slot="subtitle">
          by &nbsp;<CalciteLink href>username</CalciteLink>
        </span>
        <div>
          Created: Jan 1, 2020
          <br />
          Updated: Feb 2, 2021
          <br />
          View Count: 0
        </div>
        <CalciteButton
          onClick={() => alert("client code")}
          slot="footer-leading"
          color="light"
          scale="s"
          icon-start="plus"
        ></CalciteButton>
        <div slot="footer-trailing">
          <CalciteButton
            onClick={() => alert("client code")}
            color="light"
            id="card-icon-test-2"
            icon-start="layer"
          ></CalciteButton>
          <CalciteButton
            onClick={() => alert("client code")}
            color="light"
            id="card-icon-test-1"
            icon-start="attachment"
          ></CalciteButton>
        </div>
      </CalciteCard>
    </>
  );
}

export default Index;
