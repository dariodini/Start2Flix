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
        <div class="header-action-nav">
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
            <img
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSearchForm"
              aria-expanded="false"
              aria-controls="collapseSearchForm"
              src="../assets/search-logo.svg"
              alt=""
            />
            <form class="collapse collapse-horizontal ms-3" id="collapseSearchForm" @submit.prevent>
              <div class="input-group" ref="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="insertedName"
                  placeholder="Movies or series"
                  @input="handleInput"
                  v-model="insertedName"
                />
              </div>
            </form>
          </div>

          <div v-if="user && selectedProfile" class="header__dropdown">
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
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item edit" type="button">
                  <img src="../assets/account-logo.svg" alt="account-logo" />Account
                </button>
              </li>
              <li>
                <button class="dropdown-item edit" type="button">
                  <img src="../assets/edit-logo.svg" alt="edit-logo" />Manage profile
                </button>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item justify-content-center" type="button" to="/">
                  Logout
                </router-link>
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
      insertedName: ''
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
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 5;

  height: 90px;
  margin-bottom: 2rem;
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

    &--sm {
      width: auto;
      height: 50px;
    }
  }

  &__actions {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__dropdown {
    .dropdown-toggle {
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
