import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalLoader from "@/components/GlobalLoader";

export const metadata: Metadata = {
  title: "2nd Edition MVCON",
  description: "Annual Scientific Update on Diabetes & Diabetic Foot Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GlobalLoader />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
