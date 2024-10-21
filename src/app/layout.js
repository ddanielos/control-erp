import localFont from "next/font/local";
import "./globals.css";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Yucaybrewery ERP Control",
  description: "Control de ERPs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={""}
      >
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}
