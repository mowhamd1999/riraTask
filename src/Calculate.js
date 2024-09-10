import React, { useEffect, useState } from "react";
import CurrencyInput from "./components/CurencyInput/CurrencyInput";
import SwapButton from "./components/SwapButton/SwapButton";
import Result from "./components/Result/Result";
import { fetchConversionRate, fetchReverseConversionRate } from "./api/api";

const Calculate = () => {
  const [currency, setCurrency] = useState("USD");
  const [convert, setConvert] = useState("IRR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [rateCurrencyToConvert, setRateCurrencyToConvert] = useState("");
  const [rateConvertToCurrency, setRateConvertToCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("مقدار نامشخص است");
    } else {
      setError("");
      setAmount(Number(value));
    }
  };
  const currencySymbol = () => {
    switch (currency) {
      case "USD":
        return "$";
      case "IRR":
        return "ریال";
      case "EUR":
        return "€";
      default:
        return "";
    }
  };
  const swapCurrencies = () => {
    const temp = currency;
    setCurrency(convert);
    setConvert(temp);
  };
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);

      if (currency === convert) {
        setConverted(amount);
        setRateCurrencyToConvert(1);
        setRateConvertToCurrency(1);
      } else {
        try {
          const rate = await fetchConversionRate(currency, convert);
          const reverseRate = await fetchReverseConversionRate(
            currency,
            convert
          );
          setConverted((rate * amount).toLocaleString());
          setRateCurrencyToConvert(rate.toFixed(6));
          setRateConvertToCurrency(reverseRate.toFixed(6));
        } catch (error) {
          console.error("Error fetching conversion rates:", error);
        }
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [amount, currency, convert]);

  return (
    <div className="background">
      <h1 className="h1">به تسک ریرا خوش‌ آمدید</h1>
      <div className="container">
        <div className="form">
          <CurrencyInput
            currency={currency}
            setCurrency={setCurrency}
            amount={amount}
            handleAmountChange={handleAmountChange}
            disabled={isLoading}
            currencySymbol={currencySymbol}
            error={error}
          />
          <SwapButton swapCurrencies={swapCurrencies} isLoading={isLoading} />
          <CurrencyInput
            currency={convert}
            setCurrency={setConvert}
            amount={amount}
            handleAmountChange={() => {}}
            disabled={isLoading}
            currencySymbol={() => {}}
            error=""
          />
          <Result
            isLoading={isLoading}
            amount={amount}
            currency={currency}
            converted={converted}
            convert={convert}
            rateConvertToCurrency={rateConvertToCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculate;
