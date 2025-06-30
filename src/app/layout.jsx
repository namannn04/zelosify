import "@/styles/globals.css";
import AllProvider from "@/redux/core/AllProvider";

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
      <body className={`antialiased`}>
        <AllProvider>{children}</AllProvider>
      </body>
    </html>
  );
}
