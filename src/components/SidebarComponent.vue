<template>
  <div
    class="sidebar sidebar-component"
    :style="{
      transform:
        windowInfo.windowWidth <= 1440 && !dataX.isShowSidebar
          ? `translateX(-100%)`
          : '',
    }"
  >
    <h2>Starting</h2>
    <ul>
      <li>Installation</li>
      <li>Basic Introduction</li>
    </ul>
    <h2>Code Examples</h2>
    <ul>
      <li v-for="code in dataX.codeExamples" :key="code.title">
        <router-link :to="`#${code.title}`"
          >tt.{{ code.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SidebarComponent",
  props: {},
  components: {},
  data() {
    return {
      scrollTop: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    console.log(this.dataX);
    window.addEventListener("scroll", this.onWindowScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onWindowScroll);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #333;
  &:hover{
    color: #55a4ec;
  }
}
</style>
