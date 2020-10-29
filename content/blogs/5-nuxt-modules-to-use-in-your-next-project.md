---
title: 5 Nuxt Modules to Use in Your Nuxt Project
subtitle: Powerful Nuxt modules you can use to enhance your site
description: One of the best parts of Nuxt is its robust Module library. Modules allow you to extend Nuxt's core functionality and handle some powerful integrations. Here are five that I use in almost every project! 
category: Nuxt
published: true
createdAt: '2020-10-29T23:22:29.628Z'
---

## Intro

The Nuxt team and community has recently released an expansive [Nuxt Module Explorer](https://modules.nuxtjs.org/) which allows you to filer Nuxt modules by popularity, type, and Github stars.

Until I saw this explorer, I had no idea how robust the Nuxt Module ecosystem had become. I was able to find some really useful modules that I've used on this project and others.

The list can be pretty daunting (in an awesome way), so I figured I would boil it down to five that have helped me immensely. By no means are these the ***only*** ones I'd recommend, just five that I think are great!

<info-box :variant="'info'">
  <span><strong>TL:DR: </strong>Just show me the modules!</span>
  <ol>
    <li><external-link :link="'https://content.nuxtjs.org/'">nuxt/content</external-link></li>
    <li><external-link :link="'https://tailwindcss.nuxtjs.org/'">nuxt/tailwind</external-link></li>
    <li><external-link :link="'https://color-mode.nuxtjs.org/'">nuxt/color-mode</external-link></li>
    <li><external-link :link="'https://cloudinary.nuxtjs.org/'">nuxt/cloudinary</external-link></li>
    <li><external-link :link="'https://www.npmjs.com/package/@nuxtjs/feed/'">nuxt/feed</external-link></li>
  </ol>
</info-box>

## [1. Nuxt/Content](https://content.nuxtjs.org/)

When building this site, I knew I needed to find a headless CMS to manage my content. I wanted to author my content in Markdown, interpolate Vue components, and be able to commit it to version control. Nuxt content has ***all of this***, and more!

Some of the nicest features I've found are:

- The ability to inject any variables into the article using a YAML front matter
- The automatic injection `createdAt`, `updatedAt`, and `toc` (table of contents) variables to use
- "Double click" to edit directly on the page, and see changes reflected immediately
- Ability to interpolate Vue components directly into your markdown

There's much more to this module, but I can't recommend it enough!

## [2. Nuxt/Tailwind](https://tailwindcss.nuxtjs.org/)

If you are involved in Front-end web development, you've probably heard of [TailwindCSS](https://tailwindcss.com/). If you aren't familiar, it's a "utility-first" CSS framework with endless amounts of customization and thoughtful defaults.  If you're like me, you know that once you've tried it you can't go back.

This module makes it extremely easy to get Tailwind up and running with your Nuxt project, and allows you to reference the Tailwind config directly in your app. It also plays very nicely with **Dark Mode** and our next module in the list...

## [3. Nuxt/Color-Mode](https://color-mode.nuxtjs.org/)

This module makes it incredibly easy to detect the users preferred color scheme when they first visit, or toggle and save their choice for subsequent page visits. It also plays very nicely with **Nuxt/Tailwind**. 

You can read `$colorMode.preference` directly in your templates or components, and render different content based on their current preference, and changing their color-mode preference is as easy as calling a `toggle` function like this:

```vue
<template>
  <button @click="toggleColorMode">Toggle Color Mode</button>
</template>

<script>
export default {
  methods: {
    toggleColorMode() {
      this.$colorMode.preference = this.$colorMode.value == "light" ? "dark" : "light";
    }
  }
}
</script>
```

## [4. Nuxt/Cloudinary](https://cloudinary.nuxtjs.org)

One of the easiest ways to improve your websites performance is through image optimizations. Nuxt/Cloudinary makes this ***trivial***.

[Cloundinary](https://cloudinary.com/) is a solution for managing image and video content (with a very generous free plan). The service provides the ability to optimize images on the fly with powerful transformations and even the ability to add text overlays to images. 

[Maya Shavin](https://twitter.com/MayaShavin) maintains this amazing Module that almost feels like magic. The module injects a **Cloudinary Instance** ($cloudinary) into your Nuxt project which you can use to do some really powerful stuff. 

You can fetch images or videos stored in your Cloudinary instance and perform transformations

```javascript
const url = this.$cloudinary.image.url('sample', { crop: 'scale', width: 200 })
```

You can even fetch remote images and perform the very same transformations

```javascript
const url = this.$cloudinary.image
              .fetchRemote(
                'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
                { crop: 'scale', width: 200 })
```

The module also provides some [ready-made Vue components](https://cloudinary.nuxtjs.org/usage/vue-components) that you can use anywhere in your templates. It's truly magic!

## [5. Nuxt/feed](https://www.npmjs.com/package/@nuxtjs/feed)

This module helps you generate an RSS, Atom or JSON feed from your website's content!

You may be thinking, do people still use RSS feeds? Well [Chris Coyier](https://twitter.com/chriscoyier) (founder of CSS Tricks & CodePen) does!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Who’s gonna read your personal blog because it has an RSS feed? I’m gonna read your personal blog because it has an RSS feed. <a href="https://t.co/mtcyKhEVet">pic.twitter.com/mtcyKhEVet</a></p>&mdash; Chris Coyier (@chriscoyier) <a href="https://twitter.com/chriscoyier/status/1214606808125341696?ref_src=twsrc%5Etfw">January 7, 2020</a></blockquote>

The main reason why this is so awesome for me, is that if you decide to crosspost to a platform like [Dev.to](https://dev.to/), you can actually provide your RSS feed URL and have all of your content become drafts which you can immediately publish. It's a well known fact that cross-posting content that is originally published on your site can do wonders for your SEO rankings (provided you define a proper canonical URL for your content).

Also, if you are using Nuxt Content, you can [generate a feed](https://content.nuxtjs.org/integrations) using a few methods described in the official documentation!

## Wrapping up

Like I said before, there are ***tons*** of modules that are amazing, these are just five that I really like.

As of this blog's writing, there are currently 146 Nuxt Modules available for use on [modules.nuxtjs.org](https://modules.nuxtjs.org/) (and more that simply need to be merged into the site). Go ahead and take a look and find something that sounds interesting or helpful.

Have fun exploring the awesome world of Nuxt modules!

Thanks for reading.