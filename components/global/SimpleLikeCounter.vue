<template>
  <div>
    <button @click="addLike" class="focus:outline-none" :class="{'text-red-600' : likesMaxed}">
      {{initialLikes}}
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </button>
    <span class="ml-2">Click me!</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initialLikes: 1,
      userLikes: 0,
    }
  },
  methods: {
    addLike() {
      if(this.userLikes < 1) {
        this.userLikes++;
        this.initialLikes++;
      }
    },
  },
  computed: {
    likesMaxed() {
      return this.userLikes === 1;
    },
  }
}
</script>

<style scoped>
/* @media (min-width: 1024px) {
  .battery {
    transform:
      perspective(800px)
      rotateY(25deg) scale(0.9)
      rotateX(10deg);
    opacity: 0.5;
    transition: 0.6s ease all;
  }

  .battery:hover {
    transform:
        perspective(800px)
        rotateY(-15deg)
        translateY(-50px)
        rotateX(10deg)
        scale(1);
      filter: blur(0);
      opacity: 1;
  }
} */
</style>