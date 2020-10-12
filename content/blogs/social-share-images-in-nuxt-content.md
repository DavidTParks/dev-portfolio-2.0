---
title: Social Share Images in Nuxt Content
subtitle: Beautiful social sharing cards for your Nuxt Content blogs
description: Learn how to create beautiful social share images at build time for your Nuxt Content blog
category: Nuxt
---

## Intro

When sharing blog content or articles on social media **it's important to stand out**. In a sea of Twitter posts users might simply scroll by something you've worked hard on if it isn't eye catching enough!

In this post, we'll teach you how to generate beautiful sharing cards for your Nuxt Content blog posts! This post will use concepts laid out in [Jason Lengstorfs amazing article](https://www.learnwithjason.dev/blog/auto-generate-social-image/) where he details how to generate images for posts using Cloundinary's API and a custom template, however we'll be more focused on getting this going with Nuxt Content! 

I would recommend going and reading his post before continuing, as you will need to setup your own template from within Cloundinary, as well as upload any custom fonts you want to use for your template. 

## Setup

This post won't go into too much detail about setting up a Nuxt Content blog from scratch, but it goes without saying make sure you have the `@nuxt/content` package installed and added to your `nuxt.config.js` modules like so:

```
modules: [
  '@nuxt/content',
],
```

In order to begin generating dynamic social media cards, we will also need to install Jason Lengstorf's package `@jlengstorf/get-share-image`.

```
# install using npm 
npm install --save @jlengstorf/get-share-image
 
# install using yarn 
yarn add @jlengstorf/get-share-image
```

Once you've gotten everything installed and your template uploaded to Cloudinary, it's time to begin generating your images! 

## Fetching Blog Content 


From within a dynamic page component (my blog pages are in /blog/_slug.vue) we'll need to use the `asyncData` Nuxt hook due to the fact that this is called before the `head` method where we'll need to set our Open Graph and Twitter metadata for the post. 


```vue
<script>
import getShareImage from '@jlengstorf/get-share-image';
import getSiteMeta from "~/utils/getSiteMeta.js";

const meta = getSiteMeta();

export default {
  async asyncData({ $content, params }) {
    const article = await $content('blogs', params.slug).fetch()

    const socialImage = getShareImage({
        title: article.title,
        tagline:  article.subtitle,
        cloudName: 'dzxp4ujfz',
        imagePublicID: 'template_oxlcmb.png',
        titleFont: 'unienueueitalic.otf',
        titleExtraConfig: '_line_spacing_-10',
        taglineFont: 'unienueueitalic.otf',
        titleFontSize: '72',
        taglineFontSize: '48',
        titleColor: 'fff',
        taglineColor: '6CE3D4',
        textLeftOffset: '100',
        titleBottomOffset: '350',
        taglineTopOffset: '380'
      });
    }

    return { article, socialImage }
  },
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: this.article.title,
        description: this.article.description,
        url: `https://davidparks.dev/articles/${this.$route.params.slug}`,
        mainImage: this.socialImage,
      };
      return getSiteMeta(metaData);
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: "article:published_time",
          content: this.article.createdAt,
        },
        {
          property: "article:modified_time",
          content: this.article.updatedAt,
        },
        {
          property: "article:tag",
          content: this.article.tags ? this.article.tags.toString() : "",
        },
        { name: "twitter:label1", content: "Written by" },
        { name: "twitter:data1", content: "David Parks" },
        { name: "twitter:label2", content: "Filed under" },
        {
          name: "twitter:data2",
          content: this.article.tags ? this.article.tags.toString() : "",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://davidparks.dev/blog/${this.$route.params.slug}`,
        },
      ],
    };
  }
}
</script>
```
