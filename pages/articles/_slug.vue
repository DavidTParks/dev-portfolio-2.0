<template>
  <div class="pt-16">
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <div class="grid gap-24 grid-cols-1 lg:grid-cols-3 overflow-visible">
        <section class="col-span-1 lg:col-span-2">
          <article class="prose lg:prose-xl">
            <nuxt-content :document="article" />
          </article>
        </section>
        <section class="hidden sm:col-span-1 sm:flex sm:flex-col pt-16">
          <div class="sticky top-16 pt-12">
            <h2 class="text-infoblue font-h2 text-3xl">Table of contents</h2>
            <nav class="mt-4">
              <ul>
                <li v-for="link of article.toc" :key="link.id">
                  <NuxtLink class="text-lightblue text-xl mb-2 block" :to="`#${link.id}`">{{ link.text }}</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </section>
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
      title: article.title,
      tagline:  article.subtitle,
      cloudName: 'dzxp4ujfz',
      imagePublicID: 'template_oxlcmb.png',
      titleFont: 'unienueueitalic.otf',
      titleExtraConfig: '_line_spacing_-10',
      taglineFont: 'unienueueitalic.otf',
      titleFontSize: '72',
      taglineFontSize: '40',
      titleColor: 'fff',
      taglineColor: '6CE3D4',
      textLeftOffset: '100',
      titleBottomOffset: '355',
      taglineTopOffset: '375'
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
  padding-top: 70px; margin-top: -70px;
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