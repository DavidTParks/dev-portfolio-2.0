<template>
<div class="relative">
  <div class="blog-section">
  
  </div>
  <div class="underground-tunnel">

  </div>
  <DinosaurOne class="dino1"/>
  <DinosaurTwo class="dino2"/>

  <div class="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto lg:max-w-5xl">
      <div>
        <h2 class="text-3xl leading-9 tracking-tight font-extrabold text-retropink sm:text-4xl sm:leading-10">
          Latest
        </h2>
        <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
          <p class="text-xl leading-7 text-lightblue">
            Get weekly articles in your inbox on how to grow your business.
          </p>
          <form class="mt-6 flex lg:mt-0 lg:justify-end">
            <input aria-label="Email address" type="email" required class="appearance-none w-full px-4 py-2 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out lg:max-w-xs" placeholder="Enter your email">
            <span class="ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
              <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gradient-to-r from-teal-400 to-blue-500 transition ease-in-out duration-150">
                Notify me
              </button>
            </span>
          </form>
        </div>
      </div>
      <div class="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        <div>
          <p class="text-sm leading-5 text-gray-500">
            <time datetime="2020-03-16">Mar 16, 2020</time>
          </p>
          <a href="#" class="block">
            <h3 class="mt-2 text-xl leading-7 font-semibold text-retropink">
              Boost your conversion rate
            </h3>
            <p class="mt-3 text-base leading-6 text-lightblue">
              Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.
            </p>
          </a>
          <div class="mt-3">
            <a href="#" class="text-base leading-6 font-semibold text-retroteal hover:text-indigo-500 transition ease-in-out duration-150">
              Read full story
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  height: 100%;
  width: 100%;
  filter: hue-rotate(200deg);
  opacity: 0.15;
  margin-top: -1rem;
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
  top: 20%;
}
</style>