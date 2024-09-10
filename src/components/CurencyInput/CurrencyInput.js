import React from "react";

const CurrencyInput = ({
  currency,
  setCurrency,
  amount,
  handleAmountChange,
  disabled,
  currencySymbol,
  error,
}) => (
  <div className="secound">
    <label htmlFor="amount" className="amount_label">
      مقدار
    </label>
    <div className="first">
      <span className="span">{currencySymbol()}</span>
      <input
        id="amount"
        type="text"
        value={amount}
        onChange={handleAmountChange}
        disabled={disabled}
        style={{ marginLeft: "8px" }}
      />
    </div>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      disabled={disabled}
    >
      <option value="USD">USD - US Dollar</option>
      <option value="EUR">EUR - Euro</option>
      <option value="IRR">IRR - Iranian Rial</option>
    </select>
  </div>
);

export default CurrencyInput;
