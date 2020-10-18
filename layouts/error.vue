<template>
<div class="min-h-screen">
    <AboutMeHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <div class="mx-auto w-full flex justify-center flex-col dark:text-white text-4xl text-center">
        <h1 class="" v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <NuxtLink to="/">Home page</NuxtLink>
      </div>
    </BlogSection>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog', // you can set a custom layout for the error page
  data() {
    return {
      article: {
        title: '404',
        subtite: 'Who the hell am I?'
      },
    }
  },
}
</script>