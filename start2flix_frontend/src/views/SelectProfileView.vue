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
    <div v-if="manageProfile" class="text-center">
      <router-link :to="{ name: 'homepage' }" class="btn btn-sm btn-light" id="manage-edit-btn"
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
