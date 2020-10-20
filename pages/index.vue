<template>
  <div>
    <BlogSection>
        <MainBlogSection>
          <!-- <BlogNewsletter :blogs="blogs"/> -->
          <RecentBlogs :blogs="blogs"/>
          <!-- <div slot="categories">
            <h2 class="text-white font-3xl">Heyooo</h2>
          </div> -->
        </MainBlogSection>
    </BlogSection>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('initializeSound');
  },
  async asyncData({ $content, params }) {
      const blogs = await $content('blogs')
        .limit(5)
        .only(['title', 'slug', 'subtitle', 'description', 'category', 'createdAt'])
        .where({ published: { $eq: true }})
        .sortBy('createdAt', 'desc')
        .fetch()

      return {
        blogs
      }
  },
  computed: {
    isSoundEnabled() {
      this.$store.isSoundEnabled;
    }
  }
}
</script>

<style>
</style>
