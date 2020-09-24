<template>
  <main class="pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto lg:max-w-5xl">
      <div class="grid gap-24 grid-cols-1 md:grid-cols-3">
        <section class="col-span-2">
          <h2 class="text-3xl leading-9 font-h1 text-retropink pink-glow sm:text-4xl sm:leading-10">
            Recent blogs
          </h2>
          <RecentBlogs/>
        </section>
        <section class="flex flex-col col-span-1">
          <h3 class="text-3xl leading-9 font-h1 text-retropink pink-glow sm:text-4xl sm:leading-10">Categories</h3>
        </section>
      </div>
    </div>
  </main>
</template>