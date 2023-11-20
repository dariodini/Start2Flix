<template>
  <div></div>
</template>

<script>
export default {
  async beforeMount() {
    await this.$store.dispatch('getSelectedProfile', this.profileId).then((profile) => {
      this.profile = profile
    })
  },
  data() {
    return {
      profile: null
    }
  },
  computed: {
    profileId() {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped></style>
