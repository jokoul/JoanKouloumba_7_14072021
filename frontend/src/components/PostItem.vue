<template>
  <!--<div>TEST</div>-->
  <div class="postCreate">
    <img
      v-if="item.imageUrl"
      :src="item.imageUrl"
      alt="imageUpload"
      class="postCreate__uploadImg"
    />
    <div class="postCreate__formRow">
      <!--<p>Bonjour {{ getFirstname }}</p>-->
      <input
        class="postCreate__formRow__input"
        type="text"
        name="postCreate"
        id="postCreate"
        placeholder="Dis moi tout"
      />
    </div>
    <div class="postCreate__formRow">
      <input
        class="postCreate__formRow__input"
        type="file"
        accept="image/*"
        @change="uploadImage"
        id="file"
      />
    </div>
    <div class="postCreate__button">
      <button class="btn postCreate__button__poster col-2 m-1">Publier</button>
      <button class="btn postCreate__button__cancel col-2 m-1">Annuler</button>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
  name: "PostItem",
  props: {},
  computed: {
    //...mapGetters(["getFirstname"]),
  },
  data() {
    return {
      item: {
        image: null,
        imageUrl: null,
      },
    };
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      this.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
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
.postCreate {
  border: 0.2rem solid $secondary_color;
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem $primary_color;
  margin: 1rem auto;
  padding: 0.5rem;
  width: 80%;
  &__uploadImg {
    margin-top: 0.5rem;
    border-radius: 1rem;
    border: 0.2rem solid $tertiary_color;
    width: 40%;
  }
  &__formRow {
    &__input {
      margin: 1rem auto;
      font-size: 1rem;
      @include dimension($width: 70%, $height: 2rem);
    }
    &__input::placeholder {
      font-size: 1rem;
      font-weight: 600;
    }
  }
  &__button {
    @media screen and (max-width: 770px) {
      @include flexbox($display: flex, $justify: center, $align: center);
      flex-direction: column;
    }
    &__poster {
      background-color: $tertiary_color;
      color: white;
      @media screen and (max-width: 770px) {
        padding: 0.1rem;
      }
    }
    &__cancel {
      background-color: $secondary_color;
      color: white;
      @media screen and (max-width: 770px) {
        padding: 0.1rem;
      }
    }
  }
}
</style>
