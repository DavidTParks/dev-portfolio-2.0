<template>
  <div>
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3">
        <section ref="blogContent" class="block col-span-1 lg:col-span-2 mt-0 md:mt-16">
          <article class="prose lg:prose-xl">
            <nuxt-content :document="article" />
            <p class="text-lg text-gray-500 mb-3">Article last updated: {{ formatDate(article.updatedAt) }}</p>
            <PrevNext :prev="prev" :next="next" />
          </article>
        </section>
        <section class="hidden sm:col-span-1 sm:flex sm:flex-col">
          <div class="sticky top-16">
            <h2 class="dark:text-white uppercase text-black font-h2 text-lg mt-16 tracking-wider">Table of contents</h2>
            <nav class="mt-4">
              <ul>
                <li @click="tableOfContentsHeadingClick(link)" :class="{ 'toc2': link.depth === 2, 'pl-4': link.depth === 3, 'active': link.id === currentlyActiveToc }" class="toc-list" v-for="link of article.toc" :key="link.id">
                  <a class="dark:text-lightblue text-black hover:text-gray-800 dark:hover:text-white transition-colors duration-75 text-base mb-2 block" :href="`#${link.id}`">{{ link.text }}</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </BlogSection>
  </div>
</template>

<script>
import getShareImage from '@jlengstorf/get-share-image';
import getSiteMeta from "~/utils/getSiteMeta.js";

const meta = getSiteMeta();

export default {
  layout: 'blog',
  scrollToTop: true,
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
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    
    let socialImage = {};

    if(process.env.NODE_ENV === 'production') {
      socialImage = getShareImage({
        title: article.title,
        tagline:  article.subtitle,
        cloudName: 'dzxp4ujfz',
        imagePublicID: 'template_oxlcmb.png',
        titleFont: 'unienueueitalic.otf',
        titleExtraConfig: '_line_spacing_-10',
        taglineFont: 'unienueueitalic.otf',
        titleFontSize: '72',
        taglineFontSize: '48',
        titleColor: 'fff',
        taglineColor: '6CE3D4',
        textLeftOffset: '100',
        titleBottomOffset: '350',
        taglineTopOffset: '380'
      });
    }

    return { article, socialImage, prev, next }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    tableOfContentsHeadingClick(link) {
      this.isClickScrolling = true;
      this.currentlyActiveToc = link.id;

      setTimeout(() => {
        this.isClickScrolling = false;
      }, 1000);

    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: this.article.title,
        description: this.article.description,
        url: `https://davidparks.dev/articles/${this.$route.params.slug}`,
        mainImage: this.socialImage,
      };
      return getSiteMeta(metaData);
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: "article:published_time",
          content: this.article.createdAt,
        },
        {
          property: "article:modified_time",
          content: this.article.updatedAt,
        },
        {
          property: "article:tag",
          content: this.article.tags ? this.article.tags.toString() : "",
        },
        { name: "twitter:label1", content: "Written by" },
        { name: "twitter:data1", content: "David Parks" },
        { name: "twitter:label2", content: "Filed under" },
        {
          name: "twitter:data2",
          content: this.article.tags ? this.article.tags.toString() : "",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://davidparks.dev/articles/${this.$route.params.slug}`,
        },
      ],
    };
  }
}
</script>

<style>
.nuxt-content h1 {
  @apply pink-glow font-h1;
}

.dark .nuxt-content h2 {
  @apply teal-glow text-retroteal font-h2;
  padding-top: 60px; margin-top: -60px;
}

.dark .nuxt-content h3 {
  @apply yellow-glow font-h2;
  padding-top: 60px; margin-top: -60px;
}

.light .nuxt-content {
  @apply text-black;
}

.light .nuxt-content h2 {
  @apply text-infoblue font-h2;
  padding-top: 60px; margin-top: -60px;
}

.light .nuxt-content h3 {
  @apply font-h2 text-darkpurple;
  padding-top: 60px; margin-top: -60px;
}

.nuxt-content a {
  transition: all 0.1s;
  @apply green-glow;
}

.nuxt-content a:hover {
  @apply yellow-glow;
}

.dark .toc-list.active a {
  @apply text-retroteal teal-glow;
}

.light .toc-list.active a {
  @apply text-infoblue;
}

.light .prose ul > li::before {
  background-color: black;
}

.light .prose blockquote {
  border-left-color: black;
}

.light .prose blockquote {
  @apply text-darkblue;
}

.nuxt-content-editor {
  color: black !important;
}

.prose code::before {
  content: none !important;
}

.prose code::after {
  content: none !important;
}
</style>