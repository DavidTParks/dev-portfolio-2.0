<template>
  <header class="pt-16 pb-20 lg:pt-16 lg:pb-28 dark:bg-darkteal bg-lightblue blog-hero overflow-hidden transition-colors duration-500">
    <div class="stars-wrapper">
      
    </div>
    <button aria-label="Play train sound" @click="playTrainSound" class="left-light train-wrapper-hero focus:outline-none">
      <Train class="train-hero w-3/12 h-auto"/>
    </button>

    <div class="moon-wrapper absolute top-0 right-0 mr-12 mt-12">
      <Moon v-if="$colorMode.value === 'dark'" class="moon h-12 w-12  lg:w-16 lg:h-16 relative"/>
      <Sun v-if="$colorMode.value === 'light'" class="moon h-12 w-12  lg:w-16 lg:h-16 relative"/>
    </div>
    <div class="relative md:pb-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center flex-col">
      <h1 class="leading-10 text-4xl font-extrabold  sm:text-4xl sm:leading-none md:text-6xl font-h1 dark:text-lightblue text-darkpurple mt-4 text-center">{{article.title}}</h1>
    </div>
  </header>
</template>

<script>
import Train from '~/assets/svg/train-5.svg';
import Moon from '~/assets/svg/moon-no-glow.svg';
import Sun from '~/assets/svg/sun-detail.svg';
import Chevron from  '~/assets/svg/chevron.svg';
export default {
  props: ['article'],
  components: {
    Train,
    Moon,
    Chevron,
    Sun
  },
  data() {
    return {
      audio: null
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    playTrainSound() {
      if(this.isSoundEnabled) {
        this.audio = new Audio(require('@/assets/sounds/train.wav'));
        this.audio.play();
      }
    }
  },
  destroyed() {
    if(this.audio) {
      this.audio.pause();
    }
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    }
  }
}
</script>

<style>
.blog-hero {
  background-image: url('~assets/svg/track.svg?inline');
  background-repeat: no-repeat, no-repeat;
  background-position: bottom center, 50% -100px;
  background-size: 100%, 100%;
  height: 100%;
  position: relative;
  max-width: 100vw;
  overflow: hidden;
}

.dark .blog-hero h1 {
  @apply light-blue-glow;
}

.train-hero {
  margin-left: auto;
  transform: translate3d(0, 0, 0);
}

.train-wrapper-hero {
  position: absolute;
  bottom: 0;
  bottom: 0;
  right: 0;
  margin-bottom: 1.1%;
  animation-name: trainblog;
  animation-duration: 40s;
  animation-iteration-count: infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes trainblog {
  0% {
    transform: translate3d(30vw, 0, 0);
  }
  100% {
    transform: translate3d(-115vw, 0, 0);
  }
}

.moon-wrapper:before {
  content: '';
  background: #57ffe9;
  background: radial-gradient(circle, rgba(214, 214, 214, 0.3) 0%, rgba(231, 231, 231, 0) 30%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  mix-blend-mode: hard-light;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: visible;
  z-index: 0;
  transform: scale(5);
}
</style>
