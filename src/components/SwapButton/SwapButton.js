import React from "react";
import { IoSwapHorizontal } from "react-icons/io5";

const SwapButton = ({ swapCurrencies, isLoading }) => (
  <button onClick={swapCurrencies} disabled={isLoading} className="btn">
    <IoSwapHorizontal />
  </button>
);

export default SwapButton;
