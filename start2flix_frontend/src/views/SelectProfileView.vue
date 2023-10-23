<template>
  <div class="profiles">
    <h1 class="profiles__title">Chi vuole guardare StartFlix?</h1>
    <div class="profiles__list">
      <profile
        @select-profile="selectProfile"
        v-for="profile in profiles"
        :key="profile.id"
        :profile="profile"
        to="/browse"
      ></profile>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'

export default {
  components: {
    Profile
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
      const formData = new FormData()
      formData.append('profile', JSON.stringify(profile))
      this.$store.dispatch('selectProfile', {
        profile: profile,
        profileFormData: formData
      })
    }
  },
  async beforeMount() {
    await this.$store.dispatch('getProfiles')
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
    font-size: 4.5rem;
    font-weight: 400;
    margin-bottom: 3rem;
  }
  &__list {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 5rem;
  }
}
</style>
