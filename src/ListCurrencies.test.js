import React from "react";
import ReactDOM from "react-dom";
import ListCurrencies from "./components/ListCurrencies/index.js";

describe("testing the coin listing component", () => {
  it("should render the component without errors", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListCurrencies />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
