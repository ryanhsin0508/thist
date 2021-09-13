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
export default {
  name: "App",
  components: { HeaderComponent },
  async beforeCreate(){
    let res = await this.$store.dispatch("getExamples");
    this.$store.commit("SET_DATA", {
      listExamples: res.data,
    });
  },
  async mounted() {
    
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
  min-height: 100vh;
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
