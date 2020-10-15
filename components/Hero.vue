<template>
  <div class="relative dark:bg-darkteal bg-lightblue overflow-hidden transition-colors duration-500">
    <div class="hero">
      <button @click="playTrainSound" :class="[isRightTrain ? 'right-light' : 'left-light' ]" class="train-wrapper focus:outline-none">
        <Train class="train w-3/12 h-auto"/>
      </button>
      <BuildingOne class="building1"/>
      <BuildingTwo class="building2"/>
      <div class="boat-wrapper">
        <Boat class="boat"/>
      </div>
      <div class="cloud-wrap">
        <template v-if="$colorMode.value === 'dark'">
          <AbstractCloud class="cloud cloud1"/>
          <AbstractCloud class="cloud cloud2 "/>
          <AbstractCloud class="cloud cloud3 "/>
          <AbstractCloud class="cloud cloud4 "/>
        </template>
        <template v-if="$colorMode.value === 'light'">
          <LightCloud class="cloud cloud1"/>
          <LightCloud class="cloud cloud2 "/>
          <LightCloud class="cloud cloud3 "/>
          <LightCloud class="cloud cloud4 "/>
        </template>
      </div>
      <Crates class="crates"/>
      <Station class="station"/>
      <Dock class="dock"/>
      <header class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-32 xl:mt-28 z-20">
        <div class="text-center">
          <h1 class="dark:text-retroteal dark:light-blue-glow text-gray-900 dark:pink-glow text-4xl tracking-tight leading-10 font-h1 sm:text-5xl sm:leading-none md:text-6xl ">David Parks</h1>
          <p class="mt-3 max-w-md mx-auto text-base dark:text-lightblue text-black sm:text-lg md:mt-5 md:text-xl md:max-w-2xl">
            Welcome to my website! Here you can find some projects I've worked on, and some blogs on things that interest me. Oh, and don't mind the city below you, they are happy to have you. Thanks for coming!
          </p>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import Train from '~/assets/svg/train-5.svg';
import AbstractCloud from '~/assets/svg/abstract-cloud.svg'
import LightCloud from '~/assets/svg/light-cloud.svg'
import BuildingOne from '~/assets/svg/building1.svg'
import BuildingTwo from '~/assets/svg/building2.svg'
import Boat from '~/assets/svg/boat.svg'
import Dock from '~/assets/svg/dock.svg'
import Crates from '~/assets/svg/crates.svg'
import Station from '~/assets/svg/station.svg'
export default {
  data() {
    return {
      isRightTrain: false,
    }
  },
  mounted() {
    setInterval(() => {
      this.isRightTrain = !this.isRightTrain;
    }, 20000)
  },
  components: {
    Train,
    AbstractCloud,
    LightCloud,
    BuildingOne,
    BuildingTwo,
    Boat,
    Dock,
    Crates,
    Station,
  },
  methods: {
    playTrainSound() {
      var audio = new Audio(require('@/assets/sounds/train.wav'));
      audio.play();
    }
  }
}
</script>

<style>
.hero {
  background-image: url('~assets/svg/trimmed-optim.svg?inline');
  background-repeat: no-repeat, no-repeat;
  background-position: bottom center, 50% -100px;
  background-size: 100%, 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 450px;
  margin-bottom: -1px;
  position: relative;
}

@media only screen and (max-width: 576px) {
  .hero {
    min-height: 300px;
  }
}

.dark .hero h1 {
  @apply teal-glow;
}

.boat-wrapper {
  width: 12vw;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 5%;
  margin: auto;
  height: auto;
  transform: translate3d(0, 0, 0);
  animation-name: cloud-animation;
  animation-duration: 200s;
  animation-iteration-count: infinite;
}

.boat {
  position: relative;
}

.dark .boat-wrapper:before {
  content: '';
  background: #57ffe9;
  background: radial-gradient(circle, rgba(186, 45, 126, 0.8) 0%, rgba(122, 202, 196, 0) 30%);
  width: 40%;
  height: 40%;
  border-radius: 50%;
  mix-blend-mode: hard-light;
  position: absolute;
  overflow: visible;
  top: 0;
  right: 0%;
  transform: scale(1);
  animation: pulse 2600ms ease-in-out infinite alternate;
  margin-top: -6%;
  margin-right: -3.5%;
}

.building1 {
  width: 5vw;
  position: absolute;
  bottom: 0;
  right: 15%;
  height: auto;
}

.dock {
  position: absolute;
  bottom: 0;
  right: 0;
  height: auto;
  width: 40%;
}

.crates {
  position: absolute;
  right: 30%;
  bottom: 0;
  height: auto;
  width: 5vw;
}

.station {
  position: absolute;
  bottom: 1%;
  right: 30%;
  height: auto;
  width: 8vw;
}

.building2 {
  width: 7vw;
  position: absolute;
  bottom: 0;
  left: 15%;
  height: auto;
}

.building3 {
  width: 5vw;
  position: absolute;
  bottom: 0;
  right: 20%;
  height: auto;
}

.train {
  margin-left: auto;
  transform: translate3d(0, 0, 0);
}

.train-wrapper {
  position: absolute;
  bottom: 0;
  bottom: 0;
  right: 0;
  margin-bottom: 1.2%;
  overflow: visible;
  animation-name: train;
  animation-duration: 40s;
  animation-iteration-count: infinite;
}


.dark .left-light:before {
  right: 11%;
  content: '';
  background: #57ffe9;
  background: radial-gradient(circle, rgba(87, 255, 233, 0.4) 0%, rgba(122, 202, 196, 0) 30%);
  width: 40%;
  height: 40%;
  border-radius: 50%;
  mix-blend-mode: hard-light;
  position: absolute;
  overflow: visible;
  top: 0;
  transform: scale(1);
  animation: 1s appear ease-in-out;
}

.dark .right-light:before {
  right: -27%;
  content: '';
  background: #57ffe9;
  background: radial-gradient(circle, rgba(87, 255, 233, 0.4) 0%, rgba(122, 202, 196, 0) 30%);
  width: 40%;
  height: 40%;
  border-radius: 50%;
  mix-blend-mode: hard-light;
  position: absolute;
  overflow: visible;
  top: 0;
  transform: scale(1);
  animation: 1s appear ease-in-out;
}

.plane {
  height: auto;
  width: 5vw;
  bottom: 20%;
  right: 0;
  transform: translate3d(0, 0, 0);
  animation: plane 20s 1 linear forwards;
}

@keyframes plane {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-150vw, -40vh, 0);
    display: none;
  }
}

.dark .cloud {
  transform: translate3d(0, 0, 0);
  animation-name: cloud-animation;
  animation-duration: 60s;
  animation-iteration-count: infinite;
  filter: brightness(0.3);
}

.light .cloud {
  transform: translate3d(0, 0, 0);
  animation-name: cloud-animation;
  animation-duration: 60s;
  animation-iteration-count: infinite;
}

.cloud2 {
  position: absolute;
  height: 2rem;
  left: 10%;
}

.cloud1 {
  height: 5rem;
  position: absolute;
  right: 20%;
}

.cloud3 {
  position: absolute;
  height: 5rem;
  left: 0;
  right: 0;
}

.cloud4 {
  position: absolute;
  height: 6rem;
  left: 50%;
  right: 0;
}

@keyframes pulse {
  from {
    transform: scale(1); 
  }
  to {
    transform: scale(1.5); 
  } 
}

@keyframes train {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-90vw, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes cloud-animation {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-200px, 0, 0);
  }
  100% {
      transform: translate3d(0, 0, 0);
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>