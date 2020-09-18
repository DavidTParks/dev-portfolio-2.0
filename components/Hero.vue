<template>
  <div class="relative bg-darkteal overflow-hidden">
    <div class="hero">
      <div class="train-wrapper">
        <Train class="train w-3/12 h-auto"/>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto ">

    </div>
  </div>
</template>

<script>
import Train from '~/assets/svg/train-styled.svg';
export default {
  components: {
    Train
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
    background: radial-gradient(circle, rgba(186, 45, 126, 0.8) 0%, rgba(122, 202, 196, 0) 30%);
    width: 40%;
    height: 40%;
    border-radius: 50%;
    mix-blend-mode: hard-light;
    position: absolute;
    overflow: visible;
    top: 0;
    right: 9%;
    transform: scale(1);
    animation: pulse 2600ms ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1); }
  to {
    transform: scale(1.5); } }

@keyframes train {
  0% {
    transform: translateX(0);
  }
  50% {
      transform: translateX(-90vw);
  }
  100% {
      transform: translateX(0);
  }
}

</style>