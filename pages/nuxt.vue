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
      .where({ category: { $eq: 'Nuxt' } })
      .sortBy('createdAt', 'desc')
      .fetch()

      const article = {
        title: 'Nuxt',
        subtitle: 'Nuxt Articles'
      }

    return {
      blogs,
      article
    }
  },
}
</script>

<style>
</style>
