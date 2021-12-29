<template>
  <div>
    <header-comp></header-comp>
    <h1 class="title">Information de votre compte</h1>
    <setting-account :key="reRender" @reload="reRender++"></setting-account>
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import SettingAccount from "../components/SettingAcount.vue";

export default {
  name: "UserSetting",
  data() {
    return {
      reRender: 0,
    };
  },
  components: {
    HeaderComp,
    SettingAccount,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
$primary_color: #ffd7d7;
$secondary_color: #fd2d01;
$tertiary_color: #013a01;
$tertiary_color--clear: #88ec88;
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
</style>
