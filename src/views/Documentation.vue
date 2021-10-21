<template>
  <div id="page-documentation" class="documentation" ref="component">
    <SidebarComponent />
    <main class="page-main" ref="main">
      <starting-component />
      <CodeSectionComponent @onMainScroll="onCodeSectionScroll">
        <template v-slot:main>
          <CodeIntroComponent
            :codeName="code.title"
            v-for="code in dataX.codeExamples"
            :key="code.title"
          />
        </template>
      </CodeSectionComponent>
    </main>
  </div>
</template>

<script>
import ExampleListSelectorComponent from "@/components/ExampleListSelectorComponent.vue";
import CodeSectionComponent from "@/components/CodeSectionComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import StartingComponent from "../components/StartingComponent.vue";
import codeExamples from "@/assets/js/codeExamples";

export default {
  name: "Documentation",
  components: {
    ExampleListSelectorComponent,
    CodeSectionComponent,
    SidebarComponent,
    StartingComponent,
  },
  methods: {
    onCodeSectionScroll() {
      console.log("QQQ");
      this.$refs.main.scrollTo({
        top: 3000,
        left: 0,
        behavior: "smooth",
      });
    },
    onMainScroll() {},
  },
  watch: {
    $route(to, from) {
      if(!to.hash){
        return
      }
      let $target = document.getElementById(
        `code-example-${to.hash.substring(1)}`
      );
      let offsetTop = $target.offsetTop - 60;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    },
  },
  async beforeCreate() {
    this.$store.commit("SET_DATA", {
      codeExamples,
    });
  },
  mounted() {
    this.$refs.main.addEventListener("scroll", this.onMainScroll);
  },
  beforeUnmounted() {
    this.$refs.main.removeEventListener("scroll", this.onMainScroll);
  },
};
</script>
<style scoped lang="scss">
.documentation {
  display: flex;
  main {
    flex-grow: 1;
  }
}
</style>
