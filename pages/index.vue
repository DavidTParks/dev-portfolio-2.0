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
  async asyncData({ $content, params }) {
      const articles = await $content('articles')
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        articles
      }
  }
}
</script>

<style>
</style>
