<template>
  <lottie class="" :options="lottieOptions" v-on:animCreated="handleAnimation" />
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from "~/assets/animations/harddrive.json";
export default {
  props: {
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  },
  components: {
    Lottie
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { 
        animationData: animationData.default,
        renderer: 'svg', 
        resizeMode: 'cover',
        preserveAspectRatio: 'xMidYMid meet'
      }
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    }
  }
}
</script>