<template>
  <div class="login-form-container">
    <h1 class="login-page-title">Accedi</h1>

    <form class="login-form" method="post" @submit.prevent="handleSubmit">
      <div class="form-element">
        <input v-model="email" type="email" name="username" id="username" placeholder="" required />
        <label class="floating-label" for="username">Email</label>
      </div>
      <div class="form-element">
        <input v-model="password" type="password" name="password" id="password" required />
        <label class="floating-label" for="password">Password</label>
      </div>
      <p v-if="invalidCredentails" class="form-element__error">
        Email o passowrd non validi, riprova!
      </p>
      <button class="btn btn-sm btn-primary login-button">Accedi</button>
    </form>

    <div class="other-login">
      Prima volta su StartFlix? <router-link to="/signup">Registrati</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      invalidCredentails: false
    }
  },
  methods: {
    async handleSubmit() {
      const formData = new FormData()
      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$store.dispatch('loginUser', formData)
      if (this.$store.getters.user) {
        this.invalidCredentails = false
        this.$router.push('/select-profile')
      } else {
        this.invalidCredentails = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-form-container {
  padding: 60px 60px 40px;
  background-color: rgba(0, 0, 0, 0.75);
  background-color: #292929;
  border-radius: 4px;
  min-height: 550px;
  max-width: 450px;
  margin: 0 auto;
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
