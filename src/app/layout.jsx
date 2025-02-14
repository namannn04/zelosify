import "@/styles/globals.css";
import AllProviders from "@/context/AllProviders";
import { Poppins } from "next/font/google";

// Font config
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"], // include italics if needed
  variable: "--font-poppins",
});

// Metadata (App Router style)
export const metadata = {
  title: "Zelosify",
  description: "Zelosify",
  icons: {
    icon: "/favicon1.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${poppins.variable}`}>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
