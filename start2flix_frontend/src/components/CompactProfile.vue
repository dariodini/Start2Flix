<template>
  <button type="button" :class="['btn', 'compact-profile', { 'compact-profile--lg': isLg }]">
    <img :src="$helpers.getImagePath(profile.image)" class="compact-profile__image" />
    <div class="compact-profile__content">
      <span v-if="!noName" class="compact-profile__name">
        {{ profile.nome }}
      </span>
      <a v-if="isLg" href="#" class="compact-profile__edit btn btn-sm btn-secondary">Modifica</a>
    </div>
  </button>
</template>

<script>
export default {
  props: ['profile', 'noName', 'isLg'],
  computed: {
    hideHeader() {
      return this.$route.meta.hideHeader
    }
  }
}
</script>

<style lang="scss" scoped>
.compact-profile {
  $self: &;
  display: flex;
  flex-direction: row;
  align-items: center;

  &__image {
    border-radius: 3px;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0.5rem;
  }

  &__name {
    color: white;
  }

  &--lg {
    #{$self}__image {
      width: 65px;
      height: 65px;
    }
  }
}
</style>
