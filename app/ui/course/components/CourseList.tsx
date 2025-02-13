'use client';

import { useState } from "react";
import { CourseSearch } from "./CourseSearch";
import { CourseCard } from "./CourseCard";
import { Course, UserCourse } from "@/app/lib/data";

type CourseWithProgress = Course & {
    progress: UserCourse;
};

export default function CourseList({ userId, initialCourses }: { userId: string; initialCourses: CourseWithProgress[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(initialCourses);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = initialCourses.filter((course) =>
            course.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    return (
        <>
            <CourseSearch onSearch={handleSearch} searchQuery={searchQuery} />
            <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {filteredCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        {...course}
                        progress={course.progress}
                        userId={userId}
                    />
                ))}
            </section>
        </>
    );
}