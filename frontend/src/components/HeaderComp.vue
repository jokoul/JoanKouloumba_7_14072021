<template>
  <div>
    <header class="header">
      <router-link class="header__logo" to="/home">
        <img src="../assets/logo_left.png" alt="groupomania logo" />
      </router-link>
      <nav class="header__nav">
        <router-link to="/setting" class="header__nav__link btn">
          <i class="fas fa-user"></i> Compte</router-link
        >
        <router-link to="/home" class="header__nav__link btn">
          <i class="fas fa-home"></i> Accueil
        </router-link>
        <button @click="logout()" class="header__nav__link btn">
          <i class="fas fa-sign-out-alt"></i> Déconnexion
        </button>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  props: {},
  computed: {},
  methods: {
    logout() {
      this.$store.commit("USER_LOGOUT");
      this.$router.push("/");
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
.header {
  @include dimension($width: 100%, $height: 4rem);
  @include flexbox($display: flex, $justify: space-between, $align: center);
  flex-wrap: wrap;
  @media screen and (max-width: 770px) {
    @include flexbox($display: flex, $justify: center, $align: center);
    flex-direction: column;
    height: 10rem;
  }
  @media screen and (max-width: 500px) {
    height: 12rem;
  }
  box-shadow: 0 0.5rem 1.5rem $primary_color;
  &__logo {
    & img {
      height: 3rem;
      margin: 0.5rem 0;
    }
  }
  &__nav {
    @media screen and (max-width: 500px) {
      @include flexbox($display: flex, $justify: center, $align: center);
      flex-direction: column;
      flex-wrap: wrap;
    }
    &__link {
      text-decoration: none;
      color: $tertiary_color;
      margin-right: 1rem;
      padding: 0.5rem;
      transition: transform 0.3s;
    }
    &__link:hover {
      background-color: $tertiary_color--clear;
      border-radius: 3rem;
      padding: 0.5rem;
      transform: scale(1.1);
    }
  }
}
.router-link-active {
  font-weight: 600;
}
</style>
