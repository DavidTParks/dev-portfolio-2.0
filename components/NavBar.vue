<template>
<nav class="dark:bg-darkteal bg-lightblue nav transition-colors duration-500" :class="{'fixed top-0 w-full z-10' : page === 'blog'}">
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
              <nuxt-link to="/blogs" href="#" class="px-3 py-2 rounded-md text-sm font-h2 font-medium leading-5 text-gray-800 dark:text-gray-300 focus:outline-none transition duration-150 ease-in-out group link-style">Blog</nuxt-link>
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
        <button @click="toggleMobileMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="!showMobileMenu">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="mobile-menu fixed overflow-hidden inset-0 z-50" v-show="showMobileMenu">
    <button @click="toggleMobileMenu" class="z-50 absolute top-0 right-0 m-3 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="h-screen w-screen bg-darkteal absolute inset-0 opacity-75">

    </div>
    <div class="block">
      <nav class="">
        <div class="ml-12">
          <nuxt-link @click.native="showMobileMenu = false" to="/" class="mt-1 block px-3 py-2 rounded-md text-2xl font-h2 text-gray-300 focus:outline-none transition duration-150 ease-in-out">Home</nuxt-link>
          <nuxt-link @click.native="showMobileMenu = false" to="/blogs" class="mt-1 block px-3 py-2 rounded-md text-2xl font-h2 text-gray-300 focus:outline-none transition duration-150 ease-in-out">Blog</nuxt-link>
        </div>
        <div>
        </div>
      </nav>
    </div>
  </div>
</nav>

</template>

<script>
import Moon from '~/assets/svg/moon.svg';
import Sun from '~/assets/svg/sun.svg';
import Logo from '~/assets/svg/retro-sun-4.svg';
export default {
  props: ['page'],
  components: {
    Moon,
    Sun,
    Logo,
  },
  data() {
    return {
      showMobileMenu: false,
    }
  },
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    }
  },
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

.mobile-menu {
  backdrop-filter: blur(3px);
}

.mobile-menu nav {
  position: absolute;
  left: 0px;
  bottom: 100px;
  width: 75%;
  height: 75%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
}
</style>