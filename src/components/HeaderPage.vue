<template>
  <header class="relative">
    <div class="container flex items-center justify-between h-[80px]">
      <h1 class="text-[1.5rem] font-[700]">Where in the world?</h1>

      <button @click="toggelTheme">
        <i
          class="fa-moon mr-[5px]"
          :class="theme ? 'fa-regular' : 'fa-solid'"
        ></i>
        <span class="font-[600]">Dark Mode</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      theme: true,
    };
  },
  methods: {
    toggelTheme() {
      this.theme = !this.theme;
      document.body.classList = this.theme ? "light" : "dark";
    },
  },
  mounted() {
    document.body.classList = "light";
  },
};
</script>

<style lang="scss">
header {
  background: var(--bg);
  color: var(--text);
  box-shadow: 0 0 5px 0 hsl(0deg 0% 50% / 48%);
  transition: background 0.3s, color 0.3s;
}
</style>
