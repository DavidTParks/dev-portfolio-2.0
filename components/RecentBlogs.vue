<template>
  <div class="block">
    <article class="block mt-12 recent-blog" v-for="blog in blogs" :key="blog.title">
      <nuxt-link class="blog-link" :to="`/blog/${blog.slug}/`">
        <small class="dark:text-retroyellow text-darkblue uppercase tracking-widest text-sm font-h2">{{blog.category}}</small>
        <h3 class="dark:text-lightblue text-infoblue text-2xl font-h1 transition-colors duration-75 mt-3">{{blog.title}}</h3>
        <p class="dark:text-gray-600 text-black mb-3 mt-1 text-lg font-h2">{{ formatDate(blog.createdAt) }}</p>
        <p class="dark:text-lightblue text-black mt-3 text-lg font-body">{{blog.description}}</p>
        <div class="text-black dark:text-retroteal mt-4 font-h2 text-lg flex items-center read-more">
          <svg class="w-6 h-6 mr-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
          Read more
        </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  props: ['blogs'],
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  }
}
</script>

<style>
.dark-teal-glow {
  @apply teal-glow;
}
.light .blog-link:hover h3 {
  @apply text-infoblue;
}

.dark .blog-link .read-more {
  @apply teal-glow;
}

.dark .blog-link small {
  @apply yellow-glow;
}

.dark .blog-link:hover h3 {
  @apply text-white;
}

.dark .blog-link:hover small {
  filter: brightness(1.5);
}

.dark .blog-link:hover .read-more {
  filter: brightness(1.5);
}

.blog-link:hover .read-more svg {
  transition: transform 600ms ease-in-out;
  transform: rotate(360deg);
}

.dark .recent-blog h3 {
  @apply light-blue-glow;
}
</style>