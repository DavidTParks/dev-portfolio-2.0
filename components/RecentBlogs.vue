<template>
  <div class="block">
    <article class="block mt-12" v-for="article in articles" :key="article.title">
      <nuxt-link :to="`/articles/${article.slug}`">
        <h3 class="dark:text-retroyellow text-infoblue text-3xl font-h2 dark:yellow-glow tracking-wide">{{article.title}}</h3>
        <p class="dark:text-gray-600 text-black mb-3 mt-1 text-lg font-h2">{{article.subtitle}}</p>
        <p class="dark:text-lightblue text-black mt-3 text-lg font-body">{{article.description}}</p>
        <div class="text-black dark:text-retroteal dark:dark-teal-glow mt-4 font-h2 text-lg">
          Read more
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  props: ['articles']
}
</script>

<style>
.dark-teal-glow {
  @apply teal-glow;
}
</style>