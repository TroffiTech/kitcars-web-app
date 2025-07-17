// import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import YandexMetrika from "@/components/yandexMetrika/yandexMetrika";

const montserratSans = Montserrat({
    variable: "--font-montserrat-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Запчасти для тюнинга ${process.env.NEXT_PUBLIC_SITE_NAME} в Москве по доступным ценам! Звоните ☎️${process.env.NEXT_PUBLIC_MAIN_TEL}`,
};

export const viewport: Viewport = {
    initialScale: 0.9,
    width: "device-width",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru'>
            <head>
                <meta name='robots' content='all' />
                <meta
                    name='keywords'
                    content={`${process.env.NEXT_PUBLIC_SITE_NAME}, тюнинг, троффи, Москва`}
                />
            </head>
            <body className={`${montserratSans.className}`}>
                {children}
                {/* <Analytics />
                <SpeedInsights /> */}
                <YandexMetrika />
            </body>
        </html>
    );
}
