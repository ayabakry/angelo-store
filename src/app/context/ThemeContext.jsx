"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState('dark');

//   useEffect(() => {
//     const saved = localStorage.getItem('theme');
//     if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//       setTheme('dark');
//       document.documentElement.classList.add('dark');
//     } else {
//       setTheme('light');
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

// //   const toggleTheme = () => {
// //     const newTheme = theme === 'light' ? 'dark' : 'light';
// //     setTheme(newTheme);
// //     localStorage.setItem('theme', newTheme);
// //     if (newTheme === 'dark') {
// //       document.documentElement.classList.add('dark');
// //     } else {
// //       document.documentElement.classList.remove('dark');
// //     }
// //   };

//   return (
//     // <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     // </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within ThemeProvider');
//   }
//   return context;
// };
