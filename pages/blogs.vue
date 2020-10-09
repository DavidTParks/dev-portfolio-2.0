<template>
<div>
  <BlogSection>
    <RecentBlogs :blogs="blogs"></RecentBlogs>
  </BlogSection>
</div>
</template>

<script>
export default {
  layout: 'blog',
  async asyncData({ $content, params }) {
    const blogs = await $content('blogs')
      .only(['title', 'slug', 'subtitle', 'description', 'category', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      blogs
    }
  },
}
</script>