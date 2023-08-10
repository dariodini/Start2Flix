<template>
  <TheHeader></TheHeader>
  <LoginForm></LoginForm>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import LoginForm from './components/LoginForm.vue'

export default {
  components: {
    TheHeader,
    LoginForm
  }
}
</script>

<style lang="scss">
@import 'style/style.scss';
</style>
