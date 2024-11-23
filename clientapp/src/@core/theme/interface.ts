export type themeType = 'dark' | 'light';
export type colorType =
  | 'green'
  | 'blue'
  | 'orange'
  | 'zinc'
  | 'violet'
  | 'rose';
export type borderRadiusType =
  | '0.1em'
  | '0.2em'
  | '0.3em'
  | '0.4em'
  | '0.5em'
  | '0.6em'
  | '0.7em'
  | '0.8em'
  | '0.9em'
  | '1em';
export interface TypeThemeContextProps {
  toggleMode?: () => void;
  toggleTheme: (colorName: colorType, theme?: themeType) => void;
  theme: themeType;
  themeProperties: {};
  activeThemeClass: DOMTokenList | null;
  color: colorType;
  setRadius: (str: borderRadiusType) => void;
  radius: borderRadiusType;
}

export interface typeChooseColor {
  [key: string]: {
    light: {
      [key: string]: string;
    };
    dark: {
      [key: string]: string;
    };
  };
}
