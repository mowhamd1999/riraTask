import React, { useEffect, useState } from "react";
import {
  fetchConversionRate,
  fetchReverseConversionRate,
} from "./../services/api";
import style from "./Calculate.module.css";
import { IoSwapHorizontal } from "react-icons/io5";

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
    const timeoutId = setTimeout(() => {
      async function fetchConversionRates() {
        setIsLoading(true);
        try {
          const data = await fetchConversionRate(currency, convert);
          setConverted(
            (data.conversion_rate * amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })
          );

          setRateCurrencyToConvert(
            data.conversion_rate.toLocaleString(undefined, {
              minimumFractionDigits: 4,
            })
          );

          const reverseData = await fetchReverseConversionRate(
            currency,
            convert
          );
          setRateConvertToCurrency(
            reverseData.conversion_rate.toLocaleString(undefined, {
              minimumFractionDigits: 4,
            })
          );
        } catch (error) {
          console.error("Error fetching the conversion rates:", error);
        }
        setIsLoading(false);
      }

      if (currency === convert) {
        setConverted(
          amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        );
        setRateCurrencyToConvert(1);
        setRateConvertToCurrency(1);
      } else {
        fetchConversionRates();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [amount, currency, convert]);

  return (
    <div className={style.background}>
      <h1 className={style.h1}>به تسک ریرا خوش‌ آمدید</h1>
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.first}>
            <div className={style.secound}>
              <label htmlFor="amount" className={style.amount_label}>
                مقدار
              </label>
              <div className={style.first}>
                <span className={style.span}>{currencySymbol()}</span>
                <input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={isLoading}
                  style={{ marginLeft: "8px" }}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className={style.secound}>
              <label htmlFor="from" className={style.amount_label}>
                از
              </label>
              <div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled={isLoading}
                  id="from"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="IRR">IRR - Iranian Rial</option>
                </select>
              </div>
            </div>

            <button
              onClick={swapCurrencies}
              disabled={isLoading}
              className={style.btn}
            >
              <IoSwapHorizontal />
            </button>

            <div className={style.secound}>
              <label htmlFor="from" className={style.amount_label}>
                به
              </label>
              <div>
                <select
                  value={convert}
                  onChange={(e) => setConvert(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="IRR">IRR - Iranian Rial</option>
                </select>
              </div>
            </div>
          </div>

          <div className={style.third}>
            <div className={style.main}>
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <p className={style.p}>
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{" "}
                    {currency} =
                  </p>{" "}
                  <br />
                  <p className={style.converted_p}>
                    {converted} {convert}
                  </p>
                </>
              )}
            </div>

            <p className={style.dis}>
              {isLoading
                ? "Loading..."
                : `1 ${convert} = ${rateConvertToCurrency} ${currency}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
