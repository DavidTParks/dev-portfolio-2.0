---
title: Nuxt Content Active Position Table of Contents
subtitle: Table of contents with active states based on scroll position
description: Learn how to create a table of contents section for your Nuxt Content articles with active states based on scroll position
position: 5
category: Nuxt
published: false
---

<info-box :variant="'warning'">Lorem ipsum dolor sit amet</info-box>

<info-box :variant="'info'">Lorem ipsum dolor sit amet, <a>adipiscing elit</a> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</info-box>

<info-box :variant="'danger'">Lorem ipsum dolor sit amet, <a>adipiscing elit</a> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</info-box>

<info-box :variant="'help'">Lorem ipsum dolor sit amet, <a>adipiscing elit</a> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</info-box>

<info-box :variant="'callToAction'">Lorem ipsum dolor sit amet, consectetur <a>adipiscing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</info-box>

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

<twitter-cta></twitter-cta>

**Props:**
- document:
  - Type: `Object`
  - `required`

Learn more about what you can write in your markdown file in the [writing content](/writing#markdown) section.

## Live Editing

### Putting it all together
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
### Second point
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
### Third point
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