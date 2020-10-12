<template>
  <div>
    <BlogSection>
        <MainBlogSection>
          <RecentBlogs :blogs="blogs"/>
        </MainBlogSection>
    </BlogSection>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
      const blogs = await $content('blogs')
        .limit(5)
        .only(['title', 'slug', 'subtitle', 'description', 'category', 'createdAt'])
        .where({ published: { $eq: true } })
        .sortBy('createdAt', 'desc')
        .fetch()

      return {
        blogs
      }
  }
}
</script>

<style>
</style>
