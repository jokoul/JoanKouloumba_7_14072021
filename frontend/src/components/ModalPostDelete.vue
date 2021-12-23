<template>
  <div class="modalContainer">
    <div class="modalContainer__overlay" v-on:click="closeModal"></div>
    <div class="modalContainer__info">
      <h1 class="modalContainer__info__title">Confirmation de suppression</h1>
      <p class="modalContainer__info__text">
        Voulez-vous vraiment supprimer ce post?
      </p>
      <div class="modalContainer__info__buttons">
        <button
          @click="deletePost"
          class="modalContainer__info__buttons__btn btn btn-delete"
        >
          oui
        </button>
        <button
          @click="closeModal"
          class="modalContainer__info__buttons__btn btn btn-primary"
        >
          non
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalPostDelete",
  methods: {
    //on crée 2 événements spécifique qui vont déclencher la suppression du post ou la fermeture du modal
    deletePost() {
      this.$emit("delete");
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
$primary_color: #ffd7d7;
$secondary_color: #fd2d01;
$tertiary_color: #013a01;
$tertiary_color--clear: #b9fdb9ed;
@mixin dimension($width, $height) {
  width: $width;
  height: $height;
}
@mixin flexbox($display, $justify, $align) {
  display: $display;
  justify-content: $justify;
  align-items: $align;
}
.modalContainer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(110, 106, 106, 0.493);
  @include dimension($width: 100%, $height: 100%);
  @include flexbox($display: flex, $justify: center, $align: center);
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    @include dimension($width: 100%, $height: 100%);
  }
  &__info {
    background-color: white;
    padding: 5rem;
    border-radius: 1rem;
    z-index: 3;
    &__title {
      font-size: 1.5rem;
    }
    &__text {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
}
.btn-delete {
  background-color: $secondary_color;
  color: white;
  margin-right: 0.2rem;
}
</style>
