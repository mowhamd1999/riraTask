import React from "react";

const Result = ({
  isLoading,
  amount,
  currency,
  converted,
  convert,
  rateConvertToCurrency,
}) => (
  <div className="third">
    <div className="main">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <p className="p">
            {amount} {currency} =
          </p>
          <p className="converted_p">
            {converted} {convert}
          </p>
        </>
      )}
    </div>
    <p className="dis">
      {isLoading
        ? "Loading..."
        : `1 ${convert} = ${rateConvertToCurrency} ${currency}`}
    </p>
  </div>
);

export default Result;
