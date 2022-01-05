<template>
  <div>
    <header-comp></header-comp>
    <h1 class="m-2">Profile de {{ profileInfo.firstname }}</h1>
    <div class="card">
      <div class="card__info">
        <img
          v-if="profileInfo.profil"
          class="card__info__img"
          :src="profileInfo.profil"
          :alt="profileInfo.firstname"
        />
        <img
          v-else
          class="card__info__img"
          src="../assets/avatar_default.png"
          alt="default_avatar"
        />
        <p class="card__info__name">
          {{ profileInfo.firstname }} {{ profileInfo.lastname }}
        </p>
        <p class="card__info__email">{{ profileInfo.email }}</p>
      </div>
    </div>
    <div class="last">
      <div class="last__post">
        <h2 class="last__post__title">Ses 10 dernières publications :</h2>
        <article class="card" v-for="(post, index) in posts" :key="index">
          <div class="card__post">
            <h3 class="card__post__text">{{ post.post_text }}</h3>
            <img
              class="card__post__img"
              :src="post.image_url"
              :alt="post.post_text"
            />
          </div>
        </article>
      </div>
      <div class="last__comment">
        <h2 class="last__comment__title">Ses 10 derniers commentaires :</h2>
        <div
          class="comments__comment"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <p class="comments__comment__text card">{{ comment.comment_text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import axios from "../axios";

export default {
  components: { HeaderComp },
  name: "ProfileView",
  data() {
    return {
      userIdProfile: this.$route.params.user_id,
      profileInfo: "",
      posts: [],
      comments: [],
    };
  },
  created() {
    axios
      .get(`/auth/accounts/${this.userIdProfile}`)
      .then((res) => {
        this.profileInfo = res.data.user;
        console.log(res.data.user);
      })
      .catch((error) => console.log(error));
  },
  mounted() {
    axios
      .get(`/posts/${this.userIdProfile}/profile`)
      .then((res) => {
        this.posts = res.data.posts;
        console.log(this.posts);
      })
      .catch((error) => console.log(error));
    axios
      .get(`/comments/${this.userIdProfile}/profile`)
      .then((res) => {
        this.comments = res.data.comments;
        console.log(this.comments);
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
.card {
  width: 85%;
  padding: 0.5rem;
  @media screen and (max-width: 770px) {
    width: 95%;
  }
  border: 0.1rem solid $secondary_color;
  margin: 1rem auto;
  border-radius: 1rem;
  box-shadow: 0 0 2rem $primary_color;
  &__info {
    margin: 0.5rem auto;
    &__img {
      width: 9rem;
      border-radius: 50%;
    }
    &__name {
      margin-top: 0.5rem;
      font-weight: 600;
      font-size: 1.5rem;
      font-family: "Times New Roman", Times, serif;
      font-style: italic;
    }
    &__email {
      font-weight: 600;
      font-size: 1.5rem;
      font-family: "Times New Roman", Times, serif;
    }
  }
  &__post {
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
.last {
  @media screen and (min-width: 770px) {
    @include flexbox($display: flex, $justify: space-around, $align: start);
  }
  &__post {
    @media screen and (min-width: 770px) {
      width: 50%;
    }
    &__title {
      font-size: 1.5rem;
    }
  }
  &__comment {
    @media screen and (min-width: 770px) {
      width: 40%;
    }
    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>
