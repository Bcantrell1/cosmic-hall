import {
	ClerkProvider,
} from '@clerk/nextjs';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmic Hall | Prototype Classroom",
  description: "Project created to showcase development skills to potential employer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<ClerkProvider afterSignOutUrl={'/'}>
			<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
				<body
					className={`min-h-screen flex flex-col antialiased`}
				>
					<main className='flex-1'>{children}</main>
					<footer className='p-2 bg-indigo-200 text-center'>
						<a href="https://github.com/Bcantrell1" className='underline italic' target="_blank">Brian Cantrell</a> had fun building this <a href="https://github.com/Bcantrell1/cosmic-hall" className='underline' target="_blank">project</a>!
					</footer>
				</body>
			</html>
		</ClerkProvider>
  );
}