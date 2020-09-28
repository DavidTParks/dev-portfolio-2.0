<template>
  <div class="pt-16">
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 overflow-visible">
        <section class="col-span-1 lg:col-span-2">
          <article class="prose lg:prose-xl">
            <nuxt-content :document="article" />
          </article>
        </section>
        <section class="hidden sm:col-span-1 sm:flex sm:flex-col pt-16">
          <div class="sticky top-16 pt-12">
            <h2 class="text-infoblue font-h2 text-3xl">Table of contents</h2>
            <nav class="mt-4">
              <ul>
                <li v-for="link of article.toc" :key="link.id">
                  <NuxtLink class="text-lightblue text-xl mb-2 block" :to="`#${link.id}`">{{ link.text }}</NuxtLink>
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
      titleFontSize: '80',
      taglineFontSize: '48',
      titleColor: 'fff',
      taglineColor: '6CE3D4',
      textLeftOffset: '100',
      titleBottomOffset: '380',
      taglineTopOffset: '350'
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

.nuxt-content h2 {
  @apply teal-glow font-h2;
  padding-top: 70px; margin-top: -70px;
}

.nuxt-content h3 {
  @apply yellow-glow font-h2;
}

.nuxt-content a {
  transition: all 0.1s;
  @apply green-glow;
}

.nuxt-content a:hover {
  @apply yellow-glow;
}

</style>