<template>
  <div class="login-form-container w-50 m-auto">
    <h1 class="login-page-title">Accedi</h1>

    <form class="login-form">
      <div class="form-element">
        <input type="text" name="username" id="username" placeholder="" required />
        <label class="floating-label" for="username">Email o Numero di telefono</label>
      </div>
      <div class="form-element">
        <input type="password" name="password" id="password" required />
        <label class="floating-label" for="password">Password</label>
      </div>
      <button class="btn btn-sm btn-primary login-button">Accedi</button>
    </form>

    <div class="other-login">Prima volta su StartFlix? <router-link to="/signup">Registrati</router-link></div>
  </div>
</template>

<style scoped lang="scss">
.login-form-container {
  padding: 60px 60px 40px;
  background-color: rgba(0, 0, 0, 0.75);
  background-color: #292929;
  border-radius: 4px;
  min-height: 550px;
  max-width: 450px;
}

.login-page-title {
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.login-button {
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
  margin: 1.5rem 0;
}

.other-login {
  color: #737373;

  a {
    color: white;
  }
}
</style>
