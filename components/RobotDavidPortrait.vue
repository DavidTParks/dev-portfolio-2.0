<template>
<div>
  <img :alt="imageAlt" loading="lazy" class="w-full lg:h-64 lg:-64 overflow-hidden rounded-t-lg object-cover border-2 border-retropink flex" :src="imageToShow"/>
  <!-- <figcaption class="text-white text-sm mt-2 text-center lg:text-left">Robot David</figcaption> -->
  <div class="bg-darkteal rounded-b-lg border border-t-0 border-retropink p-2 flex justify-between">
    <div>
      <span class="text-white font-h2 uppercase tracking-wider text-retroyellow yellow-glow">Robot</span>
    </div>
    <span @click="checked = !checked" role="checkbox" tabindex="0" aria-checked="false" :class="[checked ? 'bg-retropink' : 'bg-retroyellow']"  class="relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none">
    <!-- On: "translate-x-5", Off: "translate-x-0" -->
      <span aria-hidden="true" :class="[checked ? 'translate-x-6' : 'translate-x-0']" class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200">
        
      </span>
    </span>
    <div>
      <span class="text-white whitespace-no-wrap font-h2 uppercase tracking-wider text-retrogreen green-glow">Human</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      robotImage: 'http://davidparksdev.imgix.net/davidthomaspark_2.png?q=70&w=400&h=400',
      robotAlt: 'Robot version of David with a glowing green eye and pink lightning surrounding him',
      normalAlt: 'Human version of David smiling wearing a striped blue pullover',
      normalImage: 'http://davidparksdev.imgix.net/david-cropped.png?q=70&w=400&h=400&fit=crop'
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