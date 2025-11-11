import { Poppins } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./component/ClientWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "PusTBaka",
  description: "Landing page perpustakaan digital sekolah Taruna Bhakti",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
