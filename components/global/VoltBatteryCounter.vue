<template>
  <div class="mt-32 dark:text-retroteal text-infoblue teal-glow flex justify-center flex-col battery" :class="{'dark:text-retrored text-retrored red-glow dark:red-glow' : voltsMaxed}">
    <div class="flex items-center mt-4 justify-center">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      <p class="uppercase ml-1" v-if="$fetchState.pending">Retrieving power levels...</p>
      <p class="uppercase ml-1" v-else-if="$fetchState.error">Battery malfunction</p>
      <p class="uppercase ml-1" v-else>{{initialVolts}} {{initialVolts > 1 ? 'volts' : 'volt'}} <span v-if="voltsMaxed">MAX CAPACITY</span></p>
    </div>
    <button @click="addVolt" :class="{'dark:border-retrored border-retrored' : voltsMaxed}" class="dark:border-retroteal border-infoblue green-glow bg-transparent dark:bg-tokyosky border-4 text-white p-4 shadow-sm rounded-lg grid grid-cols-12 gap-2 mt-4 focus:outline-none relative">
      <span v-for="index in volts" :class="{'dark:bg-retrored bg-retrored' : voltsMaxed}" :key="index" class="rotate-45 h-8 w-3 dark:bg-retroteal bg-infoblue"></span>
      <span :class="{'dark:bg-retrored bg-retrored' : voltsMaxed}" class="absolute bottom-0 right-0 m-auto p-1 dark:bg-retroteal bg-infoblue"></span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initialVolts: null,
      volts: 1,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`.netlify/functions/fetch_volts_for_blog?slug=${this.$route.params.slug}`);
    this.initialVolts = data.volts;
  },
  fetchOnServer: false,
  methods: {
    async addVolt() {
      if(this.volts < 12) {
        this.audio = new Audio(require('@/assets/sounds/charge.wav'));
        this.audio.playbackRate = 1 + this.volts / 2;
        this.audio.play();
        this.volts++;
        this.initialVolts++;
        const { data } = await this.$axios.get(`/.netlify/functions/register-volt?slug=${this.$route.params.slug}`);
      } else {
        this.audio = new Audio(require('@/assets/sounds/capacity.mp3'));
        this.audio.play();
      }
    }
  },
  watch: {
    volts(val) {
      if(val === 12) {
        this.audio = new Audio(require('@/assets/sounds/capacity.mp3'));
        this.audio.play();
      }
    }
  },
  computed: {
    voltsMaxed() {
      return this.volts === 12;
    }
  }
}
</script>

<style scoped>
.battery {
  transform:
    perspective(800px)
    rotateY(25deg) scale(0.9)
    rotateX(10deg);
  opacity: 0.5;
  transition: 0.6s ease all;
}

.battery:hover {
  transform:
      perspective(800px)
      rotateY(-15deg)
      translateY(-50px)
      rotateX(10deg)
      scale(1);
    filter: blur(0);
    opacity: 1;
}
</style>