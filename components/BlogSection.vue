<template>
<div class="relative">
  <div class="blog-section">
  
  </div>
  <div class="blog-gradient">

  </div>
  <DinosaurOne class="dino1"/>
  <DinosaurTwo class="dino2"/>

  <main class="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto lg:max-w-5xl">
      <div class="grid gap-12 grid-cols-1 md:grid-cols-3">
        <section class="col-span-2">
          <h2 class="text-3xl leading-9 font-h1 text-retropink pink-glow sm:text-4xl sm:leading-10">
            Recent publications
          </h2>
          <div class="block">
            <article class="block mt-12">
              <a href="#">
                <h3 class="text-retroyellow text-2xl font-h2 yellow-glow">Sharing Cards for Nuxt Content</h3>
                <p class="text-gray-500 mb-3 mt-1 font-h2">Supercharge your social media prescence with beautiful sharing cards</p>
                <p class="text-lightblue mt-3 text-lg font-body">Have you ever wondered how people on Twitter get those beautiful sharing card previews for their blog posts? This post will teach you how, with Nuxt Content!</p>
                <div class="text-retroteal teal-glow mt-4 font-h2 text-lg">
                  Read more
                </div>
              </a>
            </article>
            <article class="block mt-12">
              <a href="#">
                <h3 class="text-retroyellow text-2xl font-h2 yellow-glow">Welcome to my blog!</h3>
                <p class="text-gray-500 mb-3 mt-1 font-h2">The story behind this blog, and the inspiration for it</p>
                <p class="text-lightblue mt-4 text-lg">Welcome to my blog! Here you can find some topics that interest me, as well as a variety of proejcts I have worked on.</p>
                <div class="text-retroteal teal-glow mt-4 font-h2 text-lg">
                  Read more
                </div>
              </a>
            </article>
          </div>
        </section>
        <section class="flex flex-col col-span-1">
          <h3 class="text-3xl leading-9 font-h1 text-retropink pink-glow sm:text-4xl sm:leading-10">Categories</h3>
        </section>
      </div>
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