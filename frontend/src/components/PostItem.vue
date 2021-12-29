<template>
  <!--<div>TEST</div>-->
  <form class="postCreate" v-on:submit.prevent="createPost()">
    <img
      v-if="item.imageUrl"
      :src="item.imageUrl"
      alt="imageUpload"
      class="postCreate__uploadImg"
    />
    <div class="postCreate__formRow">
      <input
        v-model="post_text"
        class="postCreate__formRow__input"
        type="text"
        name="postCreate"
        id="postCreate"
        placeholder="Dis moi tout"
        autofocus
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
      <input
        type="submit"
        class="btn postCreate__button__poster col-2 m-1"
        value="Publier"
      />
      <input
        class="btn postCreate__button__cancel col-2 m-1"
        type="reset"
        value="Annuler"
        @click="eraseImg()"
      />
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "PostItem",
  props: {},
  computed: {},
  data() {
    return {
      post_text: "",
      reRenderComp: 0,
      item: {
        image: null,
        imageUrl: null,
      },
      userId: this.$store.state.user.userId,
      token: this.$store.state.user.token,
    };
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      this.item.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
    },
    eraseImg() {
      //On reset la clé imageUrl afin d'enlever l'image dans le postCreate
      this.item.imageUrl = null;
    },
    createPost() {
      //L'interface FormData permet de construire un ensemble de paires clé/valeur représentant les champs du formulaire et leurs valeurs, qui peuvent ensuite être facilement envoyées en utilisant la méthode XMLHttpRequest.send()
      const formData = new FormData();
      const file = this.item.image;

      formData.append("image_url", file, file.name);
      formData.append("post_text", this.post_text);
      formData.append("user_id", this.userId);

      const instance = axios.create({
        baseURL: "http://localhost:3000/api",
      });
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.token}`;
      instance
        .post("/posts/", formData)
        .then((res) => {
          console.log(res);
          this.reRenderComp++;
          this.$emit("reload", this.reRenderComp);
        })
        .catch((error) => console.log(error));
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
  margin: 1.5rem auto;
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
      margin: 0.5rem auto;
      font-size: 1rem;
      min-width: 9rem;
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
        min-width: 4rem;
      }
    }
    &__cancel {
      background-color: $secondary_color;
      color: white;
      @media screen and (max-width: 770px) {
        padding: 0.1rem;
        min-width: 4rem;
      }
    }
  }
}
</style>
