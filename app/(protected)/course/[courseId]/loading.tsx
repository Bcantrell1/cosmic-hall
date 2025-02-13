export default function Loading() {
    return (
        <div className="container mx-auto p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-full mt-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
