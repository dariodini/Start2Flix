<template>
  <header class="header">
    <div class="container">
      <router-link to="/"><img src="../assets/logo.png" alt="logo" class="header__logo" /></router-link>
      <router-link to="/login" class="btn btn-primary header__action">Accedi</router-link>
    </div>
  </header>
</template>

<script></script>

<style scoped lang="scss">
.header {
  height: 90px;
  display: flex;
  align-items: center;
  .container {
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
