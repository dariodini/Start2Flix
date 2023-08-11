<template>
  <form action="" class="email-form">
    <div class="form-group">
      <div class="form-element form-element--transparent">
        <input type="email" name="email" id="email" required />
        <label class="floating-label" for="email">Indirizzo Email</label>
      </div>
      <input type="submit" value="Inizia >" class="btn btn-primary email-form__button" />
    </div>
  </form>
</template>

<style scoped lang="scss">
.email-form {
  margin: 0 auto;
  width: 100%;
  min-width: 12rem;
  max-width: 36rem;

  &__button {
    padding: 0.5rem 1.5rem;
    font-size: 24px;
    font-weight: 500;
    margin-left: 5px;
  }

  .form-group {
    display: flex;
    flex-direction: row;
    width: 100%;

    .form-element {
      width: 100%;
      margin-bottom: 0;

      input {
        height: 100%;
        margin-right: 10px;
      }

      .floating-label {
        color: white;
      }
    }
  }
}
</style>
