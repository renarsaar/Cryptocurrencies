import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <button
          className="theme"
          type="button"
          onClick={props.toggleTheme}
          style={{
            backgroundColor: theme.background,
            color: theme.textcolor,
            border: `1px solid ${theme.bordercolor}`,
          }}
        >
          <i className={`fas fa-${theme.type === 'dark' ? 'sun' : 'moon'}`} />
        </button>
      )}
    </ThemeContext.Consumer>
  )
}
