---
title: Social Share Images in Nuxt Content
subtitle: Supercharge your social media presence with beautiful sharing cards
description: Have you ever wondered how people on Twitter or Facebook get those beautiful image previews of their posts? This post will teach you how, with Nuxt Content!
position: 5
category: Getting started
---

## Why social media cards matter

You can use `<nuxt-content>` component directly in your template to display the page body:

```vue
<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('home').fetch()

    return {
      page
    }
  }
}
</script>
```


**Props:**
- document:
  - Type: `Object`
  - `required`

Learn more about what you can write in your markdown file in the [writing content](/writing#markdown) section.

## Style

Depending on what you're using to design your app, you may need to write some style to properly display the markdown.

`<nuxt-content>` component will automatically add a `.nuxt-content` class, you can use it to customize your styles:

```css
.nuxt-content h1 {
  /* my custom h1 style */
}
```

You can find an example in the [docs directory](https://github.com/nuxt/content/blob/master/docs/pages/_slug.vue).

## Live Editing

### Putting it all together
### Second point
### Third point
> Available in version **>= v1.4.0**

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.