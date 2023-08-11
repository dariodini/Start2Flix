<template>
  <div class="profiles">
    <h1 class="profiles__title">Chi vuole guardare StartFlix?</h1>
    <div class="profiles__list">
      <profile v-for="profile in profiles" :key="profile" :profile="profile" to="/prova"></profile>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile.vue'

export default {
  components: {
    Profile
  },
  data() {
    return {
      // Per il momento sono statici
      profiles: [
        { img: 'src/assets/avatar1.svg', name: 'Alessio' },
        { img: 'src/assets/avatar2.svg', name: 'Francesco' },
        { img: 'src/assets/avatar3.svg', name: 'Vincenzo' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.profiles {
  padding: 5rem 0;
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
    justify-content: space-between;
  }
}
</style>
