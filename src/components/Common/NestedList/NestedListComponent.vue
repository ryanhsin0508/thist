<template>
  <div
    class="nested-list nested-list-component"
    ref="component"
    tabindex="1"
    @keydown.stop="onKeydown"
  >
    <div class="control-buttons" v-if="isShowControl">
      <div class="expand-handle">
        <button class="button mini control" @click="collapseAll">
          <i class="far fa-minus-square"> </i>
          Collapse All
        </button>
        <button class="button mini control" @click="expandAll">
          Expand All
          <i class="far fa-plus-square"> </i>
        </button>
      </div>
      <div class="debug-handle" v-if="isShowDebug">
        <button
          class="button mini control"
          @click="isInvertDebug = !isInvertDebug"
          v-if="isInnerShowDebug"
        >
          <i :class="`far fa-arrow-circle-${isInvertDebug ? 'up' : 'down'}`">
          </i
          >Invert Thist Code
        </button>
        <button
          class="button mini control"
          @click="isInnerShowDebug = !isInnerShowDebug"
        >
          <i :class="`far fa-${isInnerShowDebug ? 'ban' : 'info-circle'}`"> </i>
          {{ isInnerShowDebug ? "Hide" : "Show" }} Thist Code
        </button>
      </div>
    </div>
    <NestedListUlComponent
      v-bind="{
        ...$props,
        expandList,
        list: renderedList,
        isInvertDebug,
        isShowDebug: isShowDebug && isInnerShowDebug,
        totalLevel,
      }"
      @toggleExpand="toggleExpand"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

export default {
  name: "NestedListComponent",
  components: {},
  props: {
    indent: { default: 12 },
    level: { default: 0 },
    list: { default: () => [] },
    listHeight: { default: 16 },
    fontSize: { default: 14 },
    nextListKey: { default: "children" },
    isShowControl: { default: false },
    isShowDebug: { default: false },
  },
  setup(props) {
    const expandList = ref([]);
    const isInnerShowDebug = ref(true);
    const isInvertDebug = ref(false);
    const collapseAll = () => {
      expandList.value = [];
    };
    return {
      expandList,
      isInnerShowDebug,
      isInvertDebug,
      collapseAll,
    };
  },
  watch: {
    renderedList(v, pv) {
      this.expandList = [];
      this.expandAll();
    },
  },
  computed: {
    ...mapState(["windowInfo"]),
    totalLevel() {
      return tt.totalLevel(this.list, this.nextListKey);
    },
    renderedList() {
      let renderedList = tt.createThistId(this.list, this.nextListKey);
      return renderedList;
    },
  },
  methods: {
    toggleExpand(id) {
      if (this.expandList.includes(id)) {
        let index = this.expandList.indexOf(id);
        this.expandList.splice(index, 1);
      } else {
        // this.expandList = ["0"]
        this.expandList.push(id);
      }
    },
    expandAll() {
      let expandList = [];
      let _list = JSON.parse(JSON.stringify(this.renderedList));
      tt.renderItems(
        _list,
        item => {
          for (let key in item) {
            if (
              this.ttFn.checkType(item[key]) === "array" &&
              item[key].length
            ) {
              expandList.push(`${item.nestedListId}_${key}`);
            }
          }
          return item;
        },
        "children"
      );
      this.expandList = expandList;
    },
  },
  created() {},
  mounted() {
    this.expandAll();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nested-list {
  outline: none;
  // font-family: consolas;
  line-height: 1.33;
  /deep/ * {
    letter-spacing: 0;
  }
}
.control-buttons {
  position: sticky;
  display: flex;
  justify-content: space-between;
  top: 0;
  z-index: 1;
  margin-bottom: 4px;
  padding-bottom: 4px;
  background-color: #606060;
  button {
    font-size: 12px;
    margin-right: 10px;
  }
}
</style>
