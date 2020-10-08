<template>
  <button @click="$emit('click')" class="px-6 py-3 text-base leading-6 rounded-md font-h2 bg-gradient-to-r from-neonhaze to-retroteal text-white focus:outline-none transition ease-in-out duration-150">
    <slot/>
  </button>
</template>

<script>
export default {
  
}
</script>
