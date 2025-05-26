import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const montserratSans = Montserrat({
    variable: "--font-montserrat-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Запчасти для тюнинга ${process.env.NEXT_PUBLIC_SITE_NAME}`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ru'>
            <body className={`${montserratSans.className}`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
