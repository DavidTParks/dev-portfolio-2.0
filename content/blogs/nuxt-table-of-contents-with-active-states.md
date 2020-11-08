---
title: Nuxt Table of Contents With Active States
subtitle: Active states based on scroll position using the Intersection Observer API
description: An awesome way to show the reader where they are in an article is via active states in a table of contents. This article will show you how to create one using the Intersection Observer API, and Nuxt Content!
category: Nuxt
published: true
createdAt: "2020-11-06T23:22:29.628Z"
---

## Intro

When reading a blog post online, I've always really enjoyed a table of contents on the side of the page indicating the position you are in the article. To me, it's **_super_** helpful for gauging article length and assisting in navigation between topics.

Since I've decided to use the [Nuxt Content](https://content.nuxtjs.org/) module for this blog, I wanted to implement something that would indicate the active section of an article since the module [injects the incredibly useful toc variable](https://content.nuxtjs.org/snippets#table-of-contents) into every `.md` file in my `content` folder. This saves a **_ton_** of time and energy as you don't need to manually create a table of contents for every article!

This article will teach you how to create a **sticky** table of contents sidebar with **active states** based on your current scroll position using the **Intersection Observer** API and **Nuxt Content**!

<info-box :variant="'help'">
If you'd prefer to jump right into the code, check out the Code Sandbox I've prepared below which mirrors what we'll be implementing.
</info-box>

<iframe src="https://codesandbox.io/embed/crazy-leftpad-7z5mu?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:550px; border:0; border-radius: 4px; overflow:hidden;"
  title="crazy-leftpad-7z5mu"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Setup

Thankfully, this implementation requires very little setup. We just need to initialize a **Nuxt** project, install **Nuxt Content** & **Nuxt Tailwind** (optional), and we're set!

Go ahead and install [Nuxt Content](https://content.nuxtjs.org/) and [Nuxt Tailwind](https://tailwindcss.nuxtjs.org/) in your Nuxt project and add the modules to your `nuxt.config.js` file:

```javascript
export default {
  modules: ["@nuxt/content"],
  buildModules: ["@nuxtjs/tailwindcss"]
};
```

Since [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is [supported by almost every browser](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility) (sorry IE users 😭) we can leverage this extremely powerful API to handle detecting when an element scrolls into our viewport! No installation needed!

<info-box>
The <strong>Intersection Observer API</strong> can also be used to do some really powerful stuff like <a rel="noopener noreferrer" target="_blank" href="https://www.telerik.com/blogs/intersection-observer-api-makes-lazy-loading-a-snap">lazy-loading images</a>, as well as implementing some infinite scroll techniques. It's worth digging into and seeing if it can be a solution to a use-case you need!
</info-box>

You will need to ensure that you have a `content` directory in the root of your project that contains some Markdown files you wish to use. Feel free to use my sample [file in Codesandbox](https://codesandbox.io/s/crazy-leftpad-7z5mu?file=/content/main.md) as a reference for tweaking the content to your liking.

Let's go ahead and fetch our blog from our `index.vue` page. Assuming our markdown file is called `main.md` inside of the `/content` directory.

<info-box :variant="'warning'">
On a blog site, you'd typically want to fetch the post from a <a target="_blank" rel="noopener noreferrer" href="https://nuxtjs.org/docs/2.x/directory-structure/pages/#dynamic-pages">dynamic page</a> using the blogs <code>slug</code> as a parameter, but for the sake of brevity we'll focus on the table of contents functionality we're after.
</info-box>

```vue
<script>
export default {
  async asyncData({ $content }) {
    const article = await $content("main").fetch();

    return {
      article
    };
  }
};
</script>
```

And then let's setup up our template, having a section for the article content and one where we will render our **table of contents** looping through the automatically injected `toc` variable into our article.

```vue
<template>
  <div class="p-4 bg-gray-100 grid grid-cols-3 gap-4">
    <div class="prose lg:prose-lg col-span-2">
      <nuxt-content ref="nuxtContent" :document="article" />
    </div>
    <aside class="col-span-1 lg:flex lg:flex-col">
      <div class="sticky top-16">
        <h2
          class="uppercase text-black font-h2 text-lg lg:mt-16 tracking-wider"
        >
          Table of contents
        </h2>
        <nav class="mt-4">
          <ul>
            <li
              :class="{
                'pl-4': link.depth === 3
              }"
              class="toc-list"
              v-for="link of article.toc"
              :key="link.id"
            >
              <a
                role="button"
                class="transition-colors duration-75 text-base mb-2 block"
                :href="`#${link.id}`"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const article = await $content("main").fetch();

    return {
      article
    };
  }
};
</script>
```

## Intersection Observer

Beautiful! Since **Nuxt Content** handles [automatically adding ids](https://content.nuxtjs.org/writing#headings) to each of the headings in our articles, we can use this to our advantage in our pages `mounted` hook to utilize `document.querySelectorAll` and only target our Nuxt Content's article `h2` and `h3` elements that have `ids` associated, and "watch" these using the **Intersection Observer API** to determine when they scroll into view.

Let's go ahead and add the following code to our `mounted` hook and our page `data`.

```vue
<script>
export default {
  data() {
    return {
      currentlyActiveToc: "",
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0
      }
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id;
        }
      });
    }, this.observerOptions);

    // Track all sections that have an `id` applied
    document
      .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
      .forEach(section => {
        this.observer.observe(section);
      });
  },
  beforeDestroy() {
    this.observer.disconnect();
  }
};
</script>
```

There's lots happening here so let's break it down.

First, we need to track the `currentlyActiveToc` item we scroll by in order to add some active styles to the table of contents item, as well as setup our `observer` object which we will use for tracking the `h2` and `h3` HTML elements that scroll into our viewport, so let us define some data properties to track those.

Also, we need to initialize our `IntersectionObserver` with a set of **options** (in my case `observerOptions`) that define when our observers callback is invoked.

I've set a `ref` on our **nuxt-content** article as the root for our observer, and a threshold of `0`, which means that **_as soon as even one pixel is visible, the callback will fire_**. This is obviously up to you to tweak to your liking!

<info-box>
If you'd prefer to be <strong>50%</strong> of the way through the viewport when observing the element, you would use a threshold value of <code>0.5</code>.
</info-box>

In **mounted** we are initializing our `observer` which loops through each of our entries (article headings), and determines that if the entry is currently intersecting with our viewport, we set the headings `id` as the `currentlyActiveToc`.

We are also using `document.querySelectorAll` targeting our `.nuxt-content` article and get the DOM elements that are either `h2` or `h3` elements that have IDs, and **observe** those using our previously initialized `IntersectionObserver`.

**_Finally_**, we are [disconnecting](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect) our observer in the `beforeDestroy` hook and informing our observer to no longer track these headings when we navigate away.

Phew! That was a **_lot_**. But once you let it sink in, you can see how powerful this API is. No longer do you need to fiddle with the `scrollY` position of the `window` compared with the element, you can simply determine which items to observe and apply some logic based on the items position in the viewport.

## Applying active styles

Let's go ahead and edit our template to apply **active styles** to the `currentlyActiveToc` element in our Table of Contents sidebar.

```vue
<template>
  <div class="p-4 bg-gray-50 grid grid-cols-3 gap-4">
    <div class="prose lg:prose-lg col-span-2">
      <nuxt-content ref="nuxtContent" :document="article" />
    </div>
    <aside ref="toc" class="col-span-1 lg:flex lg:flex-col">
      <div class="sticky top-16">
        <h2
          class="uppercase text-black font-h2 text-lg lg:mt-16 tracking-wider"
        >
          Table of contents
        </h2>
        <nav class="mt-4">
          <ul>
            <li
              @click="tableOfContentsHeadingClick(link)"
              :class="{
                'pl-4': link.depth === 3
              }"
              class="toc-list"
              v-for="link of article.toc"
              :key="link.id"
            >
              <a
                :class="{
                  'text-red-500 hover:text-red-600':
                    link.id === currentlyActiveToc,
                  'text-black hover:gray-900': link.id !== currentlyActiveToc
                }"
                role="button"
                class="transition-colors duration-75 text-base mb-2 block"
                :href="`#${link.id}`"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>
```

I've also decided to add a `tableOfContentsHeadingClick` method which passes the `link` to set the `currentlyActiveToc` as the link that was clicked in order to prevent those weird cases where another heading might be observed when you are jumping to that anchor link. This is **_entirely optional_**, but a nice failsafe in case things get weird (I'm still figuring this out too! Haha).

```vue
<script>
methods: {
  tableOfContentsHeadingClick(link) {
    this.currentlyActiveToc = link.id;
  },
}
</script>
```

## Caveats & Wrap up

If you opt for `scroll-behavior: smooth` in your application, when you are smooth scrolling to the link you are clicking in the table of contents the items you scroll past will be "active" as you pass by them.

It's totally personal preference if you want this behavior or not, but it's something to consider. 

Also, if you have "small" sections (a situation where the viewport can have multiple headings in the window), you could potentially be reading a different section than one that is active since it only tracks the **last** heading that has scrolled into the view.

I should also note, this solution is not only limited to **Nuxt Content** and **Nuxt**. In a traditional **Vue SPA** you could easily accomplish the same functionality with a Headless CMS of your choosing and alternative fetching method.

If you find a better solution, feel free to make a pull request (My blog is [open source](https://github.com/DavidTParks/dev-portfolio-2.0)) or message me on [Twitter](https://twitter.com/dparksdev)!

Also, feel free to check out the Codesandbox embed I placed in the intro of this article if you want to play around with it or fork it.

Thanks for reading!
