<template>
  <header-page></header-page>
  <router-view />
</template>

<script>
import HeaderPage from "./components/HeaderPage.vue";

export default {
  components: {
    HeaderPage,
  },
};
</script>

<style lang="scss">
@use "./assets/scss/variables.scss" as *;
#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .container {
    margin-inline: auto;
    width: 100%;
    padding-inline: 16px;

    @media (min-width: 375px) {
      padding-inline: 10px;
    }
    @media (min-width: 768px) {
      width: 728px;
      padding-inline: 0;
    }
    @media (min-width: 992px) {
      width: 952px;
    }
    @media (min-width: 1200px) {
      width: 1100px;
    }
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
