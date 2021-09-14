<template>
  <div class="starting starting-component">
    <div class="title">Basic Introduction</div>
    <p>All callback functions are composed of following arguments:</p>
    <ul>
      <li>
        <span class="code-parameter">item</span>: Each object being processed in
        nested list
      </li>
      <li>
        <span class="code-parameter">index</span>: Object index in each level
        <span class="question"></span>
      </li>
      <li>
        <span class="code-parameter">list</span>: Each object in processing
        nested list
      </li>
      <li>
        <span class="code-parameter">parent</span>: Parent of processing nested
        list
      </li>
    </ul>
    <div class="code-explaination">
      <ul>
        <li>
          <span class="color-block" :style="{ backgroundColor: '#fff' }"></span>
          <span
            class="color-block"
            :style="{ backgroundColor: '#c3c6f3' }"
          ></span>
          <span
            class="color-block"
            :style="{ backgroundColor: 'c3c6f3' }"
          ></span>
          Original JSON Code
        </li>
        <li>
          <span
            class="color-block"
            :style="{ backgroundColor: '#46eeff' }"
          ></span>
          Thists Explaination Code
        </li>
      </ul>
    </div>
    <div class="json">
      <NestedListComponent
        :indent="24"
        :list="dataX.listExamples.business.list"
        :nextListKey="'subBusinessList'"
        :isShowControl="true"
        :isShowDebug="true"
      />
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
<style scoped lang="scss">
.starting {
  text-align: left;
  padding: 24px 16px;
  max-width: 1280px;
  margin-right: 5%;
  li {
    color: #dddddd;
  }
  .code-explaination {
    margin-bottom: 4px;
    ul {
      display: flex;
      justify-content: flex-end;
      li {
        font-size: 12px;
        padding: 0 8px;
        span {
          margin-right: 2px;
        }
        display: flex;
        align-items: center;
      }
    }
  }
  .json {
    height: 640px;
    overflow: auto;
  }
}
</style>
