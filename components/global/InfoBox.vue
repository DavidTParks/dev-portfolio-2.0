<template>
  <div :class="[`border-${color}`]" class="bg-darkblue border-l-8 text-white p-4 my-8 infobox overflow-hidden shadow-sm">
    <div class="flex items-start">
      <div class="mr-4 flex-shrink-0">
        <svg v-if="variant === 'info'" :class="[`text-${color}`]" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <svg v-if="variant === 'warning'" :class="[`text-${color}`]" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <svg v-if="variant === 'danger'" :class="[`text-${color}`]" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>
        <svg v-if="variant === 'help'" :class="[`text-${color}`]" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
        <svg v-if="variant === 'callToAction'" :class="[`text-${color}`]" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        <svg v-if="variant === 'question'" :class="[`text-${color}`]" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <div class="flex-grow-0">
        <p class="m-0 text-sm md:text-base"><slot>default</slot></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'info'
    }
  },
  computed: {
    color() {
      switch (this.variant) {
        case 'info':
          return 'infoblue';
          break;
        case 'warning':
          return 'retroyellow';
          break;
        case 'danger':
          return 'retrored';
          break;
        case 'help':
          return 'retroteal';
          break;
        case 'callToAction':
          return 'retrogreen';
          break;
        case 'question':
          return 'retropink';
          break;
        default:
          return 'infoblue';
          break;
      }
    }
  }
}
</script>

<style>

</style>