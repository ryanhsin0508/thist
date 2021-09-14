<template>
  <div class="intro intro-component">
    <div class="top-block">
      <div class="container">
        <div class="bg">
          <div class="list0">
            <span class="text">0</span><span class="bar"></span>
          </div>
          <div class="list1">
            <span class="text">0_0</span><span class="bar"></span>
          </div>
          <div class="list2">
            <span class="text">0_0_0</span><span class="bar"></span>
          </div>
          <div class="list3">
            <span class="text">0_1</span><span class="bar"></span>
          </div>
          <div class="list4">
            <span class="text">0_1_0</span><span class="bar"></span>
          </div>
        </div>
        <div class="intro-text">
          <div class="text">
            <div class="title">Thists</div>
            <p>Easily handle data in <strong>Nested List</strong></p>
          </div>
          <nav>
            <button class="button flat no-border">Get Started</button>
          </nav>
        </div>
      </div>
    </div>
    <main>
      <h2>What is Thists.js?</h2>
      <p>
        <strong>Thists</strong> <span>(pronounced like lists)</span> is a
        Javascript library that can help you easily control your nested list.
      </p>
      <h2>Quick Look Example</h2>
      <CodeSectionComponent :maxHeight="'50vh'">
        <template v-slot:aside>
          <ExampleListSelectorComponent :codeName="'find'" />
        </template>
        <template v-slot:main>
          <CodeIntroComponent
            :codeName="'find'"
          >
          </CodeIntroComponent>
        </template>
      </CodeSectionComponent>
    </main>
  </div>
</template>

<script>
import CodeSectionComponent from "@/components/CodeSectionComponent.vue";
import ExampleListSelectorComponent from "@/components/ExampleListSelectorComponent.vue";
import codeExamples from "@/assets/js/codeExamples";
export default {
  name: "IntroComponent",
  props: {},
  components: {
    CodeSectionComponent,
    ExampleListSelectorComponent,
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  async beforeCreate() {
    this.$store.commit("SET_DATA", {
      codeExamples
    });
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.intro {
}
.top-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px;
  background-color: #244b71;
  color: #ffffff;
  height: 180px;
  box-sizing: content-box;
  letter-spacing: 3px;
  .title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  p {
    text-align: center;
    margin-bottom: 2em;
    font-size: 24px;
    color: $gray3;
    letter-spacing: 2px;
  }
}

.container {
  position: relative;
  .bg {
    position: absolute;
    left: 40px;
    top: 0;
    opacity: 0.1;
    font-family: monospace;
    > div {
      display: flex;
    }
    .text {
      font-size: 20px;
      line-height: 1;
      margin-right: 10px;
      letter-spacing: 6px;
      opacity: 0.8;
    }
    .bar {
      position: relative;
      display: block;
      width: 120px;
      height: 20px;
      margin-bottom: 20px;
      background-color: #fff;
      &::before {
        display: none;
        content: "";
        position: absolute;
        left: -40px;
        top: 0;
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 20px;
      }
    }
  }
  .intro-text {
    position: relative;
    //   z-index: 1;
  }
}
.main-intro {
  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
}
</style>
