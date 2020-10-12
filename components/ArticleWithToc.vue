<template>
  <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 article-toc">
    <section ref="blogContent" class="block col-span-1 lg:col-span-2 mt-0 md:mt-16">
      <article class="prose lg:prose-xl">
        <nuxt-content :document="article" />
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
}
</script>

<style>
.article-toc {
  scroll-behavior: smooth;
}
</style>