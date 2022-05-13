<template>
  <div class="home">
    <home-nav />
    <home-main />
    <layout-footer />
  </div>
</template>

<script setup>
import layoutFooter from '@/components/LayoutFooter.vue'

import homeNav from './components/HomeNav.vue'
import homeMain from './components/HomeMain.vue'
</script>
<style lang="scss" scoped>
.home {

}
</style>
