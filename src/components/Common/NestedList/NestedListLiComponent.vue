<template>
  <li :style="{ fontSize: fontSize + 'px' }">
    <template v-if="ttFn.checkType(renderedItem) !== 'string'">
      <div class="start">
        <span class="open-bracket" v-if="level === 0 && listIndex === 0"
          >[</span
        >
        <span class="open-brace">{</span>
      </div>
      <div class="content">
        <div
          :style="{ marginLeft: `${indent}px` }"
          v-for="(value, key, index) in renderedItem"
          :key="'content' + index"
        >
          <span
            class="expand-handle"
            :style="{
              left: `-${indent}px`,
              width: `${listHeight}px`,
              height: `${listHeight}px`,
            }"
            @click="toggleExpand(`${item.nestedListId}_${key}`)"
            v-if="ttFn.checkType(item[key]) === 'array'"
          >
            <i
              :class="
                expandList.includes(item.nestedListId + '_' + key)
                  ? 'far fa-minus-square'
                  : 'far fa-plus-square'
              "
            />
          </span>
          <div
            class="list-content"
            :style="{
              //height: `${listHeight}px`,
            }"
          >
            <span class="key">"{{ key }}": </span>
            <span
              :class="['value', `code-${ttFn.checkType(value)}`]"
              v-if="value"
            >
              {{ value }}
            </span>
          </div>
          <template v-if="ttFn.checkType(item[key]) === 'array'">
            <span class="open-bracket">[</span>
            <NestedListUlComponent
              :list="item[key]"
              :test="'aa'"
              v-bind="{
                ...$props,
                level: level + 1,
                parentItem: createParentForChildren(item),
              }"
              v-if="expandList.includes(item.nestedListId + '_' + key)"
              @toggleExpand="toggleExpand"
            />
            <span
              class="spread"
              :style="{ marginLeft: `${indent / 2}px` }"
              v-if="!expandList.includes(item.nestedListId + '_' + key)"
              @click="toggleExpand(`${item.nestedListId}_${key}`)"
              >...</span
            >
            <span class="close-bracket">]</span>
          </template>
        </div>
        <div
          class="debug"
          :style="{
            marginLeft: `${indent}px`,
            order: isInvertDebug ? 0 : -1,
          }"
          v-if="isShowDebug"
        >
          <ul>
            <li>
              <span class="debug-key">nestedListId(ThistId):</span
              ><span>{{ item.nestedListId }}</span>
            </li>
            <li>
              <span class="debug-key">index:</span><span>{{ listIndex }}</span>
            </li>
            <li>
              <span class="debug-key">level:</span><span>{{ level }}</span>
            </li>
            <li>
              <span
                class="parent-visible-control"
                @click="isShowParent = !isShowParent"
              >
                <i
                  :class="`far fa-eye${isShowParent ? '' : '-slash'}`"
                  v-if="parentItem"
                />
              </span>
              <span class="debug-key">parent:</span>
              <pre
                v-if="isShowParent || !parentItem"
                v-html="
                  parentItem ? JSON.stringify(parentItem, null, '  ') : 'null'
                "
              ></pre>
            </li>
          </ul>
        </div>
      </div>
      <div class="end">
        <span class="close-brace">}</span>
        <span class="comma" v-if="listLength - 1 !== listIndex">,</span>
        <span
          class="close-bracket"
          v-if="level === 0 && listLength - 1 === listIndex"
          >]</span
        >
      </div>
    </template>
    <template v-else>"{{renderedItem}}"<span class="comma" v-if="listLength - 1 !== listIndex">,</span></template>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NestedListLiComponent",
  props: {
    expandList: { default: () => [] },
    fontSize: { default: 12 },
    id: {},
    indent: { default: 0 },
    indentFirstLevel: { dafault: true },
    isInvertDebug: { default: false },
    isShowDebug: { default: false },
    item: {},
    level: { default: 0 },
    listHeight: { default: 24 },
    listIndex: { default: 0 },
    listLength: { default: 1 },
    nextListKey: {},
    parentItem: {},
  },
  components: {},
  data() {
    return {
      isShowParent: false,
    };
  },
  watch: {
    expandList(v, pv) {},
  },
  computed: {
    renderedItem() {
      let _item = JSON.parse(JSON.stringify(this.item));
      delete _item.nestedListId;
      for (let key in _item) {
        if (this.ttFn.checkType(_item[key]) === "array" && _item[key].length) {
          _item[key] = "";
        }
      }
      return _item;
    },
    isExpanded() {
      return this.expandList.includes(this.item.nestedListId);
    },
  },
  methods: {
    toggleExpand(id) {
      this.$emit("toggleExpand", id);
    },
    createParentForChildren(item) {
      let _item = JSON.parse(JSON.stringify(item));
      return _item;
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-family: consolas;
  .start,
  .end {
    width: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .content,
  ul {
    // flex-grow: 1;
  }
  .content > div {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  ul {
    // margin-top: 20px;
  }
  .list-content {
    display: flex;
    align-items: center;
    white-space: nowrap;
    span {
      margin-right: 5px;
    }
  }
}
.expand-handle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  color: #afafaf;
  cursor: pointer;
  // border: 1px solid white;
}
.spread {
  width: 100%;
  cursor: pointer;
}
.code-string {
  &:before,
  &:after {
    content: '"';
  }
}
.debug {
  li {
    position: relative;
    font-size: 12px;
    line-height: 1.33em;
    .parent-visible-control {
      color: #fff;
      position: absolute;
      left: -18px;
      top: 2px;
      cursor: pointer;
    }
  }
}
</style>
