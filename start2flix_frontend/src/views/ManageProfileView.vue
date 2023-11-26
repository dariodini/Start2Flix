<template>
  <div class="manage-account row">
    <div class="col-md-10 m-auto">
      <h1 class="manage-account__title">Modifica il profilo</h1>
      <index-content v-if="profile">
        <template #index>
          <img
            :src="$helpers.getImagePath(profile.image)"
            :alt="`Avatar di ${profile.nome}`"
            class="profile__image"
          />
        </template>
        <form @submit.prevent="handleSubmit" class="signup__form">
          <div class="row gx-3 gy-3">
            <div class="col-12">
              <div class="form-element">
                <input
                  v-model="profile.nome"
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                />
                <label class="floating-label" for="firstName">Nome</label>
              </div>
            </div>
            <div class="col-12">
              <span v-if="submitErrors" class="form-element__error">
                Inserisci un nome valido
              </span>
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
                        'select-image__image--active': selectedImage == index
                      }
                    ]"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 text-end">
              <button class="btn btn-primary signup__button">
                Aggiorna informazioni del profilo
              </button>
            </div>
          </div>
        </form>
      </index-content>
    </div>
  </div>
</template>

<script>
import IndexContent from '../components/IndexContent.vue'

export default {
  components: { IndexContent },
  async beforeMount() {
    await this.$store.dispatch('getSelectedProfile', this.profileId).then((profile) => {
      this.profile = profile
    })
  },
  data() {
    return {
      profile: null,
      submitErrors: false
    }
  },
  computed: {
    profileId() {
      return this.$route.params.id
    },
    selectedImage() {
      return this.profile.image
    }
  },
  methods: {
    handleSubmit() {
      if (this.profile.nome.trim() !== '') {
        this.submitErrors = false
        this.$store.dispatch('updateProfile', this.profile).catch((error) => {
          console.log('error', error)
        })
        this.$store.dispatch('refreshProfiles', this.profile)
        this.$router.push({ name: 'homepage' })
      } else {
        this.submitErrors = true
      }
    },
    selectProfileImage(index) {
      this.profile.image = index
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-account {
  padding-top: 10rem;

  img {
    border-radius: 6px;
    width: 100%;
  }
}

.select-image {
  --column-gap: 1rem;

  display: flex;
  flex-direction: row;
  column-gap: var(--column-gap);
  max-width: 100%;
  justify-content: space-between;

  &__image {
    max-width: calc(20% - var(--column-gap));
    cursor: pointer;

    &--active {
      outline: 2px solid white;
    }
  }
}
</style>
