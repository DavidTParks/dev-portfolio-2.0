<template>
  <div>
    {{url}}
    <BlogSection>
        <MainBlogSection>
          <RecentBlogs :articles="articles"/>
        </MainBlogSection>
    </BlogSection>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  scrollToTop: false,
  async asyncData({ $content, params }) {
      const articles = await $content('articles')
        .limit(5)
        .only(['title', 'slug', 'subtitle', 'description', 'category'])
        .sortBy('createdAt', 'desc')
        .fetch()

      return {
        articles
      }
  }
}
</script>

<style>
</style>
