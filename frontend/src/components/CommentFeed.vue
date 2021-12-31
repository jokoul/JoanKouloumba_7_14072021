<template>
  <div class="comments">
    <h4 class="comments__title">{{ counterComment }} Commentaires :</h4>
    <p v-if="comments.length == 0">Pas de commentaire pour l'instant</p>
    <div
      v-else
      class="comments__comment"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <div class="comments__comment__info row">
        <div class="comments__comment__info__author col-sm-9 col-12">
          <img
            class="comments__comment__info__author__img"
            v-if="comment.User.profil"
            :src="comment.User.profil"
            :alt="comment.User.firstname"
          />
          <img
            class="comments__comment__info__author__img"
            v-else
            src="../assets/avatar_default.png"
            :alt="comment.User.firstname"
          />
          <h2 class="comments__comment__info__author__name">
            {{ comment.User.firstname }} {{ comment.User.lastname }}
          </h2>
          <p class="comments__comment__info__author__date">
            {{ formatDate(comment.createdAt, comment.updatedAt) }}
          </p>
        </div>
        <div class="comments__comment__info__buttons col-sm-3 col-12">
          <button
            v-if="comment.user_id == getUser.userId || moderator"
            @click="deleteComment(comment.comment_id)"
            class="btn btn-delete comments__comment__info__buttons__btn"
          >
            <i class="fas fa-trash-alt"></i><i class="far fa-trash-alt"></i>
          </button>
          <button
            v-if="moderator"
            @click="moderateComment(comment.comment_id)"
            class="btn btn-warning comments__comment__info__buttons__btn"
          >
            modérer
          </button>
        </div>
      </div>
      <p class="comments__comment__text">{{ comment.comment_text }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "CommentFeed",
  props: ["post_id", "moderator"],
  data() {
    return {
      comments: [],
      counterComment: 0,
    };
  },
  component: {},
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    formatDate(createDate, updateDate) {
      const date = new Date(updateDate);
      const option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const newDate = date.toLocaleDateString("fr-FR", option);
      if (createDate == updateDate) {
        return `Publié le ${newDate}`;
      } else {
        return `Modifié le ${newDate}`;
      }
    },
    moderateComment(commentId) {
      const user = JSON.parse(localStorage.getItem("user"));
      const instance = axios.create({
        baseURL: "http://localhost:3000/api",
      });
      console.log(this.moderator);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
      instance
        .post(`/comments/${commentId}/moderate`, {
          moderate: this.moderator,
        })
        .then((res) => {
          console.log(res);
          this.$emit("reload");
        })
        .catch((error) => console.log(error));
    },
    deleteComment(commentId) {
      const user = JSON.parse(localStorage.getItem("user"));
      const instance = axios.create({
        baseURL: "http://localhost:3000/api",
      });
      console.log(this.moderator);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
      instance
        .delete(`/comments/${commentId}`)
        .then(() => {
          this.$emit("reload");
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const instance = axios.create({
      baseURL: "http://localhost:3000/api",
    });
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    instance
      .post(`/counters/comment`, {
        post_id: this.post_id,
      })
      .then((res) => {
        this.counterComment = res.data.numberOfComment;
        console.log(res);
      });
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    const instance = axios.create({
      baseURL: "http://localhost:3000/api",
    });
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    instance.get(`/comments/${this.post_id}`).then((res) => {
      this.comments = res.data;
      console.log(res.data);
    });
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
.comments {
  &__comment {
    margin-bottom: 0.5rem;
    &__info {
      //@include flexbox($display: flex, $justify: space-between, $align: center);
      &__author {
        text-align: left;
        &__img {
          object-fit: cover;
          width: 2rem;
          border-radius: 50%;
        }
        &__name {
          display: inline;
          margin-left: 1rem;
          font-size: 1rem;
        }
      }
      &__buttons {
        &__btn {
          margin-left: 0.2rem;
        }
      }
    }
    &__text {
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
}
</style>
