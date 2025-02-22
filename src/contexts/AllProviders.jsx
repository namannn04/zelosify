// import { TypographyProvider } from "./Typography/TypographyContext";
import { ThemeProvider } from "next-themes";

export default function AllProviders({ children }) {
  return (
    // <TypographyProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
    // </TypographyProvider>
  );
}
