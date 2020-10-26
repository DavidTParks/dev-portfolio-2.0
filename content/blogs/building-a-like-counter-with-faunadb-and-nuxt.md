---
title: Build a Like Counter With Fauna, Netlify and Nuxt
subtitle: Netlify functions and FaunaDB for a dynamic like counter on your blog
description: Learn how to leverage Netlify functions, FaunaDB and Nuxt.js to create a dynamic like counter for your blog posts!
category: Serverless
published: true
createdAt: '2020-10-25T23:22:29.628Z'
---

## Intro

When I was building this website, I constantly sought inspiration from some people involved in tech that I follow and look up to. One of these people is **Josh Comeau** (@JoshWComeau on Twitter).

On his website, I read an awesome blog titled [Building a Modern-Day Hit Counter](https://joshwcomeau.com/react/serverless-hit-counter/) that shed some light on how powerful serverless functions in tandem with FaunaDB can be on Jamstack sites.

While his post dealt mainly with React/Gatsby, I wanted to use some of those serverless concepts and code he provided to create a "like" counter (in my case a "voltage" counter) on every blog post as a cool little detail (***very similar to Josh's "heart" counter on his blog posts***). I'll also be re-using and extending some of his code so I would like to give him credit! 

The aim of this post is to get you setup using Netlify functions and [FaunaDB](https://fauna.com/), and to show you how you can leverage these tools to build a dynamic "like" counter for your personal Nuxt blog.

<info-box :variant="'info'">
If you aren't familiar with <strong>Fauna</strong>, it's a low-latency serverless cloud database with a GraphQL API. We're going to be using it to store "like" counts for each of our blog posts using our blogs <code>slug</code> as the unique identifier.
</info-box>

## Setup

Before we begin, we'll need to make sure that we have a **Fauna** account setup to handle storing and retrieving data, as well as a **Netlify** account where we'll be deploying our application and bundled serverless functions. 

Also, you'll need to pick a headless CMS that you prefer to manage your blog content. I personally use [Nuxt Content](https://content.nuxtjs.org/), but as long as you can leverage or define a unique `slug` for each blog post you will be fine!

### Fauna

Once you've created a Fauna account, you'll want to login and create a new database for your project.

<imgix-image :alt="'Screenshot showing how to create a new FaunaDB database'" :src="'https://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-faunadb-db.png'"></imgix-image>

After setting up our database, we'll also need to create a collection which will store the likes for each of our blog posts. Go ahead and create one named "likes".

<imgix-image :alt="'Screenshot showing how to create a new FaunaDB collection'" :src="'https://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-collection.png'"></imgix-image>

In order to successfully query our database, we'll also need to setup an **Index**. Indexes allow us to query documents on document attributes rather than document references, which will be important when we fetch and update our corresponding likes using the blogs `slug`.

<info-box :variant="'help'">
Feel free to read up on <strong>Indexes</strong> over at <a target="_blank" rel="noopener nofollow" href="https://docs.fauna.com/fauna/current/api/fql/indexes">Fauna's official documentation</a>, as we're barely scratching the surface of how powerful they are.
</info-box>

Go ahead and create an index named `likes_by_slug` using our `likes` collection as the source collection, and `data.slug` being one of our terms which can be searched.

<imgix-image :alt="'Screenshot showing how to create a new FaunaDB index'" :src="'https://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-index.png'"></imgix-image>

Amazing! We are almost there. Now we need to generate an API key that we can use in our Nuxt project to securely query our Fauna database. Navigate to the **Security** section in your Fauna dashboard and generate a new admin key.

<imgix-image :alt="'Screenshot showing how to generate a FaunaDB database API key'" :src="'https://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/api-key-fauna.png'"></imgix-image>

We'll be referencing this key using the `FAUNA_SECRET_KEY` environment variable.

### Nuxt

Great! We've got Fauna all setup. Now we can hop over to our Nuxt project and start to pull in some dependencies we'll need to get started.

Go ahead and install the [Fauna npm package](https://www.npmjs.com/package/faunadb).

```
# install using npm
npm install --save faunadb
 
# install using yarn
yarn add faunadb
```

We'll also be using [Axios](https://axios.nuxtjs.org/) to handle our API requests, so go ahead and install the Nuxt module:

```
# install using npm
npm install @nuxtjs/axios
 
# install using yarn
yarn add @nuxtjs/axios
```

And add it to your `nuxt.config.js` file:

```javascript
export default {
  modules: ['@nuxtjs/axios']
}
```

Also, create a `.env` file in your project's root and pull in your Fauna API Key that you generated earlier

```env
BASE_URL=YOUR_PROD_URL
FAUNA_SECRET_KEY=YOUR_KEY
```

Great! Lastly, we can now use our `BASE_URL` environment variable to get Axios setup for both local development and our production deployment.

When I run my Netlify project locally using [Netlify Dev](https://www.netlify.com/products/dev/), I run it on port `8888`. In order to not have CORS issues when we try to test our serverless functions, we need to tell Axios to call via port `8888`, or whatever port you'd like when in local development.

Add this line to your `nuxt.config.js` file:

```javascript
export default {
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:8888/',
  },
}
```

### Netlify

If you aren't familiar with [Netlify functions](https://www.netlify.com/products/functions/), they're essentially Netlify's wrapper on top of AWS Lambda (with a very generous free-tier). To keep it simple, they're fully managed and auto-scaling serverless functions that ***just work*** with your Netlify projects.

In order to make sure that our deployed site can successfully query our Fauna database, we'll need to navigate to Netlify and add the [environment variables](https://docs.netlify.com/configure-builds/environment-variables/) that we defined earlier, so they will be available to our application when we deploy it!

<imgix-image :alt="'Screenshot showing how to generate a FaunaDB database API key'" :src="'https://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/environment-variables.png'"></imgix-image>

You should also check out [Netlify Dev](https://www.netlify.com/products/dev/) which will allow you to test your functions locally before deployment. This can save you lots of time when debugging your functions and UI. It's a bit of a process so I won't cover it, but definitely recommend getting the Netlify CLI setup and linking your site to your project!

Excellent! We are now completely done with setting up the pieces we need.

We have **Fauna** to handle our "likes" storage, **Netlify Functions** to handle updating and retrieving that data via **Axios**, a Headless CMS of our choice, and of course, **Nuxt**!

Time to dive into some code!

## Writing our functions

Our needs for these functions can be broken down into two pieces.

- We need to fetch the current likes of a blog on page load
- We need to be able to increment these likes when a user clicks on our "like" counter

### Fetching likes function

We'll start with the one that will fetch our blogs `like` count on page load (or component mount).

Go ahead and create a folder in the root of your Nuxt project called `functions`. Netlify will automatically look here for any serverless functions each time you deploy.

Create a file called `fetch_likes_for_blog.js` inside of the `functions` folder. 

```javascript
// Credit to Josh Comeau 
const faunadb = require('faunadb');
exports.handler = async (event) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
  const { slug } = event.queryStringParameters;
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided',
      }),
    };
  }

  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('likes_by_slug'), slug))
  );
  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('likes'), {
        data: { slug: slug, likes: 1 },
      })
    );
  }

  const document = await client.query(
    q.Get(q.Match(q.Index('likes_by_slug'), slug))
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      likes: document.data.likes,
    }),
  };
};
```

Let's run through it. 

1. First, we are initializing our Fauna client with the secret key we generated earlier
2. We are checking if the blog slug is provided as a query parameter, if not we return **400**
3. We check if the document in Fauna already exists
4. If it does not exist, we create a new document within our `likes` collection and set the initial likes to `1` using our `slug` as the unique identifier
5. We query the `likes_by_slug` index we created earlier using our `slug` to retrieve the current likes
6. We return the likes of the blog

### Incrementing likes function

This function is extremely similar to the fetch function, except for the fact that we need to increment the existing like count before we return it to the client. 

<info-box :variant="'info'">
This is the function that we'll be calling when a user interacts with whatever icon/button we want to use to handle <strong>liking</strong> the blog post. 
</info-box>

Create a new file in your `functions` directory called `register-like.js`

```javascript
// Credit to Josh Comeau
const faunadb = require('faunadb');
exports.handler = async (event) => {
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
  const { slug } = event.queryStringParameters;
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided',
      }),
    };
  }

  const doesDocExist = await client.query(
    q.Exists(q.Match(q.Index('likes_by_slug'), slug))
  );
  if (!doesDocExist) {
    await client.query(
      q.Create(q.Collection('likes'), {
        data: { slug: slug, likes: 1 },
      })
    );
  }

  const document = await client.query(
    q.Get(q.Match(q.Index('likes_by_slug'), slug))
  );


  await client.query(
    q.Update(document.ref, {
      data: {
        likes: document.data.likes + 1,
      },
    })
  );
  return {
    statusCode: 200,
    body: JSON.stringify({
      likes: document.data.likes,
    }),
  };
};
```

As you can see, the code is essentially the same except for the fact that after we query the index, we then run an `update` on our document and increment the likes by `1`.

## Using our functions in Nuxt

When we end up deploying our application, they will be available to us at the path: `/.netlify/functions/NAME_OF_FUNCTION`. 

In my case, I created a [VoltBatteryCounter](https://github.com/DavidTParks/dev-portfolio-2.0/blob/master/components/VoltBatteryCounter.vue) component that I plug into the sides of my dynamic blog pages in `pages/blog/_slug.vue`. In this component, I am passing the slug to the function by utilizing `this.$route.params.slug`. 

Since I am using Nuxt's `static` mode, I am leveraging the [fetch](https://nuxtjs.org/api/pages-fetch/) hook with `fetchOnServer: false` set in order to ensure that the hook is called each time the component is mounted and not only once during build.

```vue
<script>
export default {
  data() {
    return {
      initialLikes: null,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/.netlify/functions/fetch_likes_for_blog?slug=${this.$route.params.slug}`);
    this.initialLikes = data.likes;
  },
  fetchOnServer: false,
}
</script>
```

And then, whenever a user **clicks** on the Battery I have positioned to the right of my blog post, I will use **Axios** that we setup earlier to call our servleress function to increment the like count. 

```vue
<script>
export default {
  data() {
    return {
      initialLikes: null,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/.netlify/functions/fetch_likes_for_blog?slug=${this.$route.params.slug}`);
    this.initialLikes = data.likes;
  },
  fetchOnServer: false,
  methods: {
    addLike() {
      this.initialLikes++;
      this.incrementLikes();
    },
    async incrementLikes() {
      await this.$axios.post(`/.netlify/functions/register-like?slug=${this.$route.params.slug}`);
    }
  },
}
</script>
```

You might be wondering though, ***what if somebody decides to just spam my like button thousands of times and completely eat up my free-tier of functions?***

There are a few routes you could go with this. One of which, would be to introduce some local state like `userLikeCount` along with a computed property called `likesMaxed`, which only allows a user to increment the counter up to 12 times or so. Ex:

```vue
<script>
export default {
  data() {
    return {
      initialLikes: null,
      userLikeCount: 0,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/.netlify/functions/fetch_likes_for_blog?slug=${this.$route.params.slug}`);
    this.initialLikes = data.likes;
  },
  fetchOnServer: false,
  methods: {
    addLike() {
      if(!likesMaxed) {
        this.initialLikes++;
        this.userLikeCount++;
        this.incrementLikes();
      }
    },
    async incrementLikes() {
      await this.$axios.post(`/.netlify/functions/register-like?slug=${this.$route.params.slug}`);
    }
  },
  computed: {
    likesMaxed() {
      return this.userLikeCount >= 12;
    },
  },
}
</script>
```

However, the user could simply reload the page and increment the counter another 12 times. 

In my case, I decided to use `localStorage` to ensure that users could only increment the like count a maximum of 12 times per blog post, which would persist on subsequent page visits (Credit to [Lucie](https://twitter.com/li_hbr) for the idea!)

### Storing Likes in Local Storage

Start by creating a file called `index.js` from within your `store` directory in your Nuxt project.

```javascript
export const state = () => ({
  storedUserLikes: 1
})

export const mutations = {
  initializeLikes(state, slug) {
    const storedLikes = Math.abs(Number(localStorage.getItem(slug)));

    if(storedLikes) {
      storedLikes >= 12 ? state.storedUserLikes = 12 : state.storedUserLikes = storedLikes;
    } else {
      localStorage.setItem(slug, 1);
      state.storedUserLikes = 1;
    }
  },
  incrementLikes(state, slug) {
    state.storedUserLikes = state.storedUserLikes + 1;
    localStorage.setItem(slug, state.storedUserLikes);
  }
}
```

First I am initializing the likes on the page by reading from the local storage the associated count.

<info-box :variant="'callToAction'">
I'm also adding in some checks to get the absolute value in case a user edits it to be a negative number, allowing them to click infinitely, as well as determine if the number is greater than 12 to only set the storedLikes to 12. 
</info-box>

Now, we can extend our previous code to utilize this new piece of global state.

```vue
<script>
export default {
  data() {
    return {
      initialLikes: null,
      userLikeCount: 0,
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/.netlify/functions/fetch_likes_for_blog?slug=${this.$route.params.slug}`);
    this.initialLikes = data.likes;
  },
  mounted() {
    this.$store.commit('initializeLikes', this.$route.params.slug);
  },
  fetchOnServer: false,
  methods: {
    async addLike() {
      if(this.storedUserLikes < 12) {
        this.initialLikes++;
        this.$store.commit('incrementLikes', this.$route.params.slug);
        this.incrementLikes();
      }
    },
    async incrementLikes() {
      await this.$axios.post(`/.netlify/functions/register-like?slug=${this.$route.params.slug}`);
    }
  },
  computed: {
    likesMaxed() {
      return this.userLikeCount >= 12;
    },
    storedUserLikes() {
      return this.$store.state.storedUserLikes;
    }
  }
}
</script>
```

Awesome! We now have a like counter that is persistent across multiple sessions and page visits. It's up to you how you want to render the like count so use your imagination! If you'd want to do something similar to my battery, feel free to check out my [source code](https://github.com/DavidTParks/dev-portfolio-2.0/blob/master/components/VoltBatteryCounter.vue) on Github, as I've decided to open source my site.

If you'd prefer a more traditional "like button" look, here is a simple one with Tailwind to get you started!

```vue
<template>
  <div>
    <div class="flex items-baseline">
      <button @click="addLike" class="focus:outline-none" :class="{'text-red-600' : likesMaxed}">
        {{initialLikes}}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
      </button>
    </div>
  </div>
</template>
```

<simple-like-counter></simple-like-counter>

## Wrapping up

If you've made it this far, good job! I can't wait to (hopefully) see some more dynamic like counters on statically generated Nuxt sites in the future.

If you do decide to implement one, [let me know on Twitter!](https://twitter.com/dparksdev) I'd love to see what you come up with. 

Thanks for reading!