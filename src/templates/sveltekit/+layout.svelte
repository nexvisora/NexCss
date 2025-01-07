<script>
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  // Dark mode handling
  let darkMode = false;

  onMount(() => {
    if (browser) {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', darkMode);
    }
  });

  function toggleDarkMode() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
  }
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <nav class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="/logo.svg" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="/"
              class="inline-flex items-center border-b-2 {$page.url.pathname === '/' ? 'border-primary-500' : 'border-transparent'} px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Dashboard
            </a>
            <a
              href="/team"
              class="inline-flex items-center border-b-2 {$page.url.pathname === '/team' ? 'border-primary-500' : 'border-transparent'} px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Team
            </a>
            <a
              href="/projects"
              class="inline-flex items-center border-b-2 {$page.url.pathname === '/projects' ? 'border-primary-500' : 'border-transparent'} px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              Projects
            </a>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button
            type="button"
            class="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            on:click={toggleDarkMode}
          >
            <span class="sr-only">Toggle dark mode</span>
            {#if darkMode}
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            {:else}
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            {/if}
          </button>
          <button
            type="button"
            class="ml-3 rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          <div class="relative ml-3">
            <button
              type="button"
              class="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>
</div>

<style>
  :global(html) {
    @apply antialiased;
  }
  
  :global(html.dark) {
    color-scheme: dark;
  }
</style>
