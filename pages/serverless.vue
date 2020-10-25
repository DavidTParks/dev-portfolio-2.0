<template>
  <div>
    <AboutMeHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <RecentBlogs :blogs="blogs"></RecentBlogs>
    </BlogSection>
  </div>
</template>

<script>
import getShareImage from '@jlengstorf/get-share-image';
import getSiteMeta from "~/utils/getSiteMeta.js";

export default {
  layout: 'blog',
  async asyncData({ $content, params }) {
    const blogs = await $content('blogs')
      .only(['title', 'slug', 'subtitle', 'description', 'category', 'createdAt'])
      .where({ category: { $eq: 'Serverless' } })
      .sortBy('createdAt', 'desc')
      .fetch()

      const article = {
        title: 'Serverless',
        subtitle: 'Serverless Articles'
      }

    return {
      blogs,
      article
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: 'Serverless Articles - David Parks',
        description: this.article.description,
        url: `https://davidparks.dev/serverless`,
      };
      return getSiteMeta(metaData);
    }
  },
  head() {
    return {
      title: 'Serverless Articles - David Parks',
      meta: [
        ...this.meta,
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://davidparks.dev/serverless`,
        },
      ],
    };
  }
}
</script>

<style>
</style>
