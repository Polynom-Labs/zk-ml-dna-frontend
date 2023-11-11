import type { Metadata } from "next";
import { ScrollArea, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Providers } from "@/app/providers";
import "@/styles/main.scss";
import "@/styles/theme-config.scss";

export const metadata: Metadata = {
  title: "Polynom",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0c78ed" />
        <meta name="msapplication-TileColor" content="#0cb8b6" />
        <meta name="theme-color" content="#0cb8b6" />
      </head>
      <body>
        <Theme>
          <ScrollArea
            type="always"
            scrollbars="vertical"
            style={{ height: "100vh" }}
          >
            <MainLayout>
              <Providers>{children}</Providers>
            </MainLayout>
          </ScrollArea>
        </Theme>
      </body>
    </html>
  );
}
