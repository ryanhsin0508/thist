<template>
  <div id="page-documentation" class="documentation" ref="component">
    <sidebar-component />
    <main>
      <starting-component />
      <CodeSectionComponent :maxHeight="'100vh'">
        <template v-slot:aside>
          <ExampleListSelectorComponent :codeName="'find'" />
        </template>
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
  async beforeCreate() {
    this.$store.commit("SET_DATA", {
      codeExamples
    });
  },
};
</script>
<style scoped lang="scss">
.documentation {
  display: flex;
  main {
    flex-grow: 1;
    color: #fff;
    background-color: #505050;
    max-width: calc(100% - 240px);
  }
}
</style>
