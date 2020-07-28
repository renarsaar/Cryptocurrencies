import React, { useEffect, useState } from 'react';
import ApexChart from './ApexChart';

import { ThemeContext, themes } from '../contexts/ThemeContext';
import ThemeButton from './ThemeButton';
import '../css/main.css';

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

const App = () => {
  const [theme, setTheme] = useState({ theme: themes.light, toggleTheme })
  const [cryptoData, setCryptoData] = useState([]);
  const [interval, setInterval] = useState('1d');
  const [currency, setCurrency] = useState([]);

  // Toggle Light Theme
  function toggleTheme() {
    setTheme(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }))
  }

  // Render currency buttons
  function renderCurrencies(theme) {
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
          style={{
            background: theme.foreground,
            color: theme.textcolor,
            border: `1px solid ${theme.bordercolor}`
          }}
        >
          {currencyItem}
          {currency.includes(currencyItem)
            ? (<i className="fas fa-check-circle"></i>)
            : ('')
          }
        </button>
      );
    });
  }

  // Render Interval buttons
  function renderIntervals(theme) {
    return intervals.map((time) => {
      return (
        <button
          key={time}
          onClick={() => setInterval(time)}
          data-interval={time}
          className={`${interval.includes(time) ? "selected btn" : "btn"}`}
          style={{
            background: theme.foreground,
            color: theme.textcolor,
            border: `1px solid ${theme.bordercolor}`
          }}
        >
          {time}
          {interval.includes(time)
            ? (<i className="fas fa-check-circle"></i>)
            : ("")
          }
        </button>
      );
    });
  }

  // Fetch prices when currency or interval changes
  useEffect(() => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=4b9ef3848d3b670d28ce19e1b092f128&ids=${
      currency.length === 0 ? "BTC" : "BTC," + currency.join()
      }&interval=${interval}&convert=EUR`
    )
      .then((res) => res.json())
      .then((data) => setCryptoData(data));
  }, [currency, interval]);

  document.body.style.background = theme.theme.background;
  return (
    <ThemeContext.Provider value={theme.theme}>
      <ThemeContext.Consumer>
        {theme => (
          <div className="container">
            <ThemeButton toggleTheme={toggleTheme} />
            <div className="currencies">
              <h3 style={{ color: theme.textcolor }}>1) Select Cryptocurrencies</h3>
              {renderCurrencies(theme)}
            </div>
            <div className="interval">
              <h3 style={{ color: theme.textcolor }}>2) Select Interval</h3>
              {renderIntervals(theme)}
            </div>
            <ApexChart data={cryptoData} interval={interval} theme={theme} />
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

export default App;
