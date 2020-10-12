<template>
  <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 article-toc">
    <section ref="blogContent" class="block col-span-1 lg:col-span-2 mt-0 md:mt-16">
      <article class="prose lg:prose-xl">
        <nuxt-content :document="article" />
        <div class="flex justify-between">
          <div class="flex flex-col dark:text-gray-300 text-gray-900">
            <p class="text-lg mb-0 uppercase">Last updated</p>
            <span class="text-gray-600">{{ formatDate(article.updatedAt) }}</span>
          </div>
          <HitCounter/>
        </div>
        <PrevNext :prev="prev" :next="next" />
      </article>
    </section>
    <aside class="hidden lg:col-span-1 lg:flex lg:flex-col">
      <div class="sticky top-16">
        <h2 class="dark:text-white uppercase text-black font-h2 text-lg mt-16 tracking-wider">Table of contents</h2>
        <nav class="mt-4">
          <ul>
            <li @click="tableOfContentsHeadingClick(link)" :class="{ 'toc2': link.depth === 2, 'pl-4': link.depth === 3, 'active': link.id === currentlyActiveToc }" class="toc-list" v-for="link of article.toc" :key="link.id">
              <a class="dark:text-lightblue text-black hover:text-gray-800 dark:hover:text-white transition-colors duration-75 text-base mb-2 block" :href="`#${link.id}`">{{ link.text }}</a>
            </li>
          </ul>
        </nav>
        <VoltBatteryCounter/>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  props: ['article', 'next', 'prev'],
  data() {
    return {
      currentlyActiveToc: '',
      isClickScrolling: false,
      observer: null,
      observerOptions: {
        root: null,
        rootMargin: '-100px',
        threshold: 0
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting && !this.isClickScrolling) {
            this.currentlyActiveToc = id;
          }
      });
    }, this.observerOptions);

    // Track all sections that have an `id` applied
    document.querySelectorAll('h2[id]').forEach((section) => {
        this.observer.observe(section);
    });
    document.querySelectorAll('h3[id]').forEach((section) => {
        this.observer.observe(section);
    });
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    tableOfContentsHeadingClick(link) {
      this.isClickScrolling = true;
      this.currentlyActiveToc = link.id;

      setTimeout(() => {
        this.isClickScrolling = false;
      }, 1000);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style>
.article-toc {
  scroll-behavior: smooth;
}
</style>