<template>
  <div>
    <div class="comments__buttons">
      <button class="btn comments__buttons_btn btn-like">
        <i class="fas fa-thumbs-up"></i><i class="far fa-thumbs-up"></i>
      </button>
      <button class="btn comments__buttons_btn btn-dislike">
        <i class="fas fa-thumbs-down"></i><i class="far fa-thumbs-down"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReactFeed",
  props: [""],
  data() {
    return {};
  },
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
