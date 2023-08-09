<template>
  <header class="header">
    <div class="container">
      <img src="../assets/logo.png" alt="logo" class="header__logo" />
      <a href="#" class="btn btn-primary header__action">Accedi</a>
    </div>
  </header>
</template>

<script></script>

<style scoped lang="scss">
.header {
  height: 80px;
  display: flex;
  align-items: center;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 175px;
  }

  &__action {
    font-weight: 500;
  }
}
</style>
