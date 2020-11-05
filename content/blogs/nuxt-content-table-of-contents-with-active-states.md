---
title: Nuxt Content Table of Contents With Active States
subtitle: Active states based on scroll position using Intersection Observer
description: An awesome way to show the reader where they are in an article is via active states in a table of contents. This article will show you how to create one using the Intersection Observer API, and Nuxt Content!
category: Nuxt
published: false
createdAt: '2020-11-02T23:22:29.628Z'
---

## Intro

When browsing content online, I've always really enjoyed a table of contents on the side of the page indicating the position you are in the article. To me, it's ***super*** helpful for gauging article length and general navigation between topics.

Since I've decided to use [Nuxt Content](https://content.nuxtjs.org/) module for this blog, I wanted to implement something similar since the module injects the incredibly useful `toc` variable into each and every Markdown document in my `content` folder, saving me the headache of manually generating a table of contents for every post I want to write.

This article will teach you how to create a table of contents sidebar with **active states** based on your current scroll position using the **Intersection Observer** API and Nuxt Content!

<info-box :variant="'info'">
If you'd prefer to jump right into the code, check out the Code Sandbox I've prepared below which mirrors what we'll be implementing.
</info-box>

<iframe src="https://codesandbox.io/embed/crazy-leftpad-7z5mu?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:550px; border:0; border-radius: 4px; overflow:hidden;"
  title="crazy-leftpad-7z5mu"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>


## Setup