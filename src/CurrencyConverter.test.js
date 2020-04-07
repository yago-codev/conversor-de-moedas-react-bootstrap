import React from "react";
import ReactDOM from "react-dom";
import CurrencyConverter from "./CurrencyConverter";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

describe("testing the currency conversion component", () => {
  it("should render the component without errors", () => {
    const div = document.createElement("div");

    ReactDOM.render(<CurrencyConverter />, div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it("simulate currency conversion", async () => {
    const { findByTestId, getByTestId } = render(<CurrencyConverter />);

    axiosMock.get.mockResolvedValueOnce({
      data: { success: true, rates: { BRL: 4.564292, USD: 1.101049 } },
    });

    fireEvent.click(getByTestId("btn-converter"));

    const modal = await findByTestId("modal");

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(modal).toHaveTextContent("1 BRL = 0.24 USD");
  });
});
