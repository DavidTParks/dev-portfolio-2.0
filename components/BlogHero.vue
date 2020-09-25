<template>
  <main class="pt-16 pb-20 px-4 sm:px-6 lg:pt-16 lg:pb-28 lg:px-8 bg-darkteal blog-hero">
    <div class="left-light train-wrapper-hero">
      <Train class="train-hero w-3/12 h-auto"/>
    </div>
    <div class="moon-wrapper absolute top-0 right-0 mr-12">
      <Moon class="moon h-12 w-12  lg:w-24 lg:h-24 relative"/>
    </div>
    <div class="relative max-w-lg sm:max-w-xl md:max-w-3xl mx-auto lg:max-w-5xl pb-4">
      <p class="text-lg text-gray-500 mb-3">Article last updated: {{ formatDate(article.updatedAt) }}</p>
      <h1 class="text-4xl leading-10 font-extrabold  sm:text-5xl sm:leading-none md:text-5xl font-h1 text-lightblue mt-2">{{article.title}}</h1>
    </div>
  </main>
</template>

<script>
import Train from '~/assets/svg/train-5.svg';
import Moon from '~/assets/svg/moon-no-glow.svg';
export default {
  props: ['article'],
  components: {
    Train,
    Moon
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
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
  margin-bottom: 1.3%;
  animation-name: train;
  animation-duration: 40s;
  animation-iteration-count: infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes train {
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
