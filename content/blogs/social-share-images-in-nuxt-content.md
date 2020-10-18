---
title: Social Share Images in Nuxt Content
subtitle: Beautiful social sharing cards for your Nuxt Content blogs
description: Have you ever wondered how tech bloggers on social media make those beautiful social media cards for their blog posts? This post will teach you how, with Nuxt Content!
category: Nuxt
published: true
---

## Intro

When sharing blog content or articles on social media ***it's important to stand out.*** In a sea of Twitter posts users might simply scroll by an article you've worked hard on if the blog preview isn't eye catching enough!

In this post, we'll teach you how to generate beautiful sharing cards for your Nuxt Content blog posts! This post will use concepts laid out in <a target="_blank" rel="noopener" href="https://www.learnwithjason.dev/blog/auto-generate-social-image">Jason Lengstorfs amazing article</a> where he details how to generate images for posts using Cloundinary's API and a custom template, however we'll be more focused on getting this going with Nuxt Content! 

<info-box :variant="'help'">
I would recommend going and reading his post before continuing, as you will need to setup your own template from within Cloundinary, as well as upload any custom fonts you want to use for your template. 
</info-box>

<div class="mt-16 flex"></div>

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

<div class="mt-16 flex"></div>

## Fetch Blog & Generate Image


From within a dynamic page component (my blog pages are in /blog/_slug.vue) we'll need to use the `asyncData` Nuxt hook due to the fact that this is called before the `head` method where we'll need to set our Open Graph and Twitter metadata for the post. 

We're going to start by importing `getShareImage` from `'@jlengstorf/get-share-image'` and then calling this function from within `asyncData` after fetching the article for our specific page. 


```vue
<script>
import getShareImage from '@jlengstorf/get-share-image';

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

    return { article, socialImage }
  }
}
</script>
```

The `getShareImage` function will generate an image URL via Cloudinary using the specified text, transformations, colors and fonts. For example, my URL for this post is 
```
https://res.cloudinary.com/dzxp4ujfz/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:fff,g_south_west,x_100,y_350,l_text:unienueueitalic.otf_72_line_spacing_-10:Dynamic%20Social%20Media%20Preview%20Cards%20in%20Nuxt%20Content/w_760,c_fit,co_rgb:6CE3D4,g_north_west,x_100,y_380,l_text:unienueueitalic.otf_48:Beautiful%20social%20sharing%20cards%20for%20your%20Nuxt%20Content%20blogs/template_oxlcmb.png
```

Since I've created my own template, and included my own font, my settings may be different than yours when setting the `textLeftOffset` or any other offsets for example. A full list of properties you can set are available on the [Github page for the package](https://github.com/jlengstorf/get-share-image#readme). 

Feel free to check out Jason Lengstorf's Figma template available [here](https://res.cloudinary.com/jlengstorf/raw/upload/v1578342420/social-sharing-cards/learnwithjason-social-card-template.fig) and customize it your liking. 

<dino-article></dino-article>

<div class="mt-8 flex"></div>

### Setting meta tags

Great, we are generating our image via dynamic Nuxt Content article attributes! 

<info-box :variant="'question'">
Now how do we inject these variables into our blog pages `head` so that social media users will see our image and metadata?
</info-box>

To do this, we'll leverage Nuxt.js' built in [head](https://nuxtjs.org/api/pages-head/) method that allows us to set Open Graph and Twitter meta tags. We'll also include some useful information like the time the article was published, and the last time it was modified using the `createdAt` and `updatedAt` properties that Nuxt Content automatically injects for us.

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

<dino-article-two></dino-article-two>

You have noticed above that I am importing `getSiteMeta` from `"~/utils/getSiteMeta.js"`. This is a utility function that I use to overwrite default meta tags. We will use a computed property to override some default metadata values I've setup in this file if they are explicitly provided. This ensures we are injecting the proper variables from our Nuxt Content Markdown file into our head. That file looks like this:

```javascript
const type = "website";
const url = "https://davidparks.dev";
const title = "David Parks";
const description = "David Parks is a Front-end Developer from Milwaukee, Wisconsin. This blog will focus on Nuxt.js, Vue.js, CSS, Animation and more!";
const mainImage = "https://davidparksdev.s3.us-east-2.amazonaws.com/template.png";
const twitterSite = "@dparksdev";
const twitterCard = "summary_large_image"
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
    { 
      hid: "twitter:site",
      name: "twitter:site", 
      content: (meta && meta.twitterSite) || twitterSite,
    },
    { 
      hid: "twitter:card",
      name: "twitter:card", 
      content: (meta && meta.twitterCard) || twitterCard,
    }
  ];
};
```

Unless there are overrides explicitly provided, it will use the fallback values I've defined at the top of this file. This is great if you want to avoid those cases where you forget to set meta tags!

The computed property `meta` is then being merged into the `head` method via a spread operator `...this.meta,`. This will ensure that any default values are overridden and your article title, description and images are properly injected inside of your documents head. 

<div class="mt-16 flex"></div>

## Testing with Facebook & Twitter Tools

If all goes well, you should now see these meta tags in your DOM! 

The next time your site deploys, you should now see an awesome looking share image when sharing your blog to Twitter, Facebook, Linkedin or anywhere else! Using tools like Twitter's [Card Debugger](https://cards-dev.twitter.com/validator) and [Facebook's Open Graph Debugger](https://developers.facebook.com/tools/debug/) will be ***essential*** to tweaking them to your liking and debugging any potentially missing tags.

<div class="mt-16 flex"></div>

## Wrapping Up

What's great about this approach is that if you decide at some point in the future to update or change your template for your blogs, it will update the preview image for all of them. It also saves you the time and headaches of creating unique preview images for each individual blog in Figma or a design tool of your choosing. Just set it, and forget it!

If you've made it this far, good job. I look forward to seeing some awesome Nuxt Content blogs with beautiful sharing cards on my feeds in the near future. Thanks for reading!


<twitter-cta :share-link="'https://twitter.com/intent/tweet?text=Social Share Images in Nuxt Content&url=https://davidparks.dev/blog/social-share-images-in-nuxt-content/&via=dparksdev'"></twitter-cta>
