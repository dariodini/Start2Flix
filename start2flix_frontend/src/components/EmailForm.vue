<template>
  <form class="email-form" @submit.prevent="submitEmail">
    <div class="form-group">
      <div class="form-element form-element--transparent">
        <input v-model="email" type="email" name="email" id="email" required />
        <label class="floating-label" for="email">Indirizzo Email</label>
      </div>
      <input type="submit" value="Inizia >" class="btn btn-primary email-form__button" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions(['updateEmail']),
    submitEmail() {
      this.updateEmail(this.email)
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped lang="scss">
.email-form {
  margin: 0 auto;
  width: 100%;
  min-width: 12rem;
  max-width: 36rem;

  &__button {
    padding: 0.5rem 1.5rem;
    font-size: 24px;
    font-weight: 500;
    margin-left: 5px;

    @media screen and (max-width: 576px) {
      padding: 0.5rem 1rem;
      font-size: 20px;
    }

    @media screen and (max-width: 476px) {
      padding: 0.5rem 1rem;
      font-size: 18px;
    }
  }

  .form-group {
    display: flex;
    flex-direction: row;
    width: 100%;

    .form-element {
      width: 100%;
      margin-bottom: 0;

      input {
        height: 100%;
        margin-right: 10px;
      }

      .floating-label {
        color: white;
      }
    }
  }
}
</style>
