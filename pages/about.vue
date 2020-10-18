<template>
<div>
  <AboutMeHero :article="article"/>
  <PageBreak/>
  <BlogSection>
    <div class="grid grid-cols-4">
      <div>
        <figure>
          <img class="w-24 h-24 lg:w-56 lg:h-56 overflow-hidden rounded-lg object-cover border-2 border-retropink" src="http://davidparksdev.imgix.net/davidthomaspark_2.png?q=70&w=400&=400&fm=webp"/>
          <figcaption class="text-white text-sm mt-2">Robot David</figcaption>
        </figure>
      </div>
      <article class="prose prose-lg lg:prose-xl col-span-3">
        <nuxt-content :document="about" />
      </article>
    </div>
    <div class="mt-12 flex flex-col justify-center">
      <h2 class="text-retroteal text-4xl font-h2">Work History</h2>
      <div class="mt-4">
        <div class="flex">
          <div class="w-6 h-auto bg-transparent border border-retropink rounded-full flex-shrink-0 inline-flex items-center justify-center">
            <svg class="w-6 h-6 hidden text-retropink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
          </div>
          <div class="ml-4 flex flex-col space-y-12">
            <div v-for="job in jobs" :key="job.company">
              <small class="text-gray-600 text-base">{{job.date}}</small>
              <h2 class="text-2xl text-retrogreen">{{job.title}}</h2>
              <h3 class="text-xl text-retroyellow">{{job.company}}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlogSection>
</div>
</template>


<script>
export default {
  layout: 'blog',
  data() {
    return {
      article: {
        title: 'About Me',
        subtite: 'Who the hell am I?'
      },
      jobs: [
        {
          date: 'July 2020 - Present',
          title: 'Frontend Developer',
          company: 'AddEvent, Inc'
        },
        {
          date: 'January 2019 - July 2020',
          title: 'Web Developer',
          company: 'gateB, Inc'
        },
      ]
    }
  },
  async asyncData({ $content }) {
    const about = await $content('about').fetch()

    return {
      about
    }
  }
}
</script>