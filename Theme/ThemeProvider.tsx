import { lightColors, darkColors } from './Colors';
import { useColorScheme } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  dark: boolean;
  colors: typeof lightColors | typeof darkColors | { primary: string; text: string; background: string; inputBk: string ,inputBk2:string,inputWithoutEm:string, loadingBK:string};
  setScheme: (scheme: 'light' | 'dark' | 'random', customColors?: { primary: string; text: string; background: string; inputBk: string,inputBk2:string,inputWithoutEm:string, loadingBK:string }) => void;
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
  // 시스템 테마 감지를 위해 useColorScheme 훅 사용
  const colorScheme = useColorScheme();
  const [dark, setDark] = useState(colorScheme === 'dark');
  const [colors, setColors] = useState<any>(dark ? darkColors : lightColors);

  useEffect(() => {
    // colorScheme에 변화가 있을 때 자동으로 테마를 설정
    if (colorScheme === 'dark') {
      setDark(true);
      setColors(darkColors);
    } else {
      setDark(false);
      setColors(lightColors);
    }
  }, [colorScheme]);

  // 사용자가 직접 테마를 설정할 수 있도록 setScheme 함수 수정
  const setScheme = (scheme: 'light' | 'dark' | 'random', customColors?: { primary: string; text: string; background: string; inputBk: string ,inputBk2:string,inputWithoutEm:string, loadingBK:string}) => {
    if (scheme === 'random' && customColors) {
      setColors(customColors);
    } else if (scheme === 'light' || scheme === 'dark') {
      setDark(scheme === 'dark');
      setColors(scheme === 'dark' ? darkColors : lightColors);
    } else {
      // 시스템 설정에 따른 자동 모드 (auto) 처리
      setDark(colorScheme === 'dark');
      setColors(colorScheme === 'dark' ? darkColors : lightColors);
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











// import { lightColors, darkColors } from './Colors';
// import { useColorScheme } from 'react-native';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface ThemeContextType {
//   dark: boolean;
//   colors: typeof lightColors | typeof darkColors | { primary: string; text: string; background: string; inputBk: string };
//   setScheme: (scheme: 'light' | 'dark' | 'random', customColors?: { primary: string; text: string; background: string; inputBk: string }) => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   dark: false,
//   colors: lightColors,
//   setScheme: () => {}
// });

// interface ThemeProviderProps {
//   children: React.ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
//   const colorScheme:any = useColorScheme();
//   const [dark, setDark] = useState(colorScheme === 'dark');
//   const [colors, setColors] = useState(dark ? darkColors : lightColors);

//   useEffect(() => {
//     const handleColorSchemeChange = (scheme: 'light' | 'dark' | 'random') => {
//       if (scheme === 'random') {
//         setColors({
//           primary: 'randomPrimaryColor', // Provide actual color values
//           text: 'randomTextColor',
//           background: 'randomBackgroundColor',
//           inputBk: 'randomInputBkColor'
//         });
//       } else {
//         setDark(scheme === 'dark');
//         setColors(scheme === 'dark' ? darkColors : lightColors);
//       }
//     };
//     handleColorSchemeChange(colorScheme);
//   }, [colorScheme]);

//   const setScheme = (scheme: 'light' | 'dark' | 'random', customColors?: { primary: string; text: string; background: string; inputBk: string }) => {
//     if (scheme === 'random' && customColors) {
//       setColors(customColors);
//     } else {
//       setDark(scheme === 'dark');
//       setColors(scheme === 'dark' ? darkColors : lightColors);
//     }
//   };

//   const defaultTheme: ThemeContextType = {
//     dark: dark,
//     colors: colors,
//     setScheme: setScheme
//   };

//   return (
//     <ThemeContext.Provider value={defaultTheme}>
//       {props.children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);

