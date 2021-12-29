<template>
  <div>
    <header-comp></header-comp>
    <h1 class="title">Editer ma publication</h1>
    <article class="card">
      <div class="card__post">
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
        <p class="card__post__title">{{ post.post_text }}</p>
        <img
          class="card__post__img"
          :src="post.image_url"
          v-bind:alt="post.post_text"
        />
      </div>
      <div class="form card__form">
        <div class="card__form__group">
          <label class="card__form__group__label" for="modifyPost"
            >Modifier le texte de ma publication :</label
          >
          <textarea
            v-model="newPostText"
            class="card__form__group__text"
            placeholder="Quoi de neuf ?"
          ></textarea>
        </div>
        <div class="card__form__buttons">
          <button
            @click="modifyPost()"
            class="btn-submit btn btn-info"
            :disabled="Isdisabled"
          >
            <i class="fas fa-pencil-alt prefix"></i> modifier
          </button>
          <button class="btn btn-cancel" type="reset">Annuler</button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import HeaderComp from "../components/HeaderComp.vue";
export default {
  name: "OneView",
  components: {
    HeaderComp,
  },
  data() {
    return {
      post_id: this.$route.params.post_id,
      post: {},
      newPostText: "",
    };
  },
  computed: {
    Isdisabled() {
      if (!this.newPostText == "") {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    const instance = axios.create({
      baseURL: "http://localhost:3000/api",
    });
    instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    instance
      .get(`/posts/${this.post_id}`)
      .then((res) => {
        this.post = res.data;
        console.log(res.data);
      })
      .catch((error) => console.log(error));
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
    modifyPost() {
      const self = this;
      const user = JSON.parse(localStorage.getItem("user"));
      const instance = axios.create({
        baseURL: "http://localhost:3000/api",
      });
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
      instance
        .put(`/posts/${this.post_id}`, { post_text: this.newPostText })
        .then((res) => {
          console.log(res);
          self.$router.push("/home");
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
.title {
  margin: 1rem auto;
}
.card {
  width: 80%;
  margin: 1rem auto;
  &__post {
    padding: 0.2rem;
    &__info {
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
    }
    &__title {
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
  &__form {
    &__group {
      &__label {
        font-weight: 600;
      }
      &__text {
        display: block;
        @include dimension($width: 80%, $height: 4rem);
        margin: 1rem auto;
        border-radius: 0.5rem;
      }
    }
    &__buttons {
      margin-bottom: 0.5rem;
      & .btn-cancel {
        background-color: $secondary_color;
        color: white;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
