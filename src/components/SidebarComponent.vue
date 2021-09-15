<template>
  <div
    class="sidebar sidebar-component"
  >
    <ul>
      <li>Basic Introduction</li>
      <li v-for="code in dataX.codeExamples" :key="code.title">
        tt.{{ code.title }}
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
.sidebar {
  position: relative;
  width: 320px;
  color: #000;
  background-color: #fff;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.5);
  min-height: calc(100vh - 80px);
  flex-shrink: 0;
  text-align: left;
  padding-left: 20px;
  padding-top: 16px;
  li {
    font-size: 16px;
    font-family: consolas;
    cursor: pointer;
    line-height: 2;
  }
}
</style>
