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

```javascript
modules: [
  '@nuxt/content',
],
```

In order to begin generating dynamic social media cards, we will also need to install Jason Lengstorf's package `@jlengstorf/get-share-image`.

```vue
# install using npm 
npm install --save @jlengstorf/get-share-image
 
# install using yarn 
yarn add @jlengstorf/get-share-image
```

Once you've gotten everything installed and your template uploaded to Cloudinary, it's time to begin generating your images! 

## Fetching Blog Content 


From within a dynamic page component (my blog pages are in /blog/_slug.vue) we'll need to use the `asyncData` Nuxt hook due to the fact that this is called before the `head` method where we'll need to set our Open Graph and Twitter metadata for the post. 

We're going to start by importing `getShareImage` from `'@jlengstorf/get-share-image'` and then calling this function from within `asyncData` after fetching the article for our specific page. 


```vue
<script>
import getShareImage from '@jlengstorf/get-share-image';
import getSiteMeta from "~/utils/getSiteMeta.js";

export default {
  async asyncData({ $content, params }) {
    const article = await $content('blogs', params.slug).fetch()

    const socialImage = getShareImage({
        title: article.title,
        tagline:  article.subtitle,
        cloudName: 'YOUR_CLOUDINARY_NAME',
        imagePublicID: 'YOUR_TEMPLATE_NAME.png',
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
        url: `https://davidparks.dev/blog/${this.$route.params.slug}`,
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

Since I've created my own template, and included my own font, my settings may be different than yours when setting the `textLeftOffset` or any other offsets for example. Feel free to check out my Figma template below in which I used Jason Lengstorf's Figma template available [here](https://res.cloudinary.com/jlengstorf/raw/upload/v1578342420/social-sharing-cards/learnwithjason-social-card-template.fig)

<iframe class="cvis" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="600" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FBnJYNbBlBfQAn9YcHm1ZDh%2FDesign-System%3Fnode-id%3D83%253A5&chrome=DOCUMENTATION" allowfullscreen></iframe>

You may also notice that I am importing `getSiteMeta` from `getSiteMeta.js`. This function will use a computed property to override some default metadata values I've setup in this file if they are explicitly provided. That file looks like this:

```javascript
const type = "website";
const url = "https://davidparks.dev";
const title = "David Parks";
const description =
  "Articles focused on Frontend development. Focused in Vue.js, Nuxt.js, CSS and Animation!";
const mainImage = "https://davidparksdev.s3.us-east-2.amazonaws.com/template.png";

export default (meta) => {
  return [
    {
      hid: "description",
      name: "description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: (meta && meta.type) || type,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: (meta && meta.url) || url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: (meta && meta.mainImage) || mainImage,
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: (meta && meta.url) || url,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: (meta && meta.mainImage) || mainImage,
    },
  ];
};
```

<twitter-cta></twitter-cta>

Unless there are overrides explicitly provided, it will use the fallback values I've defined at the top of this file. This is great if you want to avoid those cases where you forget to set meta tags!

The computed property `meta` is then being merged into the `head` method via a spread operator `...this.meta,`. This will ensure that any default values are overridden and your article title, description and images are properly put inside of your documents head. 

## Wrapping Up

If all goes well, you should now see these meta tags in your developer tools! The next time your site deploys, you should now see an awesome looking share image when sharing your blog to Twitter, Facebook, Linkedin or anywhere else! If you've made it this far, good job. I look forward to seeing some awesome Nuxt Content blogs with beautiful sharing cards on my feeds in the near future. 

