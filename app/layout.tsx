import { Header } from '@/ui/header';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'ycombinator news crawler',
    description:
        'Demo application to scrap information from ycombinator news page.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-mono bg-slate-950 text-slate-100">
                <Header />
                <main className="pt-24 min-h-screen">{children}</main>
            </body>
        </html>
    );
}
