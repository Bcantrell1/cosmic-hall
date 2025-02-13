import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@headlessui/react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-black to-black text-white p-4">
            <div className="relative w-48 h-48 mb-8 animate-pulse">
                <Image
                    src="/logo.png"
                    alt="Cosmic Hall Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-center">
                Lost in Space? This Page Doesn&apos;t Exist
            </h2>

            <p className="text-indigo-300 mb-8 text-center max-w-md">
                Looks like you&apos;ve ventured too far into the cosmos. Let&apos;s get you back to
                familiar territory.
            </p>

            <Button
                as={Link}
                href="/"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
                <span>Return to Earth</span>
            </Button>
        </div>
    );
}
