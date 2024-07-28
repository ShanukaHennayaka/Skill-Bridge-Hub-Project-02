/* eslint-disable react/prop-types */
import { useEffect } from "react";
import colors from "../assets/colors";


const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;

    Object.keys(colors).forEach((key) => {
      root.style.setProperty(`--${key}`, colors[key]);
    });
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
