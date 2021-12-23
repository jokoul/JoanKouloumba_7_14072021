<template>
  <div>
    <router-view></router-view>

    <footer class="footer">
      <p>Groupomania © 2021</p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
$primary_color: #ffd7d7;
$secondary_color: #fd2d01;
$tertiary_color: #013a01;
$tertiary_color--clear: #88ec88;
* {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $tertiary-color;
}
.footer {
  margin-top: 3rem;
  padding: 2rem;
  background-color: $primary_color;
}
</style>
