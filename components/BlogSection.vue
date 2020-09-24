<template>
<div class="relative">
  <div class="blog-section">
  
  </div>
  <div class="blog-gradient">

  </div>
  <DinosaurOne class="dino1"/>
  <DinosaurTwo class="dino2"/>
  <main class="pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto lg:max-w-5xl">
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
.blog-section {
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

.blog-gradient {
  background: rgb(0,1,45);
  background: linear-gradient(0deg, rgba(0,1,45,1) 0%, rgba(0,0,0,0) 100%);
  position: absolute;
  height: 285px;
  width: 100%;
}

.dino1 {
  position: absolute;
  height: 15vh;
  width: 15vw;
  transform: rotate(90deg);
  filter: brightness(1);
  opacity: 0.1;
  transform: translateX(5%);
}

.dino2 {
  position: absolute;
  height: 12vh;
  width: 12vw;
  right:5%;
  filter: brightness(1);
  opacity: 0.1;
  transform: rotate(240deg);
  top: 3rem;
}
</style>