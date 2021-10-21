<template>
  <div
    class="code-examples code-examples-component"
    :style="{ maxHeight: windowInfo.windowWidth > 800 ? maxHeight : maxHeight }"
    ref="component"
  >
    <div class="container flex">
      <div class="content flex">
        <aside ref="aside" :style="{ top: asideTop + 'px' }">
          <ExampleListSelectorComponent ref="exampleDataSelector" />
        </aside>
        <main :style="{}" ref="main">
          <slot name="main"></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import ExampleListSelectorComponent from "@/components/ExampleListSelectorComponent.vue";
export default {
  name: "CodeSectionComponent",
  props: {
    maxHeight: { default: "none" },
  },
  components: { ExampleListSelectorComponent },
  data() {
    return {
      isShowAside: false,
      asideTop: 0,
      mainOffsetTop: 0,
    };
  },
  watch: {
    "windowInfo.scrollTop"(scrollTop) {
      let exampleSelectorHeight =
        this.$refs.aside.getBoundingClientRect().height;
      let mainHeight = this.$refs.main.getBoundingClientRect().height;
      let mainOffsetTop = this.$refs.main.offsetTop;
      let exampleSelectorDistanceFromTop =
        window.innerHeight / 2 - exampleSelectorHeight / 2;
      let offsetY = this.mainOffsetTop - exampleSelectorDistanceFromTop;
      let isReachedBottom =
        scrollTop +
          exampleSelectorHeight +
          exampleSelectorDistanceFromTop -
          (mainOffsetTop + mainHeight - 60) >=
        0;
      if (scrollTop - offsetY > 0 && !isReachedBottom) {
        this.asideTop = scrollTop - offsetY + 30;
      } else {
        if (!isReachedBottom) {
          this.asideTop = 0;
        }
      }
    },
  },
  computed: {},
  methods: {
    onMainScroll() {
      this.$emit("onMainScroll");
    },
  },
  mounted() {
    this.mainOffsetTop = this.$refs.main.offsetTop;
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
    // max-height: 50vh;
    padding: 0 0 20px 0;
  }
}
main {
  overflow: unset !important;
  flex-grow: 1;
  padding: 0 0 0 20px;
  @media (max-width: 800px) {
    padding: 20px 0;
  }
}
</style>
