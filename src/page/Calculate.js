import React, { useEffect, useState } from "react";
import CurrencyInput from "../components/CurencyInput/CurrencyInput";
import SwapButton from "../components/SwapButton/SwapButton";
import Result from "../components/Result/Result";
import { fetchConversionRate, fetchReverseConversionRate } from "../api/api";
import style from "./Calculate.module.css";
const Calculate = () => {
  const [currency, setCurrency] = useState("USD"); // ارز پایه
  const [convert, setConvert] = useState("IRR"); // ارز مقصد
  const [amount, setAmount] = useState(1); // مقدار ورودی
  const [converted, setConverted] = useState(""); // نتیجه تبدیل
  const [rateCurrencyToConvert, setRateCurrencyToConvert] = useState(""); // نرخ ارز پایه به ارز مقصد
  const [rateConvertToCurrency, setRateConvertToCurrency] = useState(""); // نرخ ارز مقصد به ارز پایه
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // پیام خطا

  // اعتبارسنجی ورودی
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("مقدار نامشخص است");
    } else {
      setError("");
      setAmount(Number(value));
    }
  };

  // جابجایی ارزها
  const swapCurrencies = () => {
    const temp = currency;
    setCurrency(convert);
    setConvert(temp);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      async function fetchRates() {
        setIsLoading(true);
        try {
          const conversionRate = await fetchConversionRate(currency, convert);
          setConverted((conversionRate * amount).toLocaleString());
          setRateCurrencyToConvert(conversionRate.toFixed(6));

          const reverseRate = await fetchReverseConversionRate(
            convert,
            currency
          );
          setRateConvertToCurrency(reverseRate.toFixed(6));
        } catch (error) {
          console.error("Error fetching the conversion rates:", error);
        }
        setIsLoading(false);
      }

      if (currency === convert) {
        setConverted(amount.toLocaleString());
        setRateCurrencyToConvert(1);
        setRateConvertToCurrency(1);
      } else {
        fetchRates();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [amount, currency, convert]);

  return (
    <div className={style.div}>
      <h1 className={style.h1}>به تسک ریرا خوش‌ آمدید</h1>
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.first}>
            <CurrencyInput
              amount={amount}
              currency={currency}
              onCurrencyChange={setCurrency}
              onAmountChange={handleAmountChange}
              isLoading={isLoading}
              error={error}
            />

            <SwapButton swapCurrencies={swapCurrencies} isLoading={isLoading} />

            <CurrencyInput
              amount={null}
              currency={convert}
              onCurrencyChange={setConvert}
              isLoading={isLoading}
              error={null}
            />
          </div>
          <Result
            amount={amount}
            currency={currency}
            converted={converted}
            convert={convert}
            rateCurrencyToConvert={rateCurrencyToConvert}
            rateConvertToCurrency={rateConvertToCurrency}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculate;
