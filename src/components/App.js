import React, { useEffect, useState } from "react";
import Chart from "./Apex";

import "../css/main.css";

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [interval, setInterval] = useState("1d");
  const [currency, setCurrency] = useState([]);

  const currencyList = [
    "ETH",
    "USDT",
    "XRP",
    "BCH",
    "BSV",
    "ADA",
    "LINK",
    "LTC",
    "BNB",
    "CRO",
    "EOS",
    "XTZ",
    "XLM",
    "XMR",
    "TRX",
  ];
  const intervals = ["1h", "1d", "7d", "30d", "365d", "ytd"];

  // Render currency buttons
  function renderCurrencies() {
    return currencyList.map((currencyItem) => {
      return (
        <button
          onClick={() =>
            // Add/Remove element from currency array
            currency.includes(currencyItem)
              ? setCurrency(currency.filter((el) => el !== currencyItem))
              : setCurrency([...currency, currencyItem])
          }
          data-currency={currencyItem}
          key={currencyItem}
          className={currency.includes(currencyItem) ? "selected btn" : "btn"}
        >
          {currencyItem}
          {currency.includes(currencyItem) ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            ""
          )}
        </button>
      );
    });
  }

  // Render Interval buttons
  function renderIntervals() {
    return intervals.map((time) => {
      return (
        <button
          key={time}
          onClick={() => setInterval(time)}
          data-interval={time}
          className={`${interval.includes(time) ? "selected btn" : "btn"}`}
        >
          {time}
          {interval.includes(time) ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            ""
          )}
        </button>
      );
    });
  }

  // Fetch prices when component mounts
  // Or when currency, interval changes
  useEffect(() => {
    fetch(
      `https://api.nomics.com/v1/currencies/ticker?key=4b9ef3848d3b670d28ce19e1b092f128&ids=${
        currency.length === 0 ? "BTC" : "BTC," + currency.join()
      }&interval=${interval}&convert=EUR`
    )
      .then((res) => res.json())
      .then((data) => setCryptoData(data));
  }, [currency, interval]);

  return (
    <div className="container">
      <div className="currencies">
        <h3>1) Select Cryptocurrencies</h3>
        {renderCurrencies()}
      </div>
      <div className="interval">
        <h3>2) Select Interval</h3>
        {renderIntervals()}
      </div>
      <Chart data={cryptoData} />
    </div>
  );
};

export default App;
