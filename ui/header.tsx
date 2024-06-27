import Link from 'next/link';

export function Header() {
    return (
        <nav className="fixed top-0 z-50 w-full h-16 px-6 font-bold text-xl bg-slate-950/80 flex justify-start items-center shadow shadow-slate-500">
            <Link href="/">Live Entries</Link>
            <span className="px-4">|</span>
            <Link href="/request">Requests Log</Link>
        </nav>
    );
}
