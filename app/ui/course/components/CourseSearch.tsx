'use client';

import { Input } from "@headlessui/react";

export function CourseSearch({ onSearch, searchQuery }: { onSearch: (query: string) => void, searchQuery: string }) {
    return (
        <div className="w-full mb-6">
            <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}