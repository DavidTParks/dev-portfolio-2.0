<template>
  <main>
    <div>
      <div class="grid gap-24 grid-cols-1 md:grid-cols-3">
        <section class="col-span-2">
          <h2 class="text-3xl leading-9 font-h1 text-retropink pink-glow sm:text-4xl sm:leading-10">
            Recent blogs
          </h2>
          <slot></slot>
        </section>
        <section class="flex flex-col col-span-1">
          <h3 class="text-3xl leading-9 font-h1 text-retropink pink-glow sm:text-4xl sm:leading-10">Categories</h3>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ['latest-articles']
}
</script>