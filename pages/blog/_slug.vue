<template>
  <div>
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3">
        <section class="col-span-1 lg:col-span-3">
          <article class="prose lg:prose-xl">
            <nuxt-content :document="article" />
          </article>
        </section>
        <!-- <section class="hidden sm:col-span-1 sm:flex sm:flex-col">
          <h2>Table of contents</h2>
          <nav>
            <ul>
              <li v-for="link of article.toc" :key="link.id">
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </section> -->
      </div>
    </BlogSection>
  </div>
</template>

<script>
import getShareImage from '@jlengstorf/get-share-image';


export default {
  layout: 'blog',
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    const socialImage = getShareImage({
      title: 'Deploy a Node.js App to DigitalOcean with SSL',
      tagline: '#devops #nodejs #ssl',
      cloudName: 'dzxp4ujfz',
      imagePublicID: 'template_k1c9zk.png',
      font: 'futura',
      textColor: '232129',
    });

    console.log(socialImage)
    return { article }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>

<style>
.nuxt-content h1 {
  @apply pink-glow font-h1;
}

.nuxt-content h2 {
  @apply teal-glow font-h2;
}

.nuxt-content h3 {
  @apply yellow-glow font-h2;
}

.nuxt-content a {
  transition: all 0.1s;
  @apply green-glow;
}

.nuxt-content a:hover {
  @apply yellow-glow;
}

</style>