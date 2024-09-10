import React from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import style from "./SwapButton.module.css";
const SwapButton = ({ swapCurrencies, isLoading }) => (
  <button onClick={swapCurrencies} disabled={isLoading} className={style.btn}>
    <IoSwapHorizontal />
  </button>
);

export default SwapButton;
