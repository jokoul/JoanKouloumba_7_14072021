<template>
  <div class="home">
    <header-comp></header-comp>
    <h1>HOME PAGE</h1>
    <post-item></post-item>
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import PostItem from "../components/PostItem.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComp,
    PostItem,
  },
  computed: {},
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
</style>
