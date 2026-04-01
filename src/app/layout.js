import { Geist, Geist_Mono } from "next/font/google";
import { Poppins,Almarai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const almarai = Almarai({
  subsets: ["arabic"],  // Almarai supports Arabic subset
  weight: ["300", "400", "700", "800"], // Available weights: Light(300), Regular(400), Bold(700), ExtraBold(800)
  variable: "--font-almarai",
  display: "swap",
});
export const metadata = {
  title: "AngeLo",
  description: "AngeLo",
};

export default function RootLayout({ children }) {
  return (
<html lang="en" className="dark" suppressHydrationWarning>
       <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${almarai.variable} font-sans antialiased`}
      >
        {/* <ThemeProvider> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
