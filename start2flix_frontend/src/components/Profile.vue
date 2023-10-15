<template>
  <router-link class="profile" @click="$emit('select-profile', profile)">
    <div class="profile__image-container">
      <img
        :src="getImagePath(profile.image)"
        :alt="`Avatar di ${profile.nome}`"
        class="profile__image"
      />
    </div>
    <span class="profile__name">{{ profile.nome }}</span>
  </router-link>
</template>

<script>
export default {
  props: ['profile'],
  methods: {
    getImagePath(id) {
      return `/avatar${id}.jpeg`
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;

  text-decoration: none;

  &__image-container {
    width: 200px;
    height: 200px;
    background-color: #f9f9f9;
    padding: 0.25rem;
    margin-bottom: 0.75rem;
    border-radius: 4px;
  }

  &__image {
    max-width: 100%;
    border-radius: 4px;
  }

  &__name {
    font-size: 24px;
    color: gray;
  }

  &:hover {
    .profile__image-container {
      outline: 2px solid grey;
      border-radius: 4px;
    }

    .profile__name {
      color: white;
    }
  }
}
</style>
