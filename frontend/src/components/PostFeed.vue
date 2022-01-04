<template>
  <div>
    <article v-if="posts.length == 0">
      <p>Aucune publication à afficher pour l'instant</p>
    </article>
    <article
      v-else
      class="card"
      v-for="(post, index) in posts"
      v-bind:key="index"
    >
      <div class="card__post">
        <div class="card__post__info">
          <div class="card__post__info__author">
            <img
              class="card__post__info__author__img"
              v-if="post.User.profil"
              :src="post.User.profil"
              :alt="post.User.firstname"
            />
            <img
              class="card__post__info__author__img"
              v-else
              src="../assets/avatar_default.png"
              :alt="post.User.firstname"
            />
            <h2 class="card__post__info__author__name">
              {{ post.User.firstname }} {{ post.User.lastname }}
            </h2>
            <p class="card__post__info__author__date">
              {{ formatDate(post.createdAt, post.updatedAt) }}
            </p>
          </div>
          <div class="card__post__info__buttons">
            <router-link
              v-if="post.user_id == getUser.userId || moderator"
              :to="`/edit/${post.post_id}`"
              class="btn btn-primary card__post__info__buttons__btn"
            >
              Éditer
            </router-link>
            <button
              v-if="post.user_id == getUser.userId || moderator"
              class="btn btn-delete card__post__info__buttons__btn"
              v-on:click="modalDelete(post.post_id)"
            >
              Supprimer
            </button>
            <button
              v-if="moderator"
              v-on:click="moderatePost(post.post_id)"
              class="btn btn-warning card__post__info__buttons__btn"
            >
              Modérer
            </button>
          </div>
        </div>
        <h3 class="card__post__text">{{ post.post_text }}</h3>
        <img
          class="card__post__img"
          :src="post.image_url"
          :alt="post.post_text"
        />
      </div>
      <div class="card__react">
        <react-feed
          :post_id="post.post_id"
          @reload="reRenderComp++"
          :key="reRenderComp"
        ></react-feed>
      </div>
      <div class="card__comments">
        <comment-feed
          :post_id="post.post_id"
          v-bind:moderator="moderator"
          @reload="reRenderComp++"
          :key="reRenderComp"
        ></comment-feed>
      </div>
    </article>
    <modal-post-delete
      v-if="modalActive"
      @delete="postDelete(deletePostId)"
      @close="modalActive = false"
    ></modal-post-delete>
  </div>
</template>

<script>
import axios from "../axios.js";
import CommentFeed from "./CommentFeed.vue";
import { mapGetters } from "vuex";
import ModalPostDelete from "./ModalPostDelete.vue";
import ReactFeed from "./ReactFeed.vue";

export default {
  name: "PostFeed",
  components: {
    CommentFeed,
    ModalPostDelete,
    ReactFeed,
  },
  data() {
    return {
      posts: [],
      moderator: false,
      deletePostId: "",
      modalActive: false,
      reRenderComp: 0,
    };
  },
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
    modalDelete(postId) {
      this.modalActive = true;
      this.deletePostId = postId;
      console.log(this.modalActive);
      console.log(this.deletePostId);
    },
    postDelete(postId) {
      axios
        .delete(`/posts/${postId}`)
        .then((res) => {
          console.log(res);
          this.reRenderComp++;
          this.$emit("reload", this.reRenderComp);
        })
        .catch((error) => console.log(error));
    },
    moderatePost(postId) {
      axios
        .post(`/posts/${postId}/moderate`, {
          moderate: this.moderator,
        })
        .then((res) => {
          console.log(res);
          this.reRenderComp++;
          this.$emit("reload", this.reRenderComp);
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get(`/posts/`)
      .then((res) => {
        this.posts = res.data;
        console.log(this.posts);
      })
      .catch((error) => console.log(error));
    //On vérifie si l'ID utilisateur est dans la table modérateur
    axios
      .get(`/auth/moderator/${this.getUser.userId}`)
      .then((res) => {
        this.moderator = res.data.moderator;
        console.log(res.data);
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
@keyframes nope {
  0% {
    margin-right: 0.5rem;
  }
  25% {
    margin-right: 0.1rem;
    margin-left: 0.9rem;
  }
  75% {
    margin-right: 0.9rem;
    margin-left: 0.1rem;
  }
  100% {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
}
@keyframes yep {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(0.5rem);
  }
  75% {
    transform: translateY(-0.5rem);
  }
  100% {
    transform: translateY(0);
  }
}
.card {
  margin: 1rem auto;
  padding: 0.2rem;
  width: 80%;
  box-shadow: 0 0 2rem grey;
  &__post {
    &__info {
      @media screen and (min-width: 770px) {
        @include flexbox(
          $display: flex,
          $justify: space-between,
          $align: center
        );
      }
      &__author {
        text-align: left;
        &__img {
          object-fit: cover;
          width: 3rem;
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
          margin: 0.5rem;
        }
      }
    }
    &__text {
      width: 90%;
      margin: 0.5rem auto;
      font-weight: 700;
      font-size: 1.5rem;
      font-style: oblique;
    }
    &__img {
      object-fit: cover;
      width: 70%;
      margin: 0.5rem auto;
      border-radius: 1rem;
    }
  }
}
.btn-delete {
  background-color: $secondary_color;
  color: white;
  &:hover {
    animation: nope 0.5s ease-in-out both;
  }
}
.btn-primary:hover {
  animation: yep 0.5s ease-in-out forwards;
}
</style>
