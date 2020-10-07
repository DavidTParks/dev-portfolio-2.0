<template>
<div></div>
</template>

<script>
export default {
  data() {
    return {
      hits: 0
    }
  },
  async fetch() {
    if (process.env.NODE_ENV === 'production') {
      const {  data } = await this.$axios.get(`/.netlify/functions/register-hit?slug=${this.$route.params.slug}`);
      this.hits = data.hits;
    }
  },
  fetchOnServer: false
}
</script>
