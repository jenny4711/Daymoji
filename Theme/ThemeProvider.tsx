import { lightColors, darkColors } from './Colors';
import { useColorScheme } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  dark: boolean;
  colors: typeof lightColors | typeof darkColors | { primary: string; text: string; background: string; inputBk: string };
  setScheme: (scheme: 'light' | 'dark' | 'random', customColors?: { primary: string; text: string; background: string; inputBk: string }) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  colors: lightColors,
  setScheme: () => {}
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const colorScheme:any = useColorScheme();
  const [dark, setDark] = useState(colorScheme === 'dark');
  const [colors, setColors] = useState(dark ? darkColors : lightColors);

  useEffect(() => {
    const handleColorSchemeChange = (scheme: 'light' | 'dark' | 'random') => {
      if (scheme === 'random') {
        setColors({
          primary: 'randomPrimaryColor', // Provide actual color values
          text: 'randomTextColor',
          background: 'randomBackgroundColor',
          inputBk: 'randomInputBkColor'
        });
      } else {
        setDark(scheme === 'dark');
        setColors(scheme === 'dark' ? darkColors : lightColors);
      }
    };
    handleColorSchemeChange(colorScheme);
  }, [colorScheme]);

  const setScheme = (scheme: 'light' | 'dark' | 'random', customColors?: { primary: string; text: string; background: string; inputBk: string }) => {
    if (scheme === 'random' && customColors) {
      setColors(customColors);
    } else {
      setDark(scheme === 'dark');
      setColors(scheme === 'dark' ? darkColors : lightColors);
    }
  };

  const defaultTheme: ThemeContextType = {
    dark: dark,
    colors: colors,
    setScheme: setScheme
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

