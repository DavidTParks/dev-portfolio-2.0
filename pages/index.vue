<template>
  <div>
    <BlogSection>
        <MainBlogSection>
          <!-- <BlogNewsletter :blogs="blogs"/> -->
          <RecentBlogs :blogs="blogs"/>
          <div class="mt-4" slot="categories">
            <nuxt-link to="/nuxt" class="px-3 py-1 rounded-lg bg-darkteal text-retrogreen border border-retrogreen green-glow font-h2 hover:filter-brightness">Nuxt</nuxt-link>
          </div>
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
        blogs,
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
