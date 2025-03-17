import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import ReduxProvider from "@/providers/ReduxProvider";

import SessionProvider from "@/components/SessionProvider";

import AppProvider from "@/app/AppProvider";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("sessionToken");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Header/> */}
            {/* <Provider store={store}>{children}</Provider> */}
            <Toaster />
            <AppProvider initialSessionToken={sessionToken?.value}>
              <SessionProvider /> {/* Chạy logic refresh session */}
              {children}
            </AppProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
