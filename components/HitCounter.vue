<template>
<div></div>
</template>

<script>
export default {
  async fetch() {
    if (process.env.NODE_ENV === 'production') {
      const {  data } = await this.$axios.get(`/.netlify/functions/register-hit?slug=${this.$route.params.slug}`);
      console.log(data);
    }
    console.log(this.$config.faunaSecretKey);
  },
  fetchOnServer: false
}
</script>
