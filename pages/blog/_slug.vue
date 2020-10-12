<template>
  <div>
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <ArticleWithToc :article="article" :next="next" :prev="prev"/>
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
    let root = document.documentElement;
    root.style.setProperty('--scroll-behavior', 'smooth');
  },
  destroyed() {
    let root = document.documentElement;
    root.style.setProperty('--scroll-behavior', 'initial');
  },
  async asyncData({ $content, params , $config: { faunaSecretKey }}) {
    const article = await $content('blogs', params.slug).fetch()

    const [prev, next] = await $content('blogs')
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
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: this.article.title,
        description: this.article.description,
        url: `https://davidparks.dev/blog/${this.$route.params.slug}`,
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
          href: `https://davidparks.dev/blog/${this.$route.params.slug}`,
        },
      ],
    };
  }
}
</script>

<style>
</style>
