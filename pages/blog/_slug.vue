<template>
  <div>
    <BlogHero :article="article"/>
    <PageBreak/>
    <BlogSection>
      <article class="prose lg:prose-xl">
        <nuxt-content :document="article" />
        <p>Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus enim</strong>. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.</p>
      <ul>
        <li>Quis elit egestas venenatis mattis dignissim.</li>
        <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
        <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
      </ul>
      <p>Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.</p>
      <h2>From beginner to expert in 30 days</h2>
      <p>Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.</p>
      <blockquote>
        <p>Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.</p>
      </blockquote>
      <p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.</p>
      <figure>
        <img class="w-full rounded-lg" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3" alt="" width="1310" height="873">
        <figcaption>Sagittis scelerisque nulla cursus in enim consectetur quam.</figcaption>
      </figure>
      </article>
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
.nuxt-content h2 {
  @apply teal-glow font-h2;
}

.nuxt-content h1 {
  @apply pink-glow font-h1;
}

.nuxt-content a {
  @apply yellow-glow;
}
</style>