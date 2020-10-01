<template>
  <div class="block">
    <article class="block mt-16" v-for="article in articles" :key="article.title">
      <nuxt-link class="blog-link" :to="`/articles/${article.slug}`">
        <small class="text-retroyellow uppercase tracking-widest text-sm font-h2">{{article.category}}</small>
        <h3 class="dark:text-lightblue text-infoblue text-2xl font-h1 transition-colors duration-75 mt-3">{{article.title}}</h3>
        <p class="dark:text-gray-600 text-black mb-3 mt-1 text-lg font-h2">{{article.subtitle}}</p>
        <p class="dark:text-lightblue text-black mt-3 text-lg font-body">{{article.description}}</p>
        <div class="text-black dark:text-retroteal dark:dark-teal-glow mt-4 font-h2 text-lg flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>Read more
          
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
.light .blog-link:hover h3 {
  @apply text-infoblue;
}

.dark .blog-link:hover h3 {
  @apply text-retropink;
}
</style>