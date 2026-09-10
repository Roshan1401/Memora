import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import Providers from "../components/Providers";
import "./globals.css";
import { Toaster } from "sonner";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MEMORA",
    template: "%s | MEMORA",
  },
  description: "Capture the moments that make your days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${inter.variable} h-full bg-[#e6e3d9] antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <Providers>{children}</Providers>
        <Toaster
          position="bottom-right"
          offset={20}
          duration={3500}
          toastOptions={{
            classNames: {
              toast: "toast-neo",
              title: "toast-neo-title",
              description: "toast-neo-description",
              success: "toast-neo-success",
              error: "toast-neo-error",
            },
          }}
        />
      </body>
    </html>
  );
}
