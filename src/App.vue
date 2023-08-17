<template>
  <TheHeader></TheHeader>
  <div class="start-container">
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
@import 'style/style.scss';
</style>
