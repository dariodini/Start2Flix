<template>
  <div v-if="user" class="profiles">
    <h1 class="profiles__title">
      <template v-if="!manageProfile"> Chi vuole guardare StartFlix? </template>
      <template v-else> Gestisci i profili: </template>
    </h1>
    <div class="profiles__list">
      <profile
        @select-profile="selectProfile"
        v-for="profile in profiles"
        :key="profile.id"
        :profile="profile"
        :isEdit="manageProfile"
      ></profile>
    </div>
    <div class="text-center">
      <router-link class="add-profile" :to="{ name: 'create-profile' }">
        <img src="/add-profile.svg" alt="add profile button" />
        <span>Aggiungi profilo</span>
      </router-link>
      <router-link
        v-if="manageProfile"
        :to="{ name: 'homepage' }"
        class="btn btn-sm btn-light"
        id="manage-edit-btn"
        >Fine</router-link
      >
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'

export default {
  components: {
    Profile
  },
  async beforeMount() {
    if (this.user) {
      await this.$store.dispatch('getProfiles')
    }
    this.manageProfile = this.$route.meta.manageProfile
  },
  data() {
    return {
      manageProfile: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    profiles() {
      return this.$store.getters.profiles
    }
  },
  methods: {
    selectProfile(profile) {
      if (!this.manageProfile) {
        this.$store.dispatch('selectProfile', profile)
        this.$router.push('/browse')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profiles {
  padding: 10rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    color: white;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    margin-bottom: 3rem;
  }
  &__list {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 5rem;
    row-gap: 1.5rem;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    @media screen and (max-width: 576px) {
      flex-wrap: wrap;
      column-gap: 3rem;
    }

    @media screen and (max-width: 476px) {
      column-gap: 2rem;
    }
  }
}

.add-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  text-decoration: none;

  padding-top: 3rem;

  img {
    width: 50px;
  }

  span {
    position: relative;
    color: grey;

    &::after {
      content: '';
      width: 100%;
      border-bottom: 1px solid grey;
      position: absolute;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
  }

  &:hover {
    span:after {
      opacity: 1;
    }
  }
}

#manage-edit-btn {
  font-size: 1.25rem;
  padding: 0.25rem 2rem;
  margin-top: 3rem;

  @media screen and (max-width: 576px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 476px) {
    font-size: 1rem;
  }
}
</style>
