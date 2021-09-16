<template>
  <div
    class="code-examples code-examples-component"
    :style="{ maxHeight: windowWidth > 800 ? maxHeight : maxHeight }"
    ref="component"
  >
    <div class="container flex">
      <div class="content flex">
        
        <main :style="{}" ref="main">
          <slot name="main"></slot>
        </main>
        <aside ref="aside">
          <slot name="aside"></slot>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeSectionComponent",
  props: {
    maxHeight: { default: "none" },
  },
  components: {},
  data() {
    return {
      isShowAside:false
    };
  },
  watch: {},
  computed: {},
  methods: {
    onMainScroll() {
      this.$emit("onMainScroll");
    },
  },
  mounted() {
    this.$refs.main.addEventListener("scroll", this.onMainScroll);
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.code-section {
  display: flex;
  .container {
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
}
aside {
  display: flex;
  border-right: 1px solid rgba(255, 255, 255, 0.75);
  width: 360px;
  box-sizing: content-box;
  flex-shrink: 0;
  @media (max-width: 800px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.75);
    max-height: 50vh;
    padding: 0 0 20px 0;
  }
}
main {
  overflow: unset!important;
  flex-grow: 1;
  padding: 0 20px 0 0;
  @media (max-width: 800px) {
    padding: 20px 0;
  }
}
</style>
