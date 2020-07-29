import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeButton({ toggleTheme }) {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div className="theme">
          <h3 style={{ color: theme.textcolor }}>
            1) Select Theme
          </h3>
          <i
            onClick={toggleTheme}
            className={`fas fa-${theme.type === 'dark' ? 'sun' : 'moon'}`}
            style={{
              backgroundColor: theme.foreground,
              color: theme.textcolor,
              border: `1px solid ${theme.bordercolor}`,
            }}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
