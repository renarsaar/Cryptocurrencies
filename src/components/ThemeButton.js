import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          className="theme"
          onClick={props.toggleTheme}
          style={{
            backgroundColor: theme.background,
            color: theme.textcolor,
            border: `1px solid ${theme.bordercolor}`,
          }}
        >
          <i className={`fas fa-${theme.background === '#222' ? 'sun' : 'moon'}`}></i>
        </button>
      )}
    </ThemeContext.Consumer>
  )
}
