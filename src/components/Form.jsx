export function Form({ onSubmit, fields, submitLabel = 'Submit' }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {fields.map((field, index) => (
        <div key={index}>
          <label
            htmlFor={field.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {field.label}
            {field.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
          <div className="mt-1">
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                rows={field.rows || 3}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-900 dark:text-white sm:text-sm"
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                name={field.id}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-900 dark:text-white sm:text-sm"
                required={field.required}
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center">
                <input
                  id={field.id}
                  name={field.id}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500 dark:bg-gray-900"
                  required={field.required}
                />
                <label
                  htmlFor={field.id}
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  {field.checkboxLabel}
                </label>
              </div>
            ) : (
              <input
                type={field.type || 'text'}
                id={field.id}
                name={field.id}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-900 dark:text-white sm:text-sm"
                placeholder={field.placeholder}
                required={field.required}
                pattern={field.pattern}
                min={field.min}
                max={field.max}
                step={field.step}
              />
            )}
          </div>
          {field.hint && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {field.hint}
            </p>
          )}
        </div>
      ))}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
