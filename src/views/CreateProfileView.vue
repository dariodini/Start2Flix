<template>
  <div class="create-profile">
    <div class="create-profile__header">
      <h1 class="create-profile__title">Add a profile</h1>
      <div class="create-profile__description">
        Add a profile for a person who will watch Start2Flix
      </div>
    </div>
    <div class="create-profile__body">
      <div class="create-profile__image">
        <img src="../assets/avatar1.jpeg" />
      </div>
      <form class="create-profile__form" ref="form" @submit.prevent>
        <div class="form-element">
          <input v-model="inputValue" type="text" name="name" id="name" required />
          <label class="floating-label" for="name">Name</label>
        </div>
      </form>
    </div>
    <div class="create-profile__footer">
      <button
        :disabled="!isValid"
        :class="['btn', isValid ? 'btn-primary' : 'btn-light']"
        @click="submitForm"
      >
        Create
      </button>
      <button class="btn btn-outline-secondary" @click.prevent="previousPage">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  computed: {
    isValid() {
      return this.inputValue.trim() !== ''
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.submit()
    },
    previousPage() {
      if (this.$router.back()) return this.$router.back()
      else return this.$router.push({ name: 'homepage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.create-profile {
  width: 50%;
  max-width: 750px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 75%;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }

  @media screen and (max-width: 420px) {
    text-align: center;
  }

  &__title {
    color: white;
    font-size: 2.5rem;
  }

  &__description {
    color: #666;
    font-size: 1.25rem;
  }

  &__body {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1rem;

    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    padding: 1.5rem 0;
    margin: 1rem 0 2rem 0;

    @media screen and (max-width: 420px) {
      flex-direction: column;
      row-gap: 1rem;
    }
  }

  &__image {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__form {
    flex-grow: 1;

    .form-element {
      margin-bottom: 0;
    }
  }

  &__footer {
    display: flex;
    column-gap: 1rem;

    @media screen and (max-width: 420px) {
      justify-content: center;
    }
  }
}
</style>
