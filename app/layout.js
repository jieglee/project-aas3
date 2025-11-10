import { Poppins } from "next/font/google";
import "./globals.css";

// Import font Poppins dari Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // bobot yang sering dipakai
  variable: "--font-poppins", // untuk CSS variable
});

export const metadata = {
  title: "PusTBaka",
  description: "Landing page perpustakaan digital sekolah Taruna Bhakti",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
