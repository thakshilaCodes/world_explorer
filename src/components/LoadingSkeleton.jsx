export default function LoadingSkeleton() {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-600"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }
  
  // For the grid loading state (used in Home component)
  export function LoadingGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(12)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    )
  }