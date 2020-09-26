<template>
  <div class="block">
    <article class="block mt-12" v-for="article in articles" :key="article.title">
      <nuxt-link :to="`/articles/${article.slug}`">
        <h3 class="text-retroyellow text-2xl font-h2 yellow-glow">{{article.title}}</h3>
        <p class="text-gray-600 mb-3 mt-1 text-lg font-h2">{{article.subtitle}}</p>
        <p class="text-lightblue mt-3 text-base font-body">{{article.description}}</p>
        <div class="text-retroteal teal-glow mt-4 font-h2 text-lg">
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