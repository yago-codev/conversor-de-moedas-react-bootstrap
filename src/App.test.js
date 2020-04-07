import React from "react";
import ReactDOM from "react-dom";
import CurrencyConverter from "./CurrencyConverter";

test("should render the component without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CurrencyConverter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
