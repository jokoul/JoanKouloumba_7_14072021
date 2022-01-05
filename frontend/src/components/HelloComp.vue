<template>
  <div class="title">
    <router-link :to="`/profile/${getUser.userId}`">
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
    ...mapGetters(["getProfil", "getUserAccount", "getUser"]),
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
@keyframes bigSmall {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes balance {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.title {
  margin-top: 5rem;
  margin-left: 2rem;
  @media screen and (max-width: 770px) {
    margin-top: 13rem;
  }
  text-align: left;
  &__img {
    width: 5rem;
    border-radius: 1rem;
    margin-bottom: 0.5rem;
    animation: bigSmall 5s 1s ease-in-out infinite;
    &:hover {
      animation: balance 3s ease-in-out infinite;
    }
  }
  &__hello {
    font-size: 1.5rem;
  }
}
</style>
