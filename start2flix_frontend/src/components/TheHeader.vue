<template>
  <header class="header" v-if="!hideHeader">
    <div class="start-container">
      <router-link to="/">
        <img src="../assets/logo.png" alt="logo" class="header__logo" />
      </router-link>
      <div class="header__actions">
        <router-link v-if="showLoginButton" to="/login" class="btn btn-primary header__action">
          Accedi
        </router-link>

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

        <div class="header__dropdown">
          <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown">
            <img src="../assets/avatar1.jpeg" />
          </button>
          <ul class="dropdown-menu dropdown-menu-end mt-3">
            <li>
              <button class="dropdown-item" type="button">
                <img src="../assets/avatar2.jpeg" /> Francesco
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <img src="../assets/avatar3.jpeg" /> Luca
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <img src="../assets/avatar4.jpeg" /> Susanna
              </button>
            </li>
            <li>
              <button class="dropdown-item" type="button">
                <img src="../assets/avatar5.jpeg" /> Ugo
              </button>
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
  </header>
</template>

<script>
export default {
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
    }
  },
  methods: {
    handleInput() {
      this.emitter.emit('filter-products', this.insertedName)
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 90px;
  margin-bottom: 2rem;
  .start-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    width: 200px;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__action {
    font-weight: 500;
  }

  &__dropdown {
    button {
      img {
        border-radius: 3px;
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }

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
