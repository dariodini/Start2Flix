<template>
  <div class="manage-account">
    <h1 class="manage-account__title">Account</h1>
    <index-content index="Modifica informazioni">
      <form @submit.prevent="handleSubmit" class="signup__form">
        <div class="row gx-3 gy-3">
          <div class="col-md-6">
            <div class="form-element">
              <input v-model="nome" type="text" name="firstName" id="firstName" required />
              <label class="floating-label" for="firstName">Nome</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-element">
              <input v-model="cognome" type="text" name="lastName" id="lastName" required />
              <label class="floating-label" for="lastName">Cognome</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-element">
              <select v-model="sesso" class="form-select">
                <option disabled value="---">Sesso</option>
                <option value="M">Maschio</option>
                <option value="F">Femmina</option>
                <option value="A">Altro</option>
              </select>
              <label class="floating-label" for="sesso">Sesso</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-element">
              <input v-model="telefono" type="number" name="numero" id="numero" required />
              <label class="floating-label" for="numero">Numero</label>
            </div>
          </div>
          <div class="col-12">
            <span v-if="submitErrors" class="form-element__error">
              Valorizza tutti quanti i campi prima!
            </span>
          </div>
          <div class="col-12 text-end">
            <button class="btn btn-primary signup__button">Aggiorna le mie informazioni</button>
          </div>
        </div>
      </form>
    </index-content>

    <index-content index="Modifica i profili">
      <div class="profile-container">
        <compact-profile
          v-for="(profile, index) in profiles"
          :key="index"
          :profile="profile"
          :isLg="true"
        />
      </div>
    </index-content>
  </div>
</template>

<script>
import IndexContent from '../components/IndexContent.vue'
import CompactProfile from '../components/CompactProfile.vue'

export default {
  components: {
    IndexContent,
    CompactProfile
  },
  async beforeMount() {
    await this.$store.dispatch('getProfiles')
    await this.$store.dispatch('getInfo')

    this.nome = this.info.nome
    this.cognome = this.info.cognome
    this.sesso = this.info.sesso
    this.telefono = this.info.telefono
  },
  data() {
    return {
      nome: '',
      cognome: '',
      sesso: '',
      telefono: '',
      submitErrors: false
    }
  },
  computed: {
    profiles() {
      return this.$store.getters.profiles
    },
    info() {
      return this.$store.getters.info
    }
  },
  methods: {
    handleSubmit() {
      this.$store
        .dispatch('updateUserInfo', {
          nome: this.nome,
          cognome: this.cognome,
          sesso: this.sesso,
          telefono: this.telefono
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-account {
  padding: 0 1rem;

  &__title {
    color: white;
    margin-bottom: 1rem;
  }
}

.form-element__error {
  padding-left: 0;
  padding-top: 0;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: start;

  > * {
    padding: 1.5rem 0;
    width: 100%;

    &:active {
      border-color: transparent;
    }

    &:first-child {
      padding-top: 0;
    }

    &:not(:first-child) {
      text-align: left;
      border-top: 1px solid #ccc;
    }
  }
}
</style>
