import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'darkThema');

   useEffect(() => { window.localStorage.setItem('theme', theme); }, [theme]);

   const toggleTheme = () => { setTheme((activeTheme) => (activeTheme === 'dark' ? 'light' : 'dark')); };

   const values = { toggleTheme, theme };

   return <ThemeContext.Provider value={values}>
      {console.log("ThemeProvider.Provider")}


      {/* bg = dark -> text-bg LIGHT | bg = light -> text-bg DARK */}
      <div className={`text-center 
                        bg-${theme !== "dark" ? "dark" : "light"}  
                        text-bg-${theme !== "dark" ? "dark" : "light"}  
                        text-${theme === "dark" ? "dark" : "light"}  
                        `
                        }>
         {children}
      </div>
   </ThemeContext.Provider>;
}
