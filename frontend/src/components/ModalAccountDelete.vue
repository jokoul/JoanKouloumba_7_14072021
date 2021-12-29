<template>
  <div class="modalContainer">
    <div class="modalContainer__overlay" @click="cancelOperation()"></div>
    <div class="modalContainer__block">
      <h1 class="modalContainer__block__title">
        Confirmation de suppression de compte
      </h1>
      <p class="modalContainer__block__text">
        Voulez-vous vraiment supprimer votre compte utilisateur ?
      </p>
      <p class="modalContainer__block__text">
        Toutes vos publications et commentaires seront supprimés et vous serez
        déconnecté automatiquement.
      </p>
      <div class="modalContainer__block__buttons">
        <button class="btn btn-delete" v-on:click="deleteAccount()">Oui</button>
        <button class="btn btn-primary" v-on:click="cancelOperation()">
          Non
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalAccountDelete",
  methods: {
    deleteAccount() {
      this.$emit("delete");
    },
    cancelOperation() {
      this.$emit("cancel");
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
  @include dimension($width: 100%, $height: 100%);
  background-color: rgba(54, 52, 52, 0.514);
  @include flexbox($display: flex, $justify: center, $align: center);
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    @include dimension($width: 100%, $height: 100%);
  }
  &__block {
    width: 70%;
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    z-index: 3;
    &__title {
      font-size: 1.7rem;
      font-weight: 700;
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
