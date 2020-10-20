<template>
  <button aria-label="Play dinosaur sound" @click.prevent="playSound('http://lotl.popapostle.com/sounds/LOTL09/roar.wav')" class="hidden md:inline-block -ml-48 absolute focus:outline-none cvis">
      <Dino class="w-32 h-32 dino-article cvis"/>
  </button>
</template>

<script>
import Dino from '~/assets/svg/dino-4.svg'
export default {
  props: ['variant'],
  components: {
    Dino,
  },
  methods: {
    playSound(sound) {
      if(sound) {
        const audio = new Audio(sound);
        audio.play();
      }
    }
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