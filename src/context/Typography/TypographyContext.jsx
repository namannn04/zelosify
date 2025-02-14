"use client";

import { Nunito, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { createContext } from "react";

// Define fonts
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"], // include italics if needed
  variable: "--font-poppins",
});

// Create the context
const TypographyContext = createContext({
  nunito,
  plusJakarta,
  poppins,
});

// Provide the context with pre-defined fonts
export const TypographyProvider = ({ children }) => {
  return (
    <TypographyContext.Provider value={{ nunito, plusJakarta, poppins }}>
      {children}
    </TypographyContext.Provider>
  );
};

export default TypographyContext;
