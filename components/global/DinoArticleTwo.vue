<template>
  <Dino class="hidden md:inline-block hover:w-24 h-24 -mr-48 right-0 absolute dino-article cvis"/>
</template>

<script>
import Dino from '~/assets/svg/dino-5.svg'
export default {
  components: {
    Dino,
  }
}
</script>

<style>
.dark .dino-article {
  height: 12vh;
  width: 12vw;
  transform: rotate(250deg);
  filter: brightness(1);
  opacity: 0.1;
  content-visibility: auto;
}

.light .dino-article {
  height: 12vh;
  width: 12vw;
  transform: rotate(250deg);
  filter: brightness(0);
  opacity: 0.2;
}
</style>