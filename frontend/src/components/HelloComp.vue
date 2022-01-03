<template>
  <div class="title">
    <router-link to="/setting">
      <img
        v-if="getProfil"
        class="title__img"
        :src="getProfil"
        :alt="getUserAccount.firstname"
      />
      <img
        v-else
        class="title__img"
        src="../assets/avatar_default.png"
        :alt="getUserAccount.firstname"
      />
    </router-link>
    <h1 class="title__hello">Bonjour {{ getUserAccount.firstname }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HelloComp",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getProfil", "getUserAccount"]),
  },
  created() {
    //on propage notre action 'getUserInfos'
    this.$store
      .dispatch("getUserInfos")
      .then((res) => console.log(res))
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

.title {
  margin-top: 5rem;
  @media screen and (max-width: 770px) {
    margin-top: 13rem;
  }
  text-align: left;
  &__img {
    width: 5rem;
    border-radius: 1rem;
  }
  &__hello {
    font-size: 1.5rem;
  }
}
</style>
