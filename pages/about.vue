<template>
<div>
  <AboutMeHero :article="article"/>
  <PageBreak/>
  <BlogSection>
    <div class="grid grid-cols-1 lg:grid-cols-4">
      <div class="lg:pr-8">
        <RobotDavidPortrait/>
      </div>
      <article class="mt-12 lg:mt-0 prose prose-lg lg:prose-xl col-span-3">
        <nuxt-content :document="about" />
      </article>
    </div>
    <div class="mt-12 lg:mt-12 flex flex-col justify-center grid-cols-1 grid lg:grid-cols-2 space-y-8 lg:space-y-0">
      <div>
        <h2 class="dark:text-retroteal text-infoblue text-4xl font-h2 inline-flex items-center"><svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>Work History</h2>
        <div class="mt-4">
          <div class="space-y-8">
            <div class=flex v-for="job in jobs" :key="job.company">
              <div class="w-6 h-6 bg-transparent border border-retropink rounded-full flex-shrink-0 inline-flex items-center justify-center">
                <svg class="w-6 h-6 hidden text-retropink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
              </div>
              <div class="ml-4 flex flex-col space-y-12">
                <div class="job-card">
                  <small class="dark:text-gray-600 text-base">{{job.date}}</small>
                  <h3 class="text-2xl font-h2 dark:text-retrogreen">{{job.title}}</h3>
                  <a target="_blank" rel="noopener nofollow" :href="job.link"><h4 class="text-xl dark:text-retroyellow">{{job.company}}</h4></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="dark:text-retroteal text-infoblue text-4xl font-h2 inline-flex items-center"><svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>Education</h2>
        <div class="mt-4">
          <div class="space-y-8">
            <div class=flex>
              <div class="w-6 h-6 bg-transparent border border-retropink rounded-full flex-shrink-0 inline-flex items-center justify-center">
                <svg class="w-6 h-6 hidden text-retropink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
              </div>
              <div class="ml-4 flex flex-col space-y-12">
                <div class="job-card">
                  <small class="dark:text-gray-600 text-base">August 2014 - May 2018</small>
                  <h3 class="text-2xl font-h2 dark:text-retrogreen">B.S. Computer Science</h3>
                  <h4 class="text-xl dark:text-retroyellow">Loyola Marymount University</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlogSection>
</div>
</template>


<script>
import getSiteMeta from "~/utils/getSiteMeta.js";
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
          company: 'AddEvent, Inc',
          link: 'https://www.addevent.com/'
        },
        {
          date: 'January 2019 - July 2020',
          title: 'Web Developer',
          company: 'gateB, Inc',
          link: 'https://www.gateb.com/gateB-inc'
        },
        {
          date: 'September 2017 - May 2018',
          title: 'Full Stack Developer',
          company: 'Cryptosym',
          link: 'https://www.youtube.com/watch?v=kk6F14bAUmY'
        },
        {
          date: 'May 2016 - August 2017',
          title: 'Programming Intern',
          company: 'TechEmpower',
          link: 'https://www.techempower.com/'
        },
      ]
    }
  },
  async asyncData({ $content }) {
    const about = await $content('about').fetch()

    return {
      about
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: 'About - David Parks',
        description: this.article.description,
        url: `https://davidparks.dev/about`,
      };
      return getSiteMeta(metaData);
    }
  },
  head() {
    return {
      title: 'About - David Parks',
      meta: [
        ...this.meta,
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://davidparks.dev/about/`,
        },
      ],
    };
  }
}
</script>

<style>
.job-card {
  transition: all 100ms;
}

.job-card:hover {
  filter: brightness(1.5)
}
</style>