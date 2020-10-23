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

If you aren't familiar with [Netlify functions](https://www.netlify.com/products/functions/), they're essentially Netlify's wrapper on top of AWS Lambda (with a very generous free-tier). To keep it simple, they're fully managed and auto-scaling serverless functions that ***just work*** with your Netlify projects.

In order to make sure that our deployed site can successfully query our Fauna database, we'll need to navigate to Netlify and add the [environment variables](https://docs.netlify.com/configure-builds/environment-variables/) that we defined earlier, so they will be available to our application when we deploy it!

<imgix-image :alt="'Screenshot showing how to generate a FaunaDB database API key'" :src="'http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/environment-variables.png'"></imgix-image>

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

## Calling our functions

This part is really up to you. I'll show you a cool example 