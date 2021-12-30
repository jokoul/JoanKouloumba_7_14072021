<template>
  <div class="react">
    <div class="react__buttons">
      <button @click="reactLike()" class="btn react__buttons__btn btn-like">
        <i class="fas fa-thumbs-up"></i><i class="far fa-thumbs-up"></i>
      </button>
      <button
        @click="reactDislike()"
        class="btn react__buttons__btn btn-dislike"
      >
        <i class="fas fa-thumbs-down"></i><i class="far fa-thumbs-down"></i>
      </button>
    </div>
    <form class="react__form" @submit.prevent="reactComment()">
      <textarea
        v-model="newComment"
        class="textarea"
        maxlength="300"
        rows="3"
        placeholder="Commenter la publication"
      ></textarea>
      <button class="btn btn-submit" type="submit">Commenter</button>
      <button class="btn btn-cancel" type="reset">Annuler</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ReactFeed",
  props: ["post_id"],
  data() {
    return {
      newComment: "",
      like: 0,
      IsLiked: false,
      IsDisliked: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    reactComment() {
      const user = JSON.parse(localStorage.getItem("user"));
      const instance = axios.create({
        baseURL: "http://localhost:3000/api",
      });
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
      instance
        .post(`/comments/${this.post_id}`, {
          comment_text: this.newComment,
          user_id: this.getUser.userId,
        })
        .then((res) => {
          console.log(res);
          this.$emit("reload");
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
.react {
  padding: 0.5rem;
  margin: 0.5rem;
  &__buttons {
    &__btn {
      font-size: 1.3rem;
    }
  }
  &__form {
    & .textarea {
      width: 90%;
      margin: 0.5rem auto;
      display: block;
    }
    & .btn-submit {
      background-color: $tertiary_color;
      color: white;
    }
    & .btn-cancel {
      background-color: $secondary_color;
      color: white;
      margin-left: 0.2rem;
    }
  }
}
</style>
