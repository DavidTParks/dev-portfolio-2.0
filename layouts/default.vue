<template>
  <div class="min-h-screen dark:bg-tokyosky bg-duststorm">
    <NavBar :page="'home'"/>
    <Hero/>
    <PageBreak/>
    <Nuxt keep-alive />
    <Footer/>
  </div>
</template>

<style>

</style>
