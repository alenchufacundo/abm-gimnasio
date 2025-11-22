import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkThemeOptions, lightThemeOptions } from '../theme/themeOptions';

interface ThemeContextProps {
 toggleTheme: () => void;
 setTheme: (newTheme: boolean) => void;
 darkMode: boolean | undefined;
}

const ThemeContext = createContext<ThemeContextProps>({
 toggleTheme: () => { },
 setTheme: () => { },
 darkMode: false,
});

export const ThemeContextProvider = ({ children }: any) => {
 const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

 const setTheme = (isDark: boolean) => {
 setDarkMode(isDark);

 // Cambia las variables CSS para el tema actual
 document.documentElement.style.setProperty(
 '--background',
 isDark
 ? darkThemeOptions.palette?.background?.default || '#333'
 : lightThemeOptions.palette?.background?.default || '#fff'
 );
 document.documentElement.style.setProperty(
 '--foreground',
 isDark
 ? darkThemeOptions.palette?.text?.primary || '#fff'
 : lightThemeOptions.palette?.text?.primary || '#000'
 );

 // Guardar en localStorage
 localStorage.setItem('theme', isDark ? 'dark' : 'light');
 };

 const toggleTheme = () => {
 setTheme(!darkMode);
 };

 // Cargar el tema desde localStorage o usar la preferencia del sistema si es la primera vez
 useEffect(() => {
 const savedTheme = localStorage.getItem('theme');
 const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
 setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
 }, []);

 return (
 <ThemeContext.Provider value={{ toggleTheme, darkMode, setTheme }}>
 {darkMode !== null &&
 <ThemeProvider theme={createTheme(darkMode ? darkThemeOptions : lightThemeOptions)}>
 {children}
 </ThemeProvider>
 }
 </ThemeContext.Provider>
 );
};

export const useThemeContext = () => useContext(ThemeContext);