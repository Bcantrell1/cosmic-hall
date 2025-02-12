export const ActivitySkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center py-4">
      <div className="h-7 w-48 bg-gray-200 rounded"></div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>

    <div className="mt-8 space-y-6">
      <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  </div>
); 