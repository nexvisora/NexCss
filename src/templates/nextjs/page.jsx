import { useState } from 'react';

export default function Dashboard() {
  const [stats] = useState([
    { name: 'Total Subscribers', stat: '71,897', change: '12%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '58.16%', change: '2.02%', changeType: 'decrease' },
    { name: 'Avg. Click Rate', stat: '24.57%', change: '3.2%', changeType: 'increase' }
  ]);

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Last 30 days</h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.stat}</dd>
            <dd className={`mt-2 flex items-baseline gap-x-2 ${
              item.changeType === 'increase' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              <div className="flex items-baseline text-sm font-semibold">
                {item.change}
                <svg
                  className={`h-4 w-4 flex-none ${
                    item.changeType === 'increase' ? 'rotate-0' : 'rotate-180'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">from last month</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Activity</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              A list of all recent activities including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
