<template>
  <div class="starting starting-component">
    <div class="container">
      <div class="content">
        <section>
          <h2 class="title">Installation</h2>
          <h3>NPM</h3>
          <div class="code-section">$ npm i thist</div>
        </section>
      </div>
      <div class="content">
        <section class="flex">
          <div class="text">
            <h2 class="title">Basic Introduction</h2>
            <p>All callback functions are composed of following arguments:</p>
            <ul>
              <li>
                <span class="code-parameter-dark">item</span>: Each object being
                processed in nested list
              </li>
              <li>
                <span class="code-parameter-dark">index</span>: Object index in
                each level
                <span class="question"></span>
              </li>
              <li>
                <span class="code-parameter-dark">list</span>: Each object in
                processing nested list
              </li>
              <li>
                <span class="code-parameter-dark">parent</span>: Parent of
                processing nested list item
              </li>
            </ul>
          </div>
          <div class="code">
            <div class="code-explaination">
              <ul>
                <li>
                  <span
                    class="color-block"
                    :style="{ backgroundColor: '#fff' }"
                  ></span>
                  <span
                    class="color-block"
                    :style="{ backgroundColor: '#c3c6f3' }"
                  ></span>
                  <span
                    class="color-block"
                    :style="{ backgroundColor: '#fff700' }"
                  ></span>
                  Original JSON Code
                </li>
                <li>
                  <span
                    class="color-block"
                    :style="{ backgroundColor: '#46eeff' }"
                  ></span>
                  Thist Explaination Code
                </li>
              </ul>
            </div>
            <div class="code-section">
              <div class="json">
                <NestedListComponent
                  :indent="24"
                  :list="dataX.listExamples.productLine.list"
                  :nextListKey="'subBusinessList'"
                  :isShowControl="true"
                  :isShowDebug="true"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StartingComponent",
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
