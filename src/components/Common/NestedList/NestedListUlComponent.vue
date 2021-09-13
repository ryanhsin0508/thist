<template>
  <ul
    :class="['nested-lists']"
    :style="{
      marginLeft: item ? `${indent}px` : 0,
      minWidth: `calc(100% - ${indent}px`,
    }"
  >
    <template v-for="(item, index) in list" :key="'list' + index">
      <NestedListLiComponent
        v-bind="{
          ...$props,
          item,
          listIndex: index,
          listLength: list.length,
        }"
        @toggleExpand="toggleExpand"
      />
    </template>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NestedListUlComponent",
  components: {},
  props: {
    expandList: { default: () => [] },
    fontSize: { default: 12 },
    indent: { default: 20 },
    item: {},
    level: { default: 0 },
    list: {},
    listHeight: { default: 24 },
    nextListKey: {},
    parentItem:{},
    isInvertDebug: {default: false},
    isShowDebug: {default: false}
  },
  data() {
    return {
      init: false,
      treeHeightArr: [],
      activeIndexList: [],
      expandIndexList: [],
    };
  },
  methods: {
    toggleExpand(id) {
      console.log("ul" + id);
      this.$emit("toggleExpand", id);
    },
  },
  computed: {
    ...mapState(["userX", "statusX", "deviceX"]),
    computeTreeHeight() {
      return "";
    },
  },
  watch: {
    svgLoaded(v) {
      console.log("loaded", v);
      if (v) {
        // this.convertSVG()
      }
    },
  },
  created() {},
  mounted() {
    // console.log('mounsdfasd')
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nested-lists {
  transition: all 0.2s;

  .list-content-container {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
  }
  .list-content-data.title {
    flex-grow: 1;
  }
  .active > .list-content-container .tree {
    height: 33px;
  }
  .list-content {
    cursor: pointer;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 14px;
    height: 38px;
    border-bottom: 1px solid $gray3;
  }
  li {
    &:not(:first-child) {
      > .list-content .tree {
        height: 46px;
      }
    }
  }
}
.list-content-container:not(.expanded) .collapse-handle {
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
.active > .list-content-container > .collapse-handle {
  opacity: 0;
  &::before,
  &::after {
    opacity: 0;
  }
}
</style>
