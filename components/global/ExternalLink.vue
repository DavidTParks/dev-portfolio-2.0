<template>
  <a rel="noopener noreferrer" target="_blank" :href="link">
    <slot/>
  </a>
</template>

<script>
export default {
  props: ['link'],
}
</script>