<template>
<div class="relative">
  <div class="lava-backdrop">

  </div>
  <div class="lava-gradient">

  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.dark .lava-backdrop {
  background-image: url('~assets/svg/lava-backdrop.svg?inline');
  background-repeat: no-repeat, no-repeat;
  background-position: bottom center, 50% -100px;
  background-size: 100%, 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10rem;
  margin-bottom: -1px;
  position: relative;
}
@media (min-width: 640px) {
  .lava-backdrop {
    min-height: 400px;
  }
}

.light .lava-backdrop {
  /* background-image: url('~assets/svg/sand-lava.svg?inline'); */
  background-repeat: no-repeat, no-repeat;
  background-position: bottom center, 50% -100px;
  background-size: 100%, 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10rem;
  margin-bottom: -1px;
  position: relative;
}
</style>