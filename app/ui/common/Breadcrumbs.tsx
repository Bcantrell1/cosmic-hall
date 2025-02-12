import { Button } from '@headlessui/react';
import Link from 'next/link';

type BreadcrumbItem = {
    label: string;
    href: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="flex mb-4 min-w-0" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 min-w-0">
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center min-w-0">
                        {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                        {index === items.length - 1 ? (
                            <span className="text-sm text-indigo-600 font-medium truncate">
                                {item.label}
                            </span>
                        ) : (
                            <Button as={Link} href={item.href} className={`text-sm hover:text-indigo-600 transition-colors ${item.label.length > 15 ? 'truncate' : ''}`}>
                                {item.label}
                            </Button>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
} 