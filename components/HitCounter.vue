<template>
  <div class="inline-flex flex-col">
    <div class="inline-flex items-center my-4 dark:bg-darkteal px-4 py-2 border-2 dark:border-retroteal teal-glow rounded-lg border-retropink">
      <svg class="w-6 h-6 mr-2 dark:text-retroteal text-retropink cube light-blue-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
      <span class="dark:teal-glow text-retropink dark:text-retroteal text-xl font-h2">{{hits}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hits: 0
    }
  },
  async fetch() {
    // if(process.env.NODE_ENV === 'production') {
      const {  data } = await this.$axios.get(`/.netlify/functions/register-hit?slug=${this.$route.params.slug}`);
      this.hits = data.hits;
    // }
  },
  fetchOnServer: false
}
</script>

<style>
.cube {
  filter: drop-shadow(0px 0px 8px rgba(198, 208, 235, 0.6));
}
</style>