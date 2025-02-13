export const metadata = {
    title: 'Cosmic Hall | Authentication',
    description: 'Authentication pages for Cosmic Hall.',
};
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 min-h-fit items-center justify-center py-24">{children}</div>
    );
}
