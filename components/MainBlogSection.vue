<template>
  <main>
    <div class="grid gap-24 grid-cols-1 md:grid-cols-3">
      <section class="col-span-2">
        <h2 class="text-3xl leading-9 font-h1 text-black dark:text-lightblue dark:pink-glow sm:text-2xl sm:leading-10">
          Recent blogs
        </h2>
        <slot></slot>
      </section>
      <section class="flex flex-col col-span-1">
        <h3 class="text-3xl leading-9 font-h1 text-black dark:text-lightblue dark:pink-glow sm:text-2xl sm:leading-10">Categories</h3>
      </section>
    </div>
  </main>
</template>