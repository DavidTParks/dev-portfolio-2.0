<template>
  <div class="pt-16">
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 overflow-visible">
        <section class="col-span-1 lg:col-span-2">
          <article class="prose lg:prose-xl">
            <!-- <p class="text-lg text-gray-500 mb-3">Article last updated: {{ formatDate(article.updatedAt) }}</p> -->
            <nuxt-content :document="article" />
          </article>
        </section>
        <section class="hidden sm:col-span-1 sm:flex sm:flex-col">
          <div class="sticky top-16">
            <h2 class="dark:text-white uppercase text-black font-h2 text-lg mt-16 tracking-wider">Table of contents</h2>
            <nav class="mt-4">
              <ul>
                <li :class="{ 'toc2': link.depth === 2, 'pl-4': link.depth === 3 }" class="toc-list" v-for="link of article.toc" :key="link.id">
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
  mounted() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');

            if (entry.isIntersecting) {
                document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
              document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('h2[id]').forEach((section) => {
        observer.observe(section);
    });
    document.querySelectorAll('h3[id]').forEach((section) => {
        observer.observe(section);
    });
  },
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const socialImage = getShareImage({
      title: article.title,
      tagline:  article.subtitle,
      cloudName: 'dzxp4ujfz',
      imagePublicID: 'template_oxlcmb.png',
      titleFont: 'unienueueitalic.otf',
      titleExtraConfig: '_line_spacing_-10',
      taglineFont: 'unienueueitalic.otf',
      titleFontSize: '88',
      taglineFontSize: '48',
      titleColor: 'fff',
      taglineColor: '6CE3D4',
      textLeftOffset: '100',
      titleBottomOffset: '350',
      taglineTopOffset: '360'
    });

    console.log(socialImage)


    return { article, socialImage }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
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
  padding-top: 90px; margin-top: -90px;
}

.dark .nuxt-content h3 {
  @apply yellow-glow font-h2;
  padding-top: 90px; margin-top: -90px;
}

.light .nuxt-content {
  @apply text-black;
}

.light .nuxt-content h2 {
  @apply text-darkpurple font-h2;
  padding-top: 90px; margin-top: -90px;
}

.light .nuxt-content h3 {
  @apply font-h2 text-infoblue;
  padding-top: 90px; margin-top: -90px;
}

.nuxt-content a {
  transition: all 0.1s;
  @apply green-glow;
}

.nuxt-content a:hover {
  @apply yellow-glow;
}

.dark .toc-list.active a {
  @apply text-retroteal;
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

</style>