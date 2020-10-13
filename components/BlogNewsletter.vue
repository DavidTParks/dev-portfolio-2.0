<template>
<div class="">
  <div class="">
    <div>
      <h2 class="text-3xl leading-9 font-h1 tracking-tight font-extrabold text-lightblue sm:text-4xl sm:leading-10">
        Recent Blogs
      </h2>
      <div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
        <p class="text-xl leading-7 text-gray-500">
          Get weekly articles in your inbox on how to grow your business.
        </p>
        <form class="mt-6 flex lg:mt-0 lg:justify-end">
          <input aria-label="Email address" type="email" required class="appearance-none w-full px-4 py-2 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out lg:max-w-xs" placeholder="Enter your email">
          <span class="ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
            <PrimaryButton>
              Notify me
            </PrimaryButton>
          </span>
        </form>
      </div>
    </div>
    <div class="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          <article class="block mt-12 recent-blog" v-for="blog in blogs" :key="blog.title">
      <nuxt-link class="blog-link" :to="`/blog/${blog.slug}`">
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
  </div>
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