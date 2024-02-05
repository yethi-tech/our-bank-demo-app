import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/shared/topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OurBank",
  description: "The bank we trust!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>OurBank Platform</title>
      </head>
      <body className={inter.className}>
        <TopBar />
        <div className="main">{children}</div>
      </body>
    </html>
  );
}
