<template>
  <div class="home">
    <header-comp id="nav"></header-comp>
    <div class="title">
      <img
        v-if="getProfil"
        class="title__img"
        :src="getProfil"
        :alt="getFirstname"
      />
      <img
        v-else
        class="title__img"
        src="../assets/avatar_default.png"
        :alt="getFirstname"
      />
      <h1 class="title__hello">Bonjour {{ getFirstname }}</h1>
    </div>
    <post-item></post-item>
    <post-feed></post-feed>
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import PostItem from "../components/PostItem.vue";
import PostFeed from "../components/PostFeed.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    HeaderComp,
    PostItem,
    PostFeed,
  },
  data() {
    return {};
  },
  computed: {
    getFirstname() {
      return this.$store.getters.getFirstname;
    },
    ...mapGetters(["getProfil"]),
  },
  methods: {},
  created() {},
  beforeMount() {
    //on propage notre action 'getUserInfos'
    this.$store.dispatch("getUserInfos");
  },
  mounted() {},
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
#nav {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  opacity: 1;
  background-color: white;
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
