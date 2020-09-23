<template>
<nav class="bg-darkteal">
  <div class="max-w-3xl mx-auto px-2 sm:px-4 lg:px-8">
    <div class="relative flex items-center justify-center h-16">
      <div class="flex items-center px-2 lg:px-0">
        <div class="lg:block lg:ml-6">
          <div class="flex">
            <a href="#" class="px-3 py-2 rounded-md text-sm leading-5 font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Home</a>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Blog</a>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Contact</a>
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input id="search" class="hidden block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out" placeholder="Search" type="search">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

</template>