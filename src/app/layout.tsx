import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import TopNav from "./_components/TopNav";
import { ourFileRouter } from "./api/uploadthing/core";
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "An image gallery for wallpapers.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <body>
          <div className="grid h-screen grid-rows-[auto_1fr]">
            <TopNav />
            <main className="overflow-y-auto">{children}</main>
            {modal}
          </div>

          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
