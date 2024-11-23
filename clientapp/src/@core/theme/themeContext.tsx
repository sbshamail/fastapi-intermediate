'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  TypeThemeContextProps,
  borderRadiusType,
  colorType,
  themeType,
} from './interface';
import { chooseColor } from './chooseColor';
export const ThemeContext = createContext<TypeThemeContextProps | undefined>(
  undefined
);
// theme to mode, color to theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light', // Add default theme here
      toggleMode: () => {},
      toggleTheme: () => {},
      themeProperties: {},
      setRadius: () => {},
      activeThemeClass: null,
      color: 'zinc' as keyof typeof chooseColor,
    };
  }
  return context;
};

interface ProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  defaultColor?: colorType;
  defaultRadius?: borderRadiusType;
  themeName?: string;
}
const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  defaultColor = 'zinc',
  defaultRadius = '0.5em',
  themeName = 'mytheme',
}: ProviderProps) => {
  const [theme, setTheme] = useState<themeType>('light');
  const [color, setColor] = useState<colorType>(defaultColor);
  const [radius, setBorderRadius] = useState<borderRadiusType>(defaultRadius);
  const [activeThemeClass, setActiveThemeClass] = useState<DOMTokenList | null>(
    null
  );
  const [themeProperties, setThemeProperties] = useState<{
    [key: string]: string;
  }>({});
  // use for window undefined // client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  //LocalStorage to Save Setting
  const saveThemeSettings = useCallback(
    (theme: themeType, color: colorType, borderRadius: borderRadiusType) => {
      const themeSettings = { theme, color, borderRadius };
      localStorage.setItem(themeName, JSON.stringify(themeSettings));
    },
    [themeName]
  );

  const toggleTheme = useCallback(
    (color: colorType, themeMode: themeType = theme) => {
      if (isClient) {
        const root = document.documentElement;
        setColor(color);
        // console.log(color, themeMode);

        const selectedTheme = chooseColor[color][themeMode];
        setThemeProperties(selectedTheme);
        saveThemeSettings(themeMode, color, radius);
        for (const [key, value] of Object.entries(selectedTheme)) {
          root.style.setProperty(key, value);
        }
        root.style.setProperty('--radius', radius);
      }
    },
    [isClient, radius, saveThemeSettings, theme]
  );

  const themeClass = useCallback(
    (property: 'dark' | 'light') => {
      if (isClient) {
        const root = document.documentElement;
        const theme = root?.classList;
        theme.remove('dark', 'light');
        theme.add(property);
        toggleTheme(color, property);
      }
    },
    [isClient, color, toggleTheme]
  );
  // Fetch System Theme

  useEffect(() => {
    setIsClient(true);
    const savedThemeSettings = localStorage.getItem(themeName);
    if (savedThemeSettings) {
      const { theme, color, borderRadius } = JSON.parse(savedThemeSettings);
      setTheme(theme);
      setColor(color);
      setBorderRadius(borderRadius);
      themeClass(theme); // Initialize theme without toggling
    } else if (defaultTheme !== 'system') {
      themeClass(defaultTheme);
    } else {
      const prefersDarkScheme = window?.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      const sysTheme = prefersDarkScheme.matches ? 'dark' : 'light';
      themeClass(sysTheme);
      setTheme(sysTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);
  // console.log(activeThemeClass);
  // mode dark and light
  const toggleMode = useCallback(() => {
    if (isClient) {
      const root = document.documentElement;
      const activeTheme = root?.classList;
      setActiveThemeClass(activeTheme);
      if (activeTheme.contains('dark')) {
        themeClass('light');
        setTheme('light');
      } else {
        themeClass('dark');
        setTheme('dark');
      }
    }
  }, [isClient, themeClass, setTheme]);

  //borderRounded
  const setRadius = useCallback(
    (borderRadius: borderRadiusType) => {
      if (isClient) {
        const root = document.documentElement;
        root.style.setProperty('--radius', borderRadius);
        setBorderRadius(borderRadius);
        saveThemeSettings(theme, color, borderRadius);
      }
    },
    [color, isClient, saveThemeSettings, theme]
  );

  // values
  return (
    <ThemeContext.Provider
      value={{
        toggleMode,
        toggleTheme,
        theme,
        themeProperties,
        activeThemeClass,
        color,
        radius,
        setRadius,
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          transition: 'background 0.3s, color 0.3s',
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
