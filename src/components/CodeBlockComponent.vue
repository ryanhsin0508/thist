<template>
  <div
    class="code-block code-block-component"
    :style="{ maxHeight: windowWidth > 800 ? maxHeight : '' }"
  >
    <div class="container flex">
      <aside>
        <slot name="aside"></slot>
      </aside>
      <main>
        <slot name="main"></slot>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CodeBlockComponent",
  props: {
    maxHeight: { default: "none" },
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {


  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.code-block {
  display: flex;
  .container {
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
}
aside {
  display: flex;
  padding: 0 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.75);
  width: 360px;
  @media (max-width: 800px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.75);
    max-height: 50vh;
    padding: 0 0 20px 0;
  }
}
main {
  overflow: auto;
  flex-grow: 1;
  padding: 0 20px;
    @media (max-width: 800px) {
      padding: 20px 0;
  }

}
</style>
