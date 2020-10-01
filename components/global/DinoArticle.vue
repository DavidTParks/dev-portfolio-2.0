<template>
  <Dino class="w-24 h-24 absolute left-0 dino-article cvis"/>
</template>

<script>
import Dino from '~/assets/svg/dino-4.svg'
export default {
  props: ['variant'],
  components: {
    Dino,
  }
}
</script>

<style>
.dark .dino-article {
  height: 12vh;
  width: 12vw;
  transform: rotate(120deg);
  filter: brightness(1);
  opacity: 0.1;
}

.light .dino-article {
  height: 12vh;
  width: 12vw;
  transform: rotate(120deg);
  filter: brightness(0);
  opacity: 0.2;
}
</style>