export default function Loading() {
    return (
        <div className="container mx-auto p-4">
            <div className="p-2 mb-3">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] place-items-center">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-[350px] h-[400px] bg-gray-200 rounded-lg animate-pulse"
                    />
                ))}
            </section>
        </div>
    );
}
