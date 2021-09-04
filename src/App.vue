<template>
  <div>
    <HeaderComponent />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import codeExamples from "@/assets/js/codeExamples";
export default {
  name: "App",
  components: { HeaderComponent },
  async mounted() {
    let listExamplesRes = await this.axios.get(`/listExamples.json`);
    let codeExamplesRes = await this.axios.get(`/codeExamples.json`);
    this.$store.commit("SET_DATA", {
      listExamples: listExamplesRes.data,
      codeExamples: codeExamples,
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
  color: #2c3e50;
}

#nav {
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
