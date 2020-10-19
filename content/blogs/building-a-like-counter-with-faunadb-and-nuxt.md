---
title: Build a Like Counter With Fauna, Netlify and Nuxt
subtitle: Utilize serverless functions for a dynamic like counter on your blog
description: Learn how to leverage Netlify functions, FaunaDB and Nuxt.js to create a dynamic like counter for your blog posts
category: Serverless
published: false
---

## Intro

When I was building this website, I constantly sought inspiration from some people involved in tech that I follow and look up to. One of these people is **Josh Comeau** (@JoshWComeau on Twitter).

On his website, I read an awesome blog titled [Building a Modern-Day Hit Counter](https://joshwcomeau.com/react/serverless-hit-counter/) that shed some light on how powerful serverless functions can be for statically generated sites. While his post dealt mainly with React, I wanted to use some of those FaunaDB concepts to create a "like" counter (in my case a "voltage" counter) on every blog post as a cool little detail. I'll also be re-using some of his code so I would like to give him credit! 

The aim of this post is to get you setup using Netlify functions and Faunadb, and to show you how you can implement something similar on your Nuxt site. 

## Setup

Before we begin, we'll need to make sure that we have a Fauna account setup, as well as a Netlify account where we'll be deploying our application and bundled serverless functions. 