<template>
  <div class="signup w-50">
    <h1 class="signup__title">Crea una password per iniziare l'abbonamento</h1>
    <h4 class="signup__subtitle">Mancano solo alcuni passaggi!</h4>
    <h4 class="signup__subtitle">Anche noi detestiamo la burocrazia.</h4>

    <form action class="signup__form">
      <div class="form-element form-element--light">
        <input type="email" name="email" id="email" required />
        <label class="floating-label" for="email">Email</label>
      </div>

      <div class="form-element form-element--light">
        <input type="password" name="password1" id="password1" required />
        <label class="floating-label" for="password1">Password</label>
      </div>

      <div class="form-element form-element--light">
        <input type="password" name="password2" id="password2" required />
        <label class="floating-label" for="password2">Ripeti password</label>
      </div>

      <button class="btn btn-sm btn-primary signup__button">Registrati</button>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.signup {
  padding: 1.5rem;
  background-color: white;
  border-radius: 4px;

  &__title {
    font-size: 2rem;
    font-weight: 500;
    color: #333;
    text-align: left;
    margin-bottom: 1.25rem;
  }

  &__subtitle {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  &__form {
    margin-top: 1.25rem;
  }

  &__button {
    width: 100%;
    font-size: 1.5rem;
    height: 64px;
    margin: 1rem 0;
  }
}
</style>
