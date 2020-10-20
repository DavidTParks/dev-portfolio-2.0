<template>
  <picture>
    <source
      media="(min-width: 1280px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=1280&fm=webp`
      "
      type="image/webp"
    />
    <source
      media="(min-width: 1024px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=1024&fm=webp`
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
        `${src}?auto=format&fit=crop&q=80&w=1280&fm=png`
      "
      type="image/png"
    />
    <source
      media="(min-width: 1024px)"
      :srcset="
        `${src}?auto=format&fit=crop&q=80&w=1024&fm=png`
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
      :alt="alt"
      class="solutions-w-full solutions-h-full solutions-object-cover solutions-object-top"
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
