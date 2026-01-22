import { createContext, useContext, useState } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  return (
    <ModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  return useContext(ModeContext);
};
