"use client"
// contexts/MyThemeContext.js
import { createContext, useContext, useState } from 'react';

const MyThemeContext = createContext();

export const MyThemeContextProvider = ({ children }) => {

  const [lightMode, setLightMode] = useState(true);

  return (
    <MyThemeContext.Provider value={{ lightMode, setLightMode }}>
      {children}
    </MyThemeContext.Provider>
  );
};

export const useMyThemeContext = () => useContext(MyThemeContext);
