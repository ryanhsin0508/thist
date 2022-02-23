<template>
  <div class="app-content">
    <HeaderComponent />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "App",
  components: { HeaderComponent },
  async beforeCreate() {
    let res = await this.$store.dispatch("getExamples");
    this.$store.commit("SET_DATA", {
      listExamples: res.data,
    });
  },
  methods: {
    onMainScroll() {
    },
  },
  async mounted() {
    this.$nextTick(() => {
    });
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  min-height: 100vh;
  > div {
    max-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main.main {
    padding-top: 60px;
    // max-height: calc(100vh - 60px);
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #333333;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
