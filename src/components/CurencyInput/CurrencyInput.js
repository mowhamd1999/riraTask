import React from "react";
import style from './CurrencyInput.module.css'
const CurrencyInput = ({ amount, currency, onCurrencyChange, onAmountChange, isLoading, error }) => {
  return (
    <div className={style.secound}>
      {onAmountChange && (
        <>
          <label htmlFor="amount" className={style.amount_label}>مقدار</label>
          <div className="first">
            <span>{currency === "USD" ? "$" : currency === "IRR" ? "ریال" : "€"}</span>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={onAmountChange}
              disabled={isLoading}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
      <label htmlFor="currency" className={style.amount_label}>ارز</label>
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        disabled={isLoading}
        id="currency"
      >
        <option value="USD">USD - US Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="IRR">IRR - Iranian Rial</option>
      </select>
    </div>
  );
};

export default CurrencyInput;
