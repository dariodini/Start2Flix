<template>
  <header class="header" v-if="!hideHeader">
    <div class="start-container">
      <router-link to="/"
        ><img src="../assets/logo.png" alt="logo" class="header__logo"
      /></router-link>
      <router-link v-if="showLoginButton" to="/login" class="btn btn-primary header__action"
        >Accedi</router-link
      >
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    hideHeader() {
      return this.$route.meta.hideHeader
    },
    showLoginButton() {
      return this.$route.meta.showLoginButton
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 90px;
  .start-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 200px;
  }

  &__action {
    font-weight: 500;
  }
}
</style>
