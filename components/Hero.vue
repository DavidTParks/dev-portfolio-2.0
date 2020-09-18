<template>
  <div class="relative bg-darkteal overflow-hidden">
    <div class="hero">
      <div class="train-wrapper">
        <Train class="train w-3/12 h-auto"/>
      </div>
      <BuildingOne class="building1"/>
      <BuildingTwo class="building2"/>
      <div class="cloud-wrap">
        <AbstractCloud class="cloud cloud1"/>
        <AbstractCloud class="cloud cloud2 "/>
        <AbstractCloud class="cloud cloud3 "/>
        <AbstractCloud class="cloud cloud4 "/>
      </div>
      <main class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-32 xl:mt-28 z-20">
      <div class="text-center">
        <h1 class="text-retropink text-4xl tracking-tight leading-10 font-bold sm:text-5xl sm:leading-none md:text-6xl ">David Parks</h1>
        <p class="mt-3 max-w-md mx-auto text-base text-lightblue sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Welcome to my website! Here you can find some projects I've worked on, and some blogs on things that interest me. Oh, and don't mind the fully functional city below you, they are happy to have you. Thanks for coming!
        </p>
      </div>
      </main>
    </div>
  </div>
</template>

<script>
import Train from '~/assets/svg/train-styled.svg';
import AbstractCloud from '~/assets/svg/abstract-cloud.svg'
import BuildingOne from '~/assets/svg/building1.svg'
import BuildingTwo from '~/assets/svg/building2.svg'
export default {
  components: {
    Train,
    AbstractCloud,
    BuildingOne,
    BuildingTwo
  }
}
</script>

<style>
.hero {
  background-image: url('~assets/svg/nolight.svg?inline');
  background-repeat: no-repeat, no-repeat;
  background-position: bottom center, 50% -100px;
  background-size: 100%, 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500px;
  margin-bottom: -1px;
  position: relative;
}

.building1 {
  width: 5vw;
  position: absolute;
  bottom: 0;
  right: 15%;
  height: auto;
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
    animation-name: train;
  animation-duration: 40s;
  animation-iteration-count: infinite;
  overflow: visible;
}

.train-wrapper:before {
    content: '';
    background: #57ffe9;
    background: radial-gradient(circle, rgba(87, 255, 233, 0.8) 0%, rgba(122, 202, 196, 0) 30%);
    width: 40%;
    height: 40%;
    border-radius: 50%;
    mix-blend-mode: hard-light;
    position: absolute;
    overflow: visible;
    top: 0;
    right: 10%;
    transform: scale(1);
    animation: pulse 2600ms ease-in-out infinite alternate;
}

.cloud {
  transform: translate3d(0, 0, 0);
  animation-name: cloud1;
  animation-duration: 60s;
  animation-iteration-count: infinite;
  filter: brightness(0.3);
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
    transform: scale(1); }
  to {
    transform: scale(1.5); } }

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

@keyframes cloud1 {
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

</style>