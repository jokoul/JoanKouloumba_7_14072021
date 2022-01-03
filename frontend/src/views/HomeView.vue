<template>
  <div class="home">
    <header-comp id="nav"></header-comp>
    <hello-comp></hello-comp>
    <post-item :key="reRender" @reload="updateComp" autofocus></post-item>
    <post-feed :key="reRender" @reload="updateComp"></post-feed>
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import PostItem from "../components/PostItem.vue";
import PostFeed from "../components/PostFeed.vue";
import HelloComp from "../components/HelloComp.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComp,
    PostItem,
    PostFeed,
    HelloComp,
  },
  data() {
    return {
      reRender: 0,
    };
  },
  computed: {},
  methods: {
    updateComp(reRenderModerate) {
      this.reRender = reRenderModerate;
    },
  },
  created() {},
  beforeCreate() {},
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
</style>
