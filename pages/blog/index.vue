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
import getSiteMeta from "~/utils/getSiteMeta.js";
export default {
  layout: 'blog',
  data() {
    return {
      article: {
        title: 'Blog',
        subtite: ''
      }
    }
  },
  async asyncData({ $content, params }) {
    const blogs = await $content('blogs')
      .only(['title', 'slug', 'subtitle', 'description', 'category', 'createdAt'])
      .where({ published: { $eq: true } })
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      blogs
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: 'Blog - David Parks',
        description: this.article.description,
        url: `https://davidparks.dev/blog/`,
      };
      return getSiteMeta(metaData);
    }
  },
  head() {
    return {
      title: 'Blog - David Parks',
      meta: [
        ...this.meta,
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://davidparks.dev/blog/`,
        },
      ],
    };
  }
}
</script>