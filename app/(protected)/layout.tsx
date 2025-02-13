import CourseHeader from '../ui/course/components/CourseHeader';

export const metadata = {
    title: 'Cosmic Hall | Course List',
    description: 'Course selection for the Cosmic Hall.',
};

export default async function CourseLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CourseHeader />
            <div className="mx-auto container">{children}</div>
        </>
    );
}
