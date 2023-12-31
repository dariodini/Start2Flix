<template>
  <header class="header" v-if="!hideHeader">
    <div class="start-container">
      <router-link to="/">
        <img
          src="../assets/logo.png"
          alt="logo"
          :class="['header__logo', { 'header__logo--sm': isLogoSmall }]"
        />
      </router-link>
      <div class="header__actions">
        <div v-if="user && selectedProfile" class="header-action-nav">
          <router-link :to="{ name: 'homepage' }" class="header-action-nav__link">
            Home
          </router-link>
          <router-link :to="{ name: 'my-list' }" class="header-action-nav__link">
            La mia lista
          </router-link>
        </div>
        <div class="header-action-nav">
          <router-link
            v-if="showLoginButton"
            to="/login"
            class="btn btn-primary header-action-nav__link"
          >
            Accedi
          </router-link>

          <div v-if="showForm" class="form-container">
            <img type="button" src="../assets/search-logo.svg" alt="" @click="toggleForm" />
            <form
              :class="['collapse', 'collapse-horizontal', 'ms-3', { show: showToggleForm }]"
              id="collapseSearchForm"
              ref="form"
              @submit.prevent
            >
              <div class="input-group" ref="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="insertedName"
                  placeholder="Inserisci titolo"
                  @input="handleInput"
                  v-model="insertedName"
                />
              </div>
            </form>
          </div>

          <div
            v-if="user && selectedProfile && !showToggleForm"
            ref="selettoreProfili"
            class="header__dropdown"
          >
            <CompactProfile
              @change-profile="changeProfile"
              :profile="selectedProfile"
              :noName="true"
              class="btn dropdown-toggle"
              data-bs-toggle="dropdown"
            />

            <ul class="dropdown-menu dropdown-menu-end mt-3">
              <li v-for="profile in otherProfiles" :key="profile">
                <CompactProfile
                  @click="changeProfile(profile)"
                  :profile="profile"
                  class="dropdown-item"
                />
              </li>
              <li v-if="otherProfiles.length"><hr class="dropdown-divider" /></li>
              <li>
                <router-link
                  :to="{ name: 'manage-account' }"
                  class="dropdown-item edit"
                  type="button"
                >
                  <img src="../assets/account-logo.svg" alt="account-logo" />Account
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'manage-profiles' }"
                  class="dropdown-item edit"
                  type="button"
                >
                  <img src="../assets/edit-logo.svg" alt="edit-logo" />Manage profile
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <span
                  @click="logoutUser"
                  class="dropdown-item justify-content-center"
                  type="button"
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CompactProfile from './CompactProfile.vue'

export default {
  components: { CompactProfile },
  data() {
    return {
      insertedName: '',
      showToggleForm: false
    }
  },
  computed: {
    hideHeader() {
      return this.$route.meta.hideHeader
    },
    showLoginButton() {
      return this.$route.meta.showLoginButton
    },
    user() {
      return this.$store.getters.user
    },
    selectedProfile() {
      if (this.user && !this.hideHeader) {
        return this.$store.getters.profile
      }
      return null
    },
    profiles() {
      if (this.user && !this.hideHeader) {
        return this.$store.getters.profiles
      }
      return null
    },
    otherProfiles() {
      if (this.user && this.selectedProfile && !this.hideHeader) {
        return this.profiles.filter((profile) => profile.id !== this.selectedProfile.id)
      }
      return null
    },
    showForm() {
      return this.$route.meta.showForm
    },
    showProfiles() {
      return this.$route.meta.showProfiles
    },
    isLogoSmall() {
      return this.$route.meta.logoSmall
    }
  },
  methods: {
    handleInput() {
      this.emitter.emit('filter-products', this.insertedName)
    },
    changeProfile(profile) {
      this.$store.dispatch('selectProfile', profile)
      this.$router.go()
    },
    logoutUser() {
      this.$store.dispatch('logoutUser')
      location.reload()
    },
    toggleForm() {
      this.showToggleForm = !this.showToggleForm
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 5;

  height: 75px;
  margin-bottom: 2rem;
  background-color: rgb(20, 20, 20);
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent);

  .start-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 200px;
    margin-right: 3rem;

    @media screen and (max-width: 576px) {
      margin-right: 1rem;
      width: 175px;
    }

    &--sm {
      width: 150px;
      height: 50px;

      @media screen and (max-width: 576px) {
        width: 100px;
        height: auto;
      }

      @media screen and (max-width: 476px) {
        width: 75px;
        height: auto;
      }
    }
  }

  &__actions {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > :only-child {
      flex: 1;
      justify-content: flex-end;
    }
  }

  .form-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    margin-right: -2rem;

    @media screen and (max-width: 576px) {
      margin-right: -1rem;
    }

    @media screen and (max-width: 476px) {
      margin-right: 0;
    }

    img {
      @media screen and (max-width: 476px) {
        width: 17px;
      }
    }
  }

  &__dropdown {
    .dropdown-toggle {
      @media screen and (max-width: 476px) {
        padding: 0;
      }

      &::after {
        border-top: 0.4em solid white;
        border-right: 0.4em solid transparent;
        border-left: 0.4em solid transparent;
      }
    }
    .dropdown-item {
      display: flex;
      align-items: center;

      img {
        margin-right: 0.75rem;
      }

      &:hover {
        text-decoration: underline;
      }

      &.edit {
        img {
          margin-left: 5px;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
</style>
