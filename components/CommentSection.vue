<template>
  <div>
    {{comments}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: []
    }
  },
  async fetch() {
    const { data } = await this.$axios.get(`/.netlify/functions/fetch_comments_for_blog?slug=${this.$route.params.slug}`);
    this.comments = data.comments;
  },
}
</script>