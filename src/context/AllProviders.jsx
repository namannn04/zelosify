import { ThemeProvider } from "./Theme/ThemeContext";
// import { TypographyProvider } from "./Typography/TypographyContext";

export default function AllProviders({ children }) {
  return (
    // <TypographyProvider>
    <ThemeProvider>{children}</ThemeProvider>
    // </TypographyProvider>
  );
}
