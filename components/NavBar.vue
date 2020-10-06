<template>
<!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
<nav class="dark:bg-darkteal bg-lightblue nav" :class="{'fixed top-0 w-full z-10' : page === 'blog'}">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <nuxt-link to="/" class="flex items-center dark:text-lightblue text-darkpurple david-logo">
            <Logo class="block lg:hidden h-6 w-auto"/>
            <Logo class="hidden lg:block h-6 w-auto"/>
            <span class="font-h1 text-xl ml-3">David Parks</span>
          </nuxt-link>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex">
            <div class="relative flex ml-4">
              <a @mouseover="showBlogSquiggle = true" @mouseout="showBlogSquiggle = false"  href="#" class="px-3 py-2 rounded-md text-sm font-h2 font-medium leading-5 text-gray-800 dark:text-gray-300 focus:outline-none transition duration-150 ease-in-out group link-style">Blog</a>
              <ZigZag :class="{'opacity-100' : showBlogSquiggle}" class="w-12 transition-opacity opacity-0 duration-200 absolute text-darkpurple dark:text-retroteal left-0 right-0 top-0 mt-8 mx-auto"/>
            </div>
            <div class="relative flex ml-4">
              <a @mouseover="showProjectSquiggle = true" @mouseout="showProjectSquiggle = false" href="#" class="px-3 py-2 rounded-md text-sm font-h2 font-medium leading-5 text-gray-800 dark:text-gray-300 focus:outline-none transition duration-150 ease-in-out link-style">Projects</a>
              <ZigZag2 :class="{'opacity-100' : showProjectSquiggle}" class="w-12 transition-opacity opacity-0 duration-200 absolute text-darkpurple dark:text-retroyellow left-0 right-0 top-0 mt-8 mx-auto"/>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden sm:ml-6 sm:block">
        <div class="flex items-center">
          <button v-if="$colorMode.value === 'dark'" class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none transition duration-150 ease-in-out" @click="toggle"><Sun class="w-6 h-6 text-white hover:text-retroyellow fill-current" aria-label="Activate light mode"/></button>
          <button v-if="$colorMode.value === 'light'" class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none transition duration-150 ease-in-out" @click="toggle"><Moon class="w-6 h-6 text-black hover:text-gray-800 fill-current" aria-label="Activate dark mode"/></button>
          <a target="_blank" href="/feed.xml" class="p-1 border-2 border-transparent rounded-full hover:text-white focus:outline-none transition duration-150 ease-in-out" aria-labelledby="rss-title"><svg class="w-6 h-6 text-black dark:text-white dark:hover:text-gray-100  hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></a>
        </div>
      </div>
      <div class="-mr-2 flex sm:hidden">
        <!-- Mobile menu button -->
        <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
          <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Icon when menu is open. -->
          <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
  <div class="hidden sm:hidden">
    <div class="px-2 pt-2 pb-3">
      <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Dashboard</a>
      <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Team</a>
      <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a>
      <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Calendar</a>
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="flex items-center px-5">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        </div>
        <div class="ml-3">
          <div class="text-base font-medium leading-6 text-white">Tom Cook</div>
          <div class="text-sm font-medium leading-5 text-gray-400">tom@example.com</div>
        </div>
      </div>
      <div class="mt-3 px-2">
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Your Profile</a>
        <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Settings</a>
        <a href="#" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Sign out</a>
      </div>
    </div>
  </div>
</nav>

</template>

<script>
import Moon from '~/assets/svg/moon.svg';
import Sun from '~/assets/svg/sun.svg';
import Logo from '~/assets/svg/retro-sun-4.svg';
import ZigZag from '~/assets/svg/ziggy-1.svg';
import ZigZag2 from '~/assets/svg/ziggy-2.svg';
export default {
  props: ['page'],
  components: {
    Moon,
    Sun,
    Logo,
    ZigZag,
    ZigZag2
  },
  data() {
    return {
      showBlogSquiggle: false,
      showProjectSquiggle: false
    }
  },
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    }
  }
}
</script>

<style>
.dark .david-logo {
  @apply light-blue-glow;
  
}

.dark .david-logo svg {
  filter: drop-shadow(0px 0px 8px rgba(198, 208, 235, 0.6));
}

.dark .link-style {
  @apply light-blue-glow;
}
</style>