<template>
<div>
  <div class="relative">
    <img :alt="imageAlt" loading="lazy" class="w-full lg:h-64 lg:-64 overflow-hidden rounded-t-lg object-cover border-2 border-dotted border-retropink flex" :src="imageToShow"/>
  </div>
  <!-- <figcaption class="text-white text-sm mt-2 text-center lg:text-left">Robot David</figcaption> -->
  <div class="bg-darkteal rounded-b-lg border border-t-0 border-retroyellow p-4 flex justify-between portrait">
    <div>
      <span class="text-white font-h2 uppercase tracking-wider text-retroyellow yellow-glow inline-flex">Robot</span>
    </div>
    <span @click="checked = !checked" role="checkbox" tabindex="0" aria-checked="false" :class="[checked ? 'bg-retropink' : 'bg-retroyellow']"  class="relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none">
    <!-- On: "translate-x-5", Off: "translate-x-0" -->
      <span aria-hidden="true" :class="[checked ? 'translate-x-6' : 'translate-x-0']" class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200">
        
      </span>
    </span>
    <div>
      <span class="text-white whitespace-no-wrap font-h2 uppercase tracking-wider text-retropink pink-glow inline-flex">Human</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      robotImage: 'https://davidparksdev.imgix.net/davidthomaspark_2.png?q=70&w=400&h=400',
      robotAlt: 'Robot version of David with a glowing green eye and pink lightning surrounding him',
      normalAlt: 'Human version of David smiling wearing a striped blue pullover',
      normalImage: 'https://davidparksdev.imgix.net/david-cropped.png?q=70&w=400&h=400&fit=crop'
    }
  },
  computed: {
    imageToShow() {
      return this.checked ? this.normalImage : this.robotImage;
    },
    imageAlt() {
      return this.checked ? this.normalAlt : this.robotAlt;
    }
  }
}
</script>

<style scoped>
.portrait {
  background-color: #041628;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231b3e60' fill-opacity='0.06' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
}
</style>