<template>
  <aside ref="toc" class="lg:col-span-1 lg:flex lg:flex-col">
    <div class="sticky top-16">
      <h2 class="dark:text-white uppercase text-black font-h2 text-lg lg:mt-16 tracking-wider">Table of contents</h2>
      <nav class="mt-4">
        <ul>
          <li @click="tableOfContentsHeadingClick(link)" :class="{ 'toc2': link.depth === 2, 'pl-4': link.depth === 3, 'active': link.id === currentlyActiveToc }" class="toc-list" v-for="link of articleToc" :key="link.id">
            <a role="button" class="dark:text-lightblue text-black hover:text-gray-800 dark:hover:text-white transition-colors duration-75 text-base mb-2 block" :href="`#${link.id}`">{{ link.text }}</a>
          </li>
        </ul>
      </nav>
      <VoltBatteryCounter class="hidden lg:flex mt-24 lg:mt-32"/>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['articleToc'],
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
    document.querySelectorAll('.nuxt-content h2[id]').forEach((section) => {
        this.observer.observe(section);
    });
    document.querySelectorAll('.nuxt-content h3[id]').forEach((section) => {
        this.observer.observe(section);
    });
  },
  beforeDestroy() {
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
  }
}
</script>