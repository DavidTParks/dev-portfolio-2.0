---
title: Add Interactive Sound to Your Nuxt Site
subtitle: Supercharge your Nuxt site's interactive elements with sound!
description: A great way to make your Nuxt site interesting and interactive is to add sounds! This tutorial will teach you how to add optional sound to your Nuxt site when a user interacts with something. 
category: Nuxt
published: true
createdAt: '2020-12-01T23:22:29.628Z'
---

## Intro

Recently, one of the most exciting things to happen to me was [Sarah Drasner](https://twitter.com/sarah_edo) of Vue, Nuxt, SVG and animation fame tweeting about my website!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I&#39;ve been really enjoying articles by <a href="https://twitter.com/dparksdev?ref_src=twsrc%5Etfw">@dparksdev</a>, like this one about Nuxt Table of Contents with Active States. They&#39;re well-explained, plus he has these nice touches on his site like little interactions you can play with! <a href="https://t.co/B34W0EztRF">https://t.co/B34W0EztRF</a> <a href="https://t.co/llgCatwOTB">pic.twitter.com/llgCatwOTB</a></p>&mdash; Sarah Drasner (@sarah_edo) <a href="https://twitter.com/sarah_edo/status/1328369184598749184?ref_src=twsrc%5Etfw">November 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It's safe to say that was a crazy day. Out of all the kind words I received, the most frequent piece of feedback I received was about my **sites interactions**. It's true that interactions like the **battery** under my table of contents or an interesting **train** add a sense of joy and intrigue to an otherwise bland site. It gets people to stick around and explore and in turn, read more of your content!

One excellent way to facilitate interesting interactions is by **adding sounds**. If you have your volume up, for example, and click the battery to the right you'll hear some distorted cyberpunk-y charging sound. 

I'll admit it's a bit jarring sometimes, so it's important to allow the user to ***choose*** if they hear these sounds on your site, and then save their preference for subsequent page visits.

This article will teach you how to add **sounds** to your Nuxt site, and leverage **localStorage** to save their sound preference!

## Setup

Thankfully, our setup does not require any external packages! We can use **localStorage** to save the users preference which is [supported by all browsers](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), and built-in Webpack features to load audio files into our components. 

<info-box>
For more info, check out the <a rel="noopener noreferrer" target="_blank" href="https://nuxtjs.org/faq/webpack-audio-files/">official Nuxt documentation on extending Webpack to load audio files</a>
</info-box>

First, lets extend our **Nuxt config** to allow for loading sounds from our **assets** folder. Add the following lines to your `nuxt.config.js` file:

```javascript
export default {
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
  },
}
```

This will let us import audio files like `new Audio(require('@/assets/sounds/zap.mp3'));` for example.

Great! Let's also go ahead and create a `sounds` folder inside of our `assets` directory to hold our audio files. If you'd like some sample audio to play with, feel free to [check out the ones I am using currently on the site](https://github.com/DavidTParks/dev-portfolio-2.0/tree/master/assets/sounds).

That's all of our setup! Let's write some code 🤓.

## Initializing the user's sound preference

The first time a user visits our site, we can assume that their preference is they want sound to be played. This is entirely up to you if you'd prefer it to be **opt-in** or **opt-out**!

We will be utilizing **Vuex** to initialize a **global** variable that we can access in any page or components **computed** properties!

Create a file inside if your `store` directory called `index.js`.

```javascript
export const state = () => ({
  isSoundEnabled: true,
})

export const mutations = {
  initializeSound(state) {
    const isSoundEnabled = JSON.parse(localStorage.getItem('isSoundEnabled'));
    if(!isSoundEnabled) {
      state.isSoundEnabled = false;
      localStorage.setItem("isSoundEnabled", false);
    } else if(isSoundEnabled) {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", true);
    } else {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", true);
    }
  },
}
```

Here we setup a **Vuex mutation** that we can call inside of a page or components **mounted** hook to read from our **localStorage** and determine if we already have a preference saved, or if we need to initialize their preference for the first time.

Then, inside of a page, we can simply call this mutation as well as access the preference via our `isSoundEnabled` state variable!

```vue
<script>
export default {
  mounted() {
    this.$store.commit('initializeSound');
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    }
  }
}
</script>
```

## Toggling the user's sound preference

Great! ***But***, what if we want the user to change their sound preference? We'll need to implement another **mutation** that can allow us to edit this variable in our **Vuex store** as well as save the new preference to **localStorage**.

Go ahead and add to our `index.js` file in our `store` directory by adding the following method `toggleSound`:

```javascript
export const state = () => ({
  isSoundEnabled: true,
})

export const mutations = {
  toggleSound(state) {
    state.isSoundEnabled = !state.isSoundEnabled;
    localStorage.setItem('isSoundEnabled', state.isSoundEnabled);
  },
  initializeSound(state) {
    const isSoundEnabled = JSON.parse(localStorage.getItem('isSoundEnabled'));
    if(!isSoundEnabled) {
      state.isSoundEnabled = false;
      localStorage.setItem("isSoundEnabled", false);
    } else if(isSoundEnabled) {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", true);
    } else {
      state.isSoundEnabled = true;
      localStorage.setItem("isSoundEnabled", true);
    }
  },
}
```

Excellent! Now, we can create a method inside any **page** or **component** which will commit our `toggleSound` mutation any time we click on a button to change their preference!

```vue
<template>
  <button @click="toggleSound">
    Toggle my sound preference!
  </button>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('initializeSound');
  },
  methods: {
    toggleSound() {
      this.$store.commit('toggleSound');
    }
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    }
  }
}
</script>
```

## Conditionally playing sounds

This is awesome! Now, any time a user interacts with a page element we wish to play sound from, we can first determine if the user has **indicated they want to have sound enabled**, and either play it or skip it entirely.

```vue
<template>
  <button @click="playSound">
    Play me!
  </button>
</template>

<script>
export default {
  data() {
    return {
      audio: null
    }
  },
  mounted() {
    this.$store.commit('initializeSound');
  },
  methods: {
    playSound() {
      if(this.isSoundEnabled) { 
        this.audio = new Audio(require('@/assets/sounds/zap.mp3'));
        this.audio.play();
      }
    },
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    },
  }
}
</script>
```

Feel free to play around with this simple component below to test it out!

<simple-sound-toggle></simple-sound-toggle>

## Wrapping up

As I said before, sound can be a **great** way to foster some truly unique interactions for your visitors. 

This is just scratching the surface, but if you'd like a few more examples of unique sound interactions, be sure to check out [Josh Comeau's](https://www.joshwcomeau.com/) or [Jason Lengstorf's](https://www.jason.af/) websites!

Thanks for reading, and if you enjoyed it please don't hesitate to share on Twitter below!