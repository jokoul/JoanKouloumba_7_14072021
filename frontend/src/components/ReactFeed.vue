<template>
  <div class="react">
    <div class="react__buttons">
      <button
        @click="reactLike()"
        class="btn react__buttons__btn btn-like"
        v-bind:class="{ userLike: IsLiked }"
        :disabled="likeActive"
      >
        <i class="far fa-thumbs-up"></i> <span> {{ counterLike }}</span>
      </button>
      <button
        @click="reactDislike()"
        class="btn react__buttons__btn btn-dislike"
        v-bind:class="{ userDislike: IsDisliked }"
        :disabled="dislikeActive"
      >
        <i class="far fa-thumbs-down"></i> <span> {{ counterDislike }}</span>
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
import axios from "../axios.js";
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
      likeActive: false,
      dislikeActive: false,
      counterLike: 0,
      counterDislike: 0,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    reactComment() {
      axios
        .post(`/comments/${this.post_id}`, {
          comment_text: this.newComment,
          //user_id: this.getUser.userId,
        })
        .then((res) => {
          console.log(res);
          this.$emit("reload");
        })
        .catch((error) => console.log(error));
    },
    reactLike() {
      if (this.IsLiked == false) {
        this.IsLiked = true;
        this.like = 1;
        this.dislikeActive = true;
        axios
          .post(`/posts/${this.post_id}/like`, {
            like: this.like,
            //user_id: this.getUser.userId,
          })
          .then((res) => {
            this.$emit("reload");
            console.log(res);
          })
          .catch((error) => console.log(error));
      } else {
        this.IsLiked = false;
        this.like = 0;
        this.dislikeActive = false;
        axios
          .post(`/posts/${this.post_id}/like`, {
            like: this.like,
            //user_id: this.getUser.userId,
          })
          .then((res) => {
            this.$emit("reload");
            console.log(res);
          })
          .catch((error) => console.log(error));
      }
    },
    reactDislike() {
      if (this.IsDisliked == false) {
        this.IsDisliked = true;
        this.like = -1;
        this.likeActive = true;
        axios
          .post(`/posts/${this.post_id}/like`, {
            like: this.like,
            //user_id: this.getUser.userId,
          })
          .then((res) => {
            this.$emit("reload");
            console.log(res);
          })
          .catch((error) => console.log(error));
      } else {
        this.IsDisliked = false;
        this.like = 0;
        this.likeActive = false;
        axios
          .post(`/posts/${this.post_id}/like`, {
            like: this.like,
            //user_id: this.getUser.userId,
          })
          .then((res) => {
            this.$emit("reload");
            console.log(res);
          })
          .catch((error) => console.log(error));
      }
    },
  },
  mounted() {
    axios
      .post(`/counters/like`, {
        post_id: this.post_id,
        //user_id: this.getUser.userId,
      })
      .then((res) => {
        if (res.data.userLike) {
          this.dislikeActive = true;
        }
        this.IsLiked = res.data.userLike;
        this.counterLike = res.data.numberOfLike;
        console.log(res);
      })
      .catch((error) => console.log(error));
    axios
      .post(`/counters/dislike`, {
        post_id: this.post_id,
        //user_id: this.getUser.userId,
      })
      .then((res) => {
        if (res.data.userDislike) {
          this.likeActive = true;
        }
        this.IsDisliked = res.data.userDislike;
        this.counterDislike = res.data.numberOfDislike;
        console.log(res);
      })
      .catch((error) => console.log(error));
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
    & .btn-like {
      margin-right: 1rem;
    }
    & .btn-dislike {
      margin-left: 1rem;
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
      margin-top: 0.5rem;
      color: white;
      transition: transform 0.3s;
    }
    & .btn-submit:hover {
      transform: scale(1.1);
    }
    & .btn-cancel {
      background-color: $secondary_color;
      color: white;
      margin-left: 0.5rem;
      margin-top: 0.5rem;
      transition: transform 0.3s;
    }
    & .btn-cancel:hover {
      transform: scale(1.1);
    }
  }
}
.userLike {
  background-color: greenyellow;
}
.userDislike {
  background-color: orange;
}
</style>
