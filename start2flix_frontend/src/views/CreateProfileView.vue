<template>
  <div class="create-profile">
    <div class="create-profile__header">
      <h1 class="create-profile__title">Aggiungi un profilo</h1>
      <div class="create-profile__description">
        Aggiungi un profilo per una persona che guardeà Start2Flix
      </div>
    </div>
    <div class="create-profile__body">
      <form @submit.prevent="handleSubmit" class="signup__form">
        <div class="row gx-3 gy-3">
          <div class="col-12">
            <div class="form-element">
              <input v-model="name" type="text" name="firstName" id="firstName" required />
              <label class="floating-label" for="firstName">Nome</label>
            </div>
          </div>
          <div class="col-12">
            <span v-if="submitErrors" class="form-element__error"> Inserisci un nome valido </span>
          </div>
          <div class="col-12">
            <div class="form-element">
              <label for="selectImage" class="form-label">Seleziona un'immagine: </label>
              <div class="select-image">
                <img
                  @click="selectProfileImage(index)"
                  v-for="index in 5"
                  :key="index"
                  :src="$helpers.getImagePath(index)"
                  :class="[
                    'select-image__image',
                    {
                      'select-image__image--active': image == index
                    }
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="create-profile__footer">
      <button
        :disabled="!isValid"
        :class="['btn', isValid ? 'btn-primary' : 'btn-light']"
        @click="submitForm"
      >
        Crea
      </button>
      <button class="btn btn-outline-secondary" @click.prevent="backHome">Annulla</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      utenteId: null,
      name: '',
      image: 0,
      submitErrors: false
    }
  },
  beforeMount() {
    this.utenteId = this.$store.getters.user
  },
  computed: {
    isValid() {
      if (this.name.trim() !== '' && this.image > 0 && this.image < 6) {
        return true
      }
      return false
    }
  },
  methods: {
    selectProfileImage(index) {
      this.image = index
    },
    submitForm() {
      if (this.isValid) {
        const formData = new FormData()
        formData.append('utenteId', this.utenteId)
        formData.append('nome', this.name)
        formData.append('image', this.image)

        this.$store.dispatch('addProfile', formData)
        this.$store.dispatch('getProfiles')

        this.$router.push({ name: 'homepage' })
      } else {
        this.submitErrors = true
      }
    },
    backHome() {
      this.$router.push({ name: 'homepage' })
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

  &__footer {
    display: flex;
    column-gap: 1rem;

    @media screen and (max-width: 420px) {
      justify-content: center;
    }
  }
}
</style>
