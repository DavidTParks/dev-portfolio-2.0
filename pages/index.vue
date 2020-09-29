<template>
  <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <BlogSection>
        <MainBlogSection>
          <RecentBlogs :articles="articles"/>
        </MainBlogSection>
    </BlogSection>
  </div>
</template>

<script>
export default {
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
