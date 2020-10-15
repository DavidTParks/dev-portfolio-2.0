<template>
<div class="relative blog-wrap">
  <div class="blog-section">
      <div class="blog-gradient"/>
  </div>
  <DinosaurOne class="dino1"/>
  <DinosaurTwo class="dino2"/>
  <main class="pt-8 pb-20 lg:pt-12 lg:pb-28 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot/>
    </div>
  </main>
</div>
</template>

<script>
import DinosaurOne from '~/assets/svg/dino-1.svg'
import DinosaurTwo from '~/assets/svg/dino2.svg'
import DinosaurThree from '~/assets/svg/dino3.svg'
export default {
  components: {
    DinosaurOne,
    DinosaurTwo,
    DinosaurThree
  }
}
</script>

<style>

.dark .blog-section {
  background-image: url('~assets/svg/ground3.svg?inline');
  background-repeat: no-repeat no-repeat;
  background-position: top center, 10% 0px;
  background-size: 100%, 100%;
  position: absolute;
  height: 300px;
  width: 100%;
  filter: hue-rotate(200deg);
  opacity: 0.15;
  margin-top: -1.5rem;
}

.dark .blog-gradient {
  background: rgb(0,1,45);
  background: linear-gradient(0deg, rgba(0,1,45,1) 0%, rgba(0,0,0,0) 100%);
  position: absolute;
  height: 100%;
  width: 100%;
}

.light .blog-section { 
  background-image: url('~assets/svg/ground3-tan.svg?inline');
  background-repeat: no-repeat no-repeat;
  background-position: top center, 10% 0px;
  background-size: 100%, 100%;
  position: absolute;
  height: 305px;
  width: 100%;
  filter: hue-rotate(0deg);
  opacity: 0.35;
  margin-top: -1.5rem;
}

.light .blog-gradient {
  background: rgb(246, 234, 208);
  background: linear-gradient(0deg, rgba(246, 234, 208,1) 0%, rgba(0,0,0,0) 100%);
  position: absolute;
  height: 100%;
  width: 100%;
}

.dark .dino1 {
  position: absolute;
  height: 15vh;
  width: 15vw;
  transform: rotate(90deg);
  filter: brightness(1);
  opacity: 0.1;
  transform: translateX(5%);
}

.dark .dino1:before {
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

.dark .dino2 {
  position: absolute;
  height: 12vh;
  width: 12vw;
  right: 10%;
  filter: brightness(1);
  opacity: 0.1;
  transform: rotate(240deg);
  top: 3rem;
}

.light .dino1 {
  position: absolute;
  height: 15vh;
  width: 15vw;
  transform: rotate(90deg);
  filter: brightness(0);
  opacity: 0.2;
  transform: translateX(5%);
}

.light .dino2 {
  position: absolute;
  height: 12vh;
  width: 12vw;
  right:10%;
  filter: brightness(0);
  opacity: 0.2;
  transform: rotate(240deg);
  top: 3rem;
}
</style>