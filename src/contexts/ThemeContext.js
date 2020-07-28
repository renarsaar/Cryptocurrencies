import React from 'react';

export const themes = {
  light: {
    foreground: '#fcfcfc',
    background: '#eee',
    textcolor: '#333',
    bordercolor: '#d5d5d5',
    boxshadow: '2px 2px 10px #d5d5d5',
  },
  dark: {
    foreground: '#111',
    background: '#222',
    textcolor: '#eee',
    bordercolor: '#696969',
    boxshadow: '2px 2px 10px #696969',
  }
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { },
});
