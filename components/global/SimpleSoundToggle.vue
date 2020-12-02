<template>
  <info-box :variant="'help'">
    <p class="m-0 mb-2 dark:text-retroteal">Is sound enabled: {{isSoundEnabled}}</p>
    <button class="px-4 py-2 bg-retroteal text-darkteal rounded-lg" @click="toggleSound">
      Toggle my sound preference!
    </button>
    <button class="px-4 py-2 bg-retroteal text-darkteal rounded-lg" @click="playSound">
      Play sound!
    </button>
  </info-box>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('initializeSound');
  },
  methods: {
    toggleSound() {
      this.$store.commit('toggleSound');
    },
    playSound() {
      if(this.isSoundEnabled) { 
        this.audio = new Audio(require('@/assets/sounds/zap.mp3'));
        this.audio.play();
      }
    },
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    }
  }
}
</script>