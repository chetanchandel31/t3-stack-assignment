import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import Header from "./_components/Header";
import { Toaster } from "~/components/ui/toaster";
import AuthProvider from "./providers/AuthProvider";
import { cookies } from "next/headers";
import { AUTH_TOKEN } from "~/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "E-commerce",
  description: "Roc8 moonshot assignment",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authTokenFromServerRequest = cookies().get(AUTH_TOKEN)?.value;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <TRPCReactProvider>
          <AuthProvider authTokenFromServerRequest={authTokenFromServerRequest}>
            <Header />

            <div className="pb-16">{children}</div>

            <Toaster />
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
