import React from 'react';

export const themes = {
  light: {
    type: 'light',
    foreground: '#fcfcfc',
    background: '#eee',
    textcolor: '#333',
    bordercolor: '#d5d5d5',
    boxshadow: '2px 2px 10px #d5d5d5',
    placeholderbackground: 'linear-gradient(to right, #eee 2%, #dddddd 18%, #eee 33%)',
  },
  dark: {
    type: 'dark',
    foreground: '#111',
    background: '#222',
    textcolor: '#eee',
    bordercolor: '#696969',
    boxshadow: '2px 2px 10px #696969',
    placeholderbackground: 'linear-gradient(to right, #222 2%, #313131 18%, #222 33%)',
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { },
});
