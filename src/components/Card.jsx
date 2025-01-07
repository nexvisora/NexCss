export function Card({ title, description, image, tags, action }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {image && (
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {action && (
          <div className="mt-4">
            <button
              onClick={action.onClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
