import React from "react";
import style from "./Result.module.css";
const Result = ({
  isLoading,
  amount,
  currency,
  converted,
  convert,
  rateConvertToCurrency,
}) => (
  <div className={style.third}>
    <div className={style.main}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <p className={style.p}>
            {amount} {currency} =
          </p>
          <p className="converted_p">
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
);

export default Result;
