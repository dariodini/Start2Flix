<template>
  <div class="landing-container">
    <div class="hero">
      <h1 class="hero__title">Film, serie TV e tanto altro, senza limiti</h1>
      <h2 class="hero__subtitle">Guarda ciò che vuoi ovunque. Disdici quando vuoi.</h2>
      <h3 class="hero__description">
        Vuoi guardare StartFlix? Inserisci l'indirizzo email per abbonarti.
      </h3>
    </div>
    <email-form></email-form>
  </div>
</template>

<script>
import EmailForm from '../components/EmailForm.vue'
export default {
  components: {
    EmailForm
  }
}
</script>

<style scoped lang="scss">
.landing-container {
  padding: 10rem 0;

  @media screen and (max-width: 576px) {
    padding: 5rem 0;
  }
}
.hero {
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  &__title {
    font-size: 3rem;
    font-weight: 900;

    @media screen and (max-width: 476px) {
      font-size: 2.75rem;
    }
  }
  &__subtitle {
    font-size: 1.5rem;
    font-weight: 400;

    @media screen and (max-width: 476px) {
      font-size: 1.25rem;
    }
  }
  &__description {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.875;

    @media screen and (max-width: 476px) {
      font-size: 1rem;
    }
  }
}
</style>
