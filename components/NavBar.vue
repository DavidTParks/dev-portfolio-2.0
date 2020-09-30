<template>
<nav class="w-full fixed z-50 dark:bg-darkteal bg-lightblue top-0">
  <div class="relative max-w-lg sm:max-w-xl md:max-w-3xl mx-auto lg:max-w-5xl">
    <div class="relative flex items-center justify-start h-16">
      <div class="flex items-center px-4 lg:px-0 w-full">
          <div class="flex w-full">
            <nuxt-link to="/" class="py-2 rounded-md text-sm md:text-lg leading-5 font-medium text-retropink font-h2 dark:hover:text-white hover:text-darkpurple focus:outline-none dark:focus:text-white transition duration-150 ease-in-out dark:font-h2">David Parks</nuxt-link>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-sm md:text-lg leading-5 font-medium dark:text-gray-300 text-black hover:text-white hover:bg-black focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Blog</a>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-sm md:text-lg leading-5 font-medium dark:text-gray-300 text-black hover:text-white hover:bg-black focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a>
            <button v-if="$colorMode.value === 'dark'" class="ml-auto focus:outline-none" @click="toggle"><Sun class="w-6 h-6 text-white hover:text-retroyellow fill-current"/></button>
            <button v-if="$colorMode.value === 'light'" class="ml-auto focus:outline-none" @click="toggle"><Moon class="w-6 h-6 text-black hover:text-gray-800 fill-current"/></button>
          </div>
      </div>
    </div>
  </div>
</nav>

</template>

<script>
import Moon from '~/assets/svg/moon.svg';
import Sun from '~/assets/svg/sun.svg';
export default {
  components: {
    Moon,
    Sun
  },
  methods: {
    toggle() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    }
  }
}
</script>