<template>
  <div>
    <h1>Editer ce post</h1>
    <p>post_id : {{ post_id }}</p>
  </div>
</template>

<script>
export default {
  name: "OneView",
  data() {
    return {
      post_id: this.$route.params.post_id,
    };
  },
  created() {},
  methods: {},
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
