<template>
  <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 article-toc">
    <section ref="blogContent" class="block col-span-1 lg:col-span-2 mt-0">
      <article class="prose lg:prose-xl">
        <nuxt-content :document="article" />
        <twitter-cta :share-link="twitterShareLink"></twitter-cta>
        <div class="flex justify-between">
          <div class="flex flex-col dark:text-gray-300 text-gray-900">
            <p class="text-lg mb-0 uppercase">Last updated</p>
            <span class="text-gray-600">{{ formatDate(article.updatedAt) }}</span>
          </div>
          <HitCounter/>
        </div>
        <PrevNext :prev="prev" :next="next" />
      </article>
    </section>
    <TableOfContents :article-toc="article.toc"/>
  </div>
</template>

<script>
export default {
  props: ['article', 'next', 'prev'],
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
  computed: {
    twitterShareLink() {
      return `https://twitter.com/intent/tweet?text=${this.article.title}&url=https://davidparks.dev/blog/${this.article.slug}/&via=dparksdev`
    }
  },
}
</script>

<style>
.article-toc {
  scroll-behavior: smooth;
}
</style>