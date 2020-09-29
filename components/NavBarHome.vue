<template>
<nav class="w-full dark:bg-darkteal bg-lightblue">
  <div class="relative max-w-lg sm:max-w-xl md:max-w-3xl mx-auto lg:max-w-5xl">
    <div class="relative flex items-center justify-center h-16">
      <div class="flex items-center px-2 lg:px-0">
        <div class="">
          <div class="flex">
            <a href="#" class="px-3 py-2 rounded-md text-lg leading-5 font-medium dark:text-gray-300 text-neonhaze hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Blog</a>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-lg leading-5 font-medium dark:text-gray-300 text-neonhaze hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a>
            <a href="#" class="ml-4 px-3 py-2 rounded-md text-lg leading-5 font-medium dark:text-gray-300 text-neonhaze hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Contact</a>
            <button v-if="$colorMode.value === 'dark'" class="ml-4 focus:outline-none" @click="toggle"><Sun class="w-6 h-6 text-white hover:text-retroyellow fill-current"/></button>
            <button v-if="$colorMode.value === 'light'" class="ml-4 focus:outline-none" @click="toggle"><Moon class="w-6 h-6 text-black hover:text-gray-700 fill-current"/></button>
          </div>
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