---
title: Build a Like Counter With Fauna, Netlify and Nuxt
subtitle: Netlify functions and FaunaDB for a dynamic like counter on your blog
description: Learn how to leverage Netlify functions, FaunaDB and Nuxt.js to create a dynamic like counter for your blog posts!
category: Serverless
published: false
createdAt: '2020-10-19T23:22:29.628Z'
---

## Intro

When I was building this website, I constantly sought inspiration from some people involved in tech that I follow and look up to. One of these people is **Josh Comeau** (@JoshWComeau on Twitter).

On his website, I read an awesome blog titled [Building a Modern-Day Hit Counter](https://joshwcomeau.com/react/serverless-hit-counter/) that shed some light on how powerful serverless functions in tandem with FaunaDB can be for Statically generated and server side rendered sites. 

While his post dealt mainly with React/Gatsby, I wanted to use some of those FaunaDB concepts and code he provided to create a "like" counter (in my case a "voltage" counter) on every blog post as a cool little detail (***very similar to Josh's "heart" counter on his blog posts***). I'll also be re-using and extending some of his code so I would like to give him credit! 

The aim of this post is to get you setup using Netlify functions and [FaunaDB](https://fauna.com/), and to show you how you can leverage these tools to build a dynamic "like" counter for your personal Nuxt blog.


<info-box :variant="'info'">
If you aren't familiar with <strong>Fauna</strong>, it's a low-latency serverless cloud database with a GraphQL API. We're going to be using it to store "like" counts for each of our blog posts using our blogs <code>slug</code> as the unique identifier.
</info-box>

## Setup

Before we begin, we'll need to make sure that we have a **Fauna** account setup to handle storing and retrieving data, as well as a **Netlify** account where we'll be deploying our application and bundled serverless functions. 

Also, you'll need to pick a headless CMS that you prefer to manage your blog content. I personally use [Nuxt Content](https://content.nuxtjs.org/), but as long as you can leverage or define a unique `slug` for each blog post you will be fine! 

### Fauna

Once you've created a Fauna account, you'll want to login and create a new database for your project.

<imgix-image :alt="'Screenshot showing how to create a new FaunaDB database'" :src="'http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-faunadb-db.png'"></imgix-image>

After setting up our database, we'll also need to create a collection which will store the likes for each of our blog posts. Go ahead and create one named "likes".

<imgix-image :alt="'Screenshot showing how to create a new FaunaDB collection'" :src="'http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-collection.png'"></imgix-image>

In order to successfully query our database, we'll also need to setup an **Index**. Indexes allow us to query documents on document attributes rather than document references, which will be important when we fetch and update our corresponding likes using the blogs `slug`. 

<info-box :variant="'help'">
Feel free to read up on <strong>Indexes</strong> over at <a target="_blank" rel="noopener nofollow" href="https://docs.fauna.com/fauna/current/api/fql/indexes">Fauna's official documentation</a>, as we're barely scratching the surface of how powerful they are.
</info-box>

Go ahead and create an index named `likes_by_slug` using our `likes` collection as the source collection, and `data.slug` being one of our terms which can be searched. 

<imgix-image :alt="'Screenshot showing how to create a new FaunaDB index'" :src="'http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-index.png'"></imgix-image>

Amazing! We are almost there. Now we need to generate an API key that we can use in our Nuxt project to securely query our Fauna database. Navigate to the **Security** section in your Fauna dashboard and generate a new admin key. 

<imgix-image :alt="'Screenshot showing how to generate a FaunaDB database API key'" :src="'http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/api-key-fauna.png'"></imgix-image>

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

When we run our Netlify project locally, it will run on port `8888`. In order to not have CORS issues when we try to test our serverless functions, we need to tell Axios to call via port `8888` when in local development. 

Add this line to your `nuxt.config.js` file:

```javascript
export default {
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:8888/',
  },
}
```

### Netlify

If you aren't familiar with [Netlify functions](https://www.netlify.com/products/functions/), they're essentially Netlify's wrapper on top of AWS Lambda. To keep it simple, they're fully managed and auto-scaling serverless functions that ***just work*** with your Netlify projects. 

Before we start writing our serverless functions that will handle retrieving and updating our `like` counts for our blog posts, we'll need to install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) in order to test our functions locally before deploying to Netlify. Go ahead and install it globally.

```
# install using npm 
npm install netlify-cli -g
```

And then go ahead and authenticate with Netlify by running the following command

```
netlify login
```

Netlify will ask you to login in your browser, and grant access to the Netlify CLI. 

Assuming you already have a project setup on Netlify, we need to now link our local repository with our Site on Netlify. Run the following command and follow the instructions to properly link your site:

```
netlify link
```

Excellent! We are now completely done with setting up the pieces we need.

We have **Fauna** to handle our data storage, **Netlify Functions** to handle updating and retrieving that data via **Axios**, a Headless CMS of our choice, and of course, **Nuxt**! 

Time to dive into some code!

## Writing our functions