<template>
  <div class="signup">
    <h1 class="signup__title">Crea una password per iniziare l'abbonamento</h1>
    <h4 class="signup__subtitle">Mancano solo alcuni passaggi!</h4>
    <h4 class="signup__subtitle">Anche noi detestiamo la burocrazia.</h4>

    <form @submit.prevent="handleSubmit" class="signup__form">
      <div class="form-element form-element--light">
        <input v-model="nome" type="text" name="firstName" id="firstName" required />
        <label class="floating-label" for="firstName">Nome</label>
      </div>

      <div class="form-element form-element--light">
        <input v-model="cognome" type="text" name="lastName" id="lastName" required />
        <label class="floating-label" for="lastName">Cognome</label>
      </div>

      <div class="form-element form-element--light">
        <select v-model="sesso" class="form-select">
          <option disabled value="---">Sesso</option>
          <option value="M">Maschio</option>
          <option value="F">Femmina</option>
          <option value="A">Altro</option>
        </select>
        <label class="floating-label" for="sesso">Sesso</label>
      </div>

      <div class="form-element form-element--light">
        <input v-model="telefono" type="number" name="numero" id="numero" required />
        <label class="floating-label" for="numero">Numero</label>
      </div>

      <div class="form-element form-element--light">
        <input v-model="email" type="email" name="email" id="email" placeholder="&#160;" required />
        <label class="floating-label" for="email">Email</label>
      </div>

      <div
        :class="[
          'form-element',
          'form-element--light',
          {
            'form-element--error': submitPasswordEror
          }
        ]"
      >
        <input v-model="password" type="password" name="password1" id="password1" required />
        <label class="floating-label" for="password1">Password</label>
      </div>

      <div
        :class="[
          'form-element',
          'form-element--light',
          {
            'form-element--error': submitPasswordEror
          }
        ]"
      >
        <input
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
        />
        <label class="floating-label" for="confirmPassword">Ripeti password</label>
      </div>
      <p v-if="submitPasswordEror" class="form-element__error">
        Le password non coincidono, riprova!
      </p>
      <button class="btn btn-sm btn-primary signup__button">Registrati</button>
    </form>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs'

export default {
  data() {
    return {
      nome: '',
      cognome: '',
      sesso: '---',
      telefono: null,
      email: this.$store.getters.getEmail,
      password: '',
      confirmPassword: '',
      isPasswordEqual: false,
      submitPasswordEror: false
    }
  },
  methods: {
    async handleSubmit() {
      this.validatePassword()
      if (this.isPasswordEqual) {
        this.submitPasswordEror = false

        try {
          const hashedPassword = await this.hashPassword(this.password)

          const formData = new FormData()
          formData.append('nome', this.nome)
          formData.append('cognome', this.cognome)
          formData.append('sesso', this.sesso)
          formData.append('telefono', this.telefono)
          formData.append('email', this.email)
          formData.append('password', hashedPassword)

          this.$store.dispatch('registerUser', formData)

          this.$router.push({ name: 'login' })
        } catch (error) {
          console.log(error)
        }
      } else {
        this.submitPasswordEror = true
      }
    },
    validatePassword() {
      if (this.password === this.confirmPassword) {
        this.isPasswordEqual = true
      }
    },
    async hashPassword(password) {
      return await bcrypt.hash(password, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.signup {
  margin: 0 auto;
  max-width: 50%;
  padding: 1.5rem;
  background-color: white;
  border-radius: 4px;

  @media screen and (max-width: 992px) {
    max-width: 75%;
  }

  @media screen and (max-width: 476px) {
    max-width: 100%;
  }

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

    @media screen and (max-width: 476px) {
      font-size: 1.25rem;
    }
  }
}
</style>
