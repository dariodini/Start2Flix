<template>
  <span :class="['profile', { 'profile--edit': isEdit }]" @click="handleClick">
    <div class="profile__image-container">
      <img
        :src="$helpers.getImagePath(profile.image)"
        :alt="`Avatar di ${profile.nome}`"
        class="profile__image"
      />
      <span class="profile__edit-image">
        <i class="fa-solid fa-pencil" style="color: white"></i>
      </span>
    </div>
    <span class="profile__name">{{ profile.nome }}</span>
  </span>
</template>

<script>
export default {
  props: ['profile', 'isEdit'],
  methods: {
    handleClick() {
      if (!this.isEdit) {
        this.$emit('select-profile', this.profile)
      } else {
        this.$router.push({ name: 'manage-profile', params: { id: this.profile.id } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  $self: &;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;

  text-decoration: none;
  cursor: pointer;

  &__image-container {
    position: relative;

    max-width: 200px;
    max-height: 200px;
    background-color: #f9f9f9;
    padding: 0.25rem;
    margin-bottom: 0.75rem;
    border-radius: 4px;

    @media screen and (max-width: 576px) {
      max-width: 150px;
      max-height: 150px;
    }

    @media screen and (max-width: 476px) {
      max-width: 100px;
      max-height: 100px;
    }
  }

  &__image {
    max-width: 100%;
    border-radius: 4px;
  }

  &__name {
    font-size: 24px;
    color: gray;

    @media screen and (max-width: 576px) {
      font-size: 20px;
    }
  }

  &__edit-image {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-30%, -30%);

    i {
      font-size: 2rem;

      @media screen and (max-width: 576px) {
        font-size: 1.5rem;
      }
    }
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

  &--edit {
    #{$self}__image-container {
      position: relative;

      &::before {
        content: '';

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.35;
      }
    }

    #{$self}__edit-image {
      display: block;
    }
  }
}
</style>
