'use client'
import { Button } from '@headlessui/react';
import { Menu as MenuIcon, X } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import ClerkUserButton from "../ClerkUserButton";

export default function CourseHeader() {
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{ name: 'Courses', href: '/courses' },
		// { name: 'References', href: '/references' },
	];

	const renderMenuItems = (isMobile: boolean) =>
		menuItems.map((item) => (
			<Button
				key={item.name}
				as={Link}
				href={item.href}
				className={`px-4 py-2 ${isMobile
						? 'group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-100'
						: 'text-gray-700 hover:text-gray-900 hover:bg-indigo-300 rounded-md'
					}`}
				onClick={isMobile ? () => setIsOpen(false) : undefined}
			>
				{item.name}
			</Button>
		));

	return (
		<nav className="bg-indigo-200 px-4 py-2">
			<div className="mx-auto container">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center">
						<Image src="/logo.png" height={65} width={65} alt="Logo" />
						<span className='ml-2 text-3xl'>Cosmic Hall</span>
					</Link>

					<div className="hidden md:flex items-center space-x-4">
						{renderMenuItems(false)}
						<ClerkUserButton />
					</div>

					<div className="md:hidden relative">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 text-gray-600 hover:text-gray-900"
						>
							{isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
						</button>

						{isOpen && (
							<div className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="px-1 py-1">{renderMenuItems(true)}</div>
								<div className="px-1 py-1">
									<div className="px-2 float-end py-2">
										<ClerkUserButton />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
