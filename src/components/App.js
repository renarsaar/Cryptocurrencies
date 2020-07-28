import React, { useState } from 'react';
import ApexChart from './ApexChart';

import { ThemeContext, themes } from '../contexts/ThemeContext';
import useFetchCryptoData from './useFetchCryptoData';
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

export default function App() {
  const [theme, setTheme] = useState({ theme: themes.light, toggleTheme })
  const [interval, setInterval] = useState('1d');
  const [currency, setCurrency] = useState([]);
  const { cryptoData, loading, error } = useFetchCryptoData(interval, currency);

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

            {loading &&
              <>
                <div className="placeholder" style={{ background: theme.placeholderbackground }} ></div>
                <div className="placeholder" style={{ background: theme.placeholderbackground }}></div>
              </>
            }
            {error && <h1>Error... Try refreshing</h1>}
            {cryptoData.map((data) => {
              return <ApexChart key={data.id} data={data} interval={interval} theme={theme} />;
            })}

          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};