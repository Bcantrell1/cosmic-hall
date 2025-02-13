export default function Loading() {
    return (
        <div className="container mx-auto p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="flex gap-4">
                <div className="w-64 hidden md:block">
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-16 bg-gray-200 rounded-t mb-4"></div>
                    <div className="space-y-4">
                        <div className="h-24 bg-gray-200 rounded"></div>
                        <div className="h-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
