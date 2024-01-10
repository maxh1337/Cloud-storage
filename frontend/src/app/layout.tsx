import styles from "@/assets/Home.module.scss";
import { SITE_NAME } from "@/constants/seo.constants";
import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/styles/globals.scss";
import { DashboardLayout } from "./layout/dashboardLayout/DashboardLayout";
import { Header } from "./layout/header";

const inter = Inter({ subsets: ["latin"] });
export const getSiteUrl = () => process.env.APP_URL as string;

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo5.svg",
  },
  title: {
    absolute: "Cloud",
    template: `%s | Cloud`,
  },
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    emails: ["info@cloud.com"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className={styles.main}>
            <div className={styles.layout}>
              <DashboardLayout />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
