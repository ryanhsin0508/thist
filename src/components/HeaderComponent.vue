<template>
  <header>
    <div class="container">
      <router-link to="/">
        <img alt="Vue logo" src="../assets/img/logo.svg" width="60" />
        <h1 class="title">Thists.js</h1>
      </router-link>
      <nav>
        <router-link class="button flat no-border" :to="'/documentation'"
          >Documentation</router-link
        >
      </nav>
    </div>
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
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
