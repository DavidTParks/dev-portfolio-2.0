<template>
  <picture>
    <source
      media="(min-width: 1280px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=800&fm=webp`
      "
      type="image/webp"
    />
    <source
      media="(min-width: 1024px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=700&fm=webp`
      "
      type="image/webp"
    />
    <source
      media="(min-width: 768px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=768&fm=webp`
      "
      type="image/webp"
    />
    <source
      media="(min-width: 320px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=468&fm=webp`
      "
      type="image/webp"
    />
    <source
      media="(min-width: 1280px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=800&fm=png`
      "
      type="image/png"
    />
    <source
      media="(min-width: 1024px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=700&fm=png`
      "
      type="image/png"
    />
    <source
      media="(min-width: 768px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=768&fm=png`
      "
      type="image/png"
    />
    <source
      media="(min-width: 320px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=320&fm=png`
      "
      type="image/png"
    />
    <img
      width="1000"
      height="400"
      loading="lazy"
      :alt="alt"
      class="h-full w-full"
      :src="`${src}?auto=format&fit=crop&q=80&w=1000`"
    />
  </picture>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
};
</script>
