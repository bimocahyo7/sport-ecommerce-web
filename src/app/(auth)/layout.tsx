import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sport E-Commerce Admin - Login",
  description:
    "Secure admin login for Sport E-Commerce dashboard. Manage products, inventory, and orders with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
