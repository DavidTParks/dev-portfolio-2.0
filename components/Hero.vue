<template>
  <div class="relative bg-darkteal overflow-hidden">
    <div class="hero">
      <div class="train-wrapper">
        <Train class="train w-3/12 h-auto"/>
      </div>
      <div class="cloud-wrap">
        <AbstractCloud class="cloud cloud1"/>
        <AbstractCloud class="cloud cloud2 "/>
        <AbstractCloud class="cloud cloud3 "/>
        <AbstractCloud class="cloud cloud4 "/>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto ">

    </div>
  </div>
</template>

<script>
import Train from '~/assets/svg/train-styled.svg';
import AbstractCloud from '~/assets/svg/abstract-cloud.svg'
export default {
  components: {
    Train,
    AbstractCloud
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
  min-height: 400px;
  margin-bottom: -1px;
  position: relative;
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
    transform: translateX(0);
  }
  50% {
      transform: translateX(-40px);
  }
  100% {
      transform: translateX(0);
  }
}

</style>