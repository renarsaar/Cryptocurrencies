import React, { useState } from 'react';
import ApexChart from './ApexChart';

import { ThemeContext, themes } from '../contexts/ThemeContext';
import useFetchCryptoData from './useFetchCryptoData';
import ThemeButton from './ThemeButton';
import '../css/main.css';

const currencies = [
  'ETH',
  'USDT',
  'XRP',
  'BCH',
  'BSV',
  'ADA',
  'LINK',
  'LTC',
  'BNB',
  'CRO',
  'EOS',
  'XTZ',
  'XLM',
  'XMR',
  'TRX',
];
const intervals = ['1h', '1d', '7d', '30d', '365d', 'ytd'];

export default function App() {
  const [theme, setTheme] = useState({ theme: localStorage.getItem('theme') === 'dark' ? themes.dark : themes.light, toggleTheme });
  const [interval, setInterval] = useState('1h');
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const { cryptoData, loading, error } = useFetchCryptoData(interval, selectedCurrency);

  // Toggle Light Theme
  function toggleTheme() {
    setTheme((state) => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  }

  // Render currency buttons
  function renderCurrencies(theme) {
    return currencies.map((currency) => (
      <button
        key={currency}
        onClick={() => (selectedCurrency.includes(currency)
          ? setSelectedCurrency(selectedCurrency.filter((el) => el !== currency))
          : setSelectedCurrency([...selectedCurrency, currency]))}
        type="button"
        data-currency={currency}
        className={selectedCurrency.includes(currency) ? 'selected btn' : 'btn'}
        style={{
          background: theme.foreground,
          color: theme.textcolor,
          border: `1px solid ${theme.bordercolor}`,
        }}
      >
        {currency}
        {selectedCurrency.includes(currency)
          ? (<i className="fas fa-check-circle" />)
          : ('')}
      </button>
    ));
  }

  // Render Interval buttons
  function renderIntervals(theme) {
    return intervals.map((time) => (
      <button
        key={time}
        onClick={() => setInterval(time)}
        type="button"
        data-interval={time}
        className={`${interval.includes(time) ? 'selected btn' : 'btn'}`}
        style={{
          background: theme.foreground,
          color: theme.textcolor,
          border: `1px solid ${theme.bordercolor}`,
        }}
      >
        {time}
        {interval.includes(time)
          ? (<i className="fas fa-check-circle" />)
          : ('')}
      </button>
    ));
  }

  localStorage.setItem('theme', theme.theme.type);
  document.body.style.background = theme.theme.background;
  return (
    <ThemeContext.Provider value={theme.theme}>
      <ThemeContext.Consumer>
        {(theme) => (
          <div className="container">
            <ThemeButton toggleTheme={toggleTheme} />

            <div className="currencies">
              <h3 style={{ color: theme.textcolor }}>2) Select Cryptocurrencies</h3>
              {renderCurrencies(theme)}
            </div>

            <div className="interval">
              <h3 style={{ color: theme.textcolor }}>3) Select Interval</h3>
              {renderIntervals(theme)}
            </div>

            {loading
              && (
                <>
                  <div className="placeholder" style={{ background: theme.placeholderbackground, boxShadow: theme.boxshadow }} />
                  <div className="placeholder" style={{ background: theme.placeholderbackground, boxShadow: theme.boxshadow }} />
                </>
              )}
            {error && <h1>Error... Try refreshing</h1>}
            {cryptoData.map((data) => <ApexChart key={data.id} data={data} interval={interval} theme={theme} />)}
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}
