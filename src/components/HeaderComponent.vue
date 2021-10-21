<template>
  <header>
    <button
      class="flat no-border menu"
      v-if="windowInfo.windowWidth <= 1536"
      @click="toggleSidebar"
    >
      <i class="far fa-bars"></i>
    </button>
    <router-link to="/">
      <img alt="Vue logo" src="../assets/img/logo.svg" width="40" />
      <h1 class="title">Thist.js</h1>
    </router-link>
    <nav>
      <router-link class="button flat no-border" :to="'/documentation'">
        <i class="text-icon far fa-file-alt" />
        <span v-if="windowInfo.windowWidth > 640">Documentation</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "ComponentTemplate",
  props: {},
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    toggleSidebar() {
      this.$store.commit("SET_DATA", {
        isShowSidebar: !this.dataX.isShowSidebar,
      });
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
