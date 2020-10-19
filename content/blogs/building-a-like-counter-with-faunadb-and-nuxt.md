---
title: Build a Like Counter With Fauna, Netlify and Nuxt
subtitle: Utilize serverless functions for a dynamic like counter on your blog
description: Learn how to leverage Netlify functions, FaunaDB and Nuxt.js to create a dynamic like counter for your blog posts
category: Serverless
published: true
---

## Intro

When I was building this website, I constantly sought inspiration from some people involved in tech that I follow and look up to. One of these people is **Josh Comeau** (@JoshWComeau on Twitter).

On his website, I read an awesome blog titled [Building a Modern-Day Hit Counter](https://joshwcomeau.com/react/serverless-hit-counter/) that shed some light on how powerful serverless functions in tandem with FaunaDB can be for statically generated sites. While his post dealt mainly with React, I wanted to use some of those FaunaDB concepts to create a "like" counter (in my case a "voltage" counter) on every blog post as a cool little detail. I'll also be re-using some of his code so I would like to give him credit! 

The aim of this post is to get you setup using Netlify functions and [FaunaDB](https://fauna.com/), and to show you how you can implement something similar on your Nuxt site. 


<info-box :variant="'info'">
If you aren't familiar with <strong>Fauna</strong>, it's a serverless cloud database with ultra-low latency and a GraphQL API. We're going to be using it to store "like" counts for each of our blog posts. 
</info-box>

<div class="mt-16 flex"></div>

## Setup

Before we begin, we'll need to make sure that we have a Fauna account setup, as well as a Netlify account where we'll be deploying our application and bundled serverless functions. 

### Fauna

Once you've created a Fauna account, you'll want to login and create a new database for your project. 

<figure>
  <img src="http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-faunadb-db.png"/>
</figure>

After setting up our database, we'll also need to create a collection for our likes. Go ahead and create one named "likes".

<figure>
  <img src="http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-collection.png"/>
</figure>

In order to successfully query our database, we'll also need to setup an **Index**. Indexes allow us to query documents on document attributes rather than document references, which will be important when we fetch our likes using the blogs `slug`. 

Go ahead and create an index using our `likes` collection as the source collection, and `data.slug` being one of our terms which can be searched. 

<figure>
  <img src="http://davidparksdev.imgix.net/building-a-like-counter-with-faunadb-and-nuxt/new-index.png"/>
</figure>