<template>
  <div :class="['table-data', { mini }]" :style="{ maxHeight }">
    <table>
      <tr>
        <th
          v-for="(heading, index) in tableData.heading"
          :key="`tableHeading${index}`"
        >
          {{ heading.label }}
        </th>
      </tr>
      <tr
        v-for="(content, index) in tableData.content"
        :key="`tableData${index}`"
        :style="{
          cursor:
            selectArea === 'all' && selection !== 'multiple'
              ? 'pointer'
              : 'default',
        }"
        @click="clickOnTr(content)"
      >
        
        <td
          v-for="(headData, headIndex) in tableData.heading"
          :key="`headData${headIndex}`"
          :style="{ whiteSpace: headData.singleRow ? 'nowrap' : '' }"
        >
          {{ content[headData.field] }}
        </td>
      </tr>
    </table>

    <ul class="pager" v-if="showPagination">
      <li
        :class="{ active: index === selectedPage - 1 }"
        v-for="(content, index) in splittedContent.length"
        :key="index"
        @click="pageHandler(index + 1)"
      >
        {{ index + 1 }}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

import { mapState } from "vuex";
export default {
  name: "TableComponent",
  props: {
    tableData: {
      type: [Array, Object],
      default: () => ({
        heading: [
          { label: "Name", field: "name" },
          { label: "Type", field: "type" },
        ],
        content: [
          { id: 99, name: "test1", type: "typefield" },
          { id: 1, name: "test2", type: "typefield" },
        ],
      }),
    },

    perPage: {
      type: Number,
      default: 10,
    },
    maxHeight: { type: String, default: "auto" },
    mini: { default: true },
    showPagination: { default: false },
    selection: { default: "none" /*none, single, multiple*/ },
    selectionRefer: { default: "id" },
    selected: {},
    selectArea: { default: "input" },
  },
  components: {},
  data() {
    let that = this;
    return {
      selectedPage: 1,
      detailContainerWidth: 0,
      innerSelected: that.selection === "single" ? "" : [],
    };
  },
  computed: {
    splittedContent() {
      let arr = [];
      this.tableData.content.forEach((business, index) => {
        let realIndex = index + 1;
        let currentPage = Math.ceil(realIndex / this.perPage);
        let indexInCurrentPage = realIndex % this.perPage;
        if (!arr[currentPage - 1]) {
          arr[currentPage - 1] = [];
        }
        arr[currentPage - 1].push(business);
        // arr[0].push(business);
      });
      return arr;
    },
  },
  watch: {
    selected(value) {
      this.innerSelected = value;
    },
    innerSelected(value) {
      this.$emit("update:selected", value);
    },
  },
  methods: {
    selectAllHandler() {
      if (this.selected.length !== this.tableData.content.length) {
        this.innerSelected = this.tableData.content;
      } else {
        this.innerSelected = [];
      }
    },
    pageHandler(index) {
      this.selectedPage = index;
    },
    clickOnTr(content) {
      console.log("TableComponent: clickOnTr");
      if (this.selectArea === "all") {
        if (this.selection === "single") {
          this.$emit("update:selected", content);
        }
        if (this.selection === "multiple") {
          let selectedList = [...this.innerSelected];
          let existedIndex = this.innerSelected.findIndex(
            item => item[this.selectionRefer] === content[this.selectionRefer]
          );
          if (existedIndex >= 0) {
            console.log(existedIndex);
            selectedList.splice(existedIndex, 1);
          } else {
            selectedList.push(content);
          }
          this.$emit("update:selected", selectedList);
        }
      }
    },
    selectAll() {
      console.log(this.tableData.content.length, this.selected.length);
      this.$emit(
        "update:selected",
        this.selected.length === this.tableData.content.length
          ? []
          : this.tableData.content
      );
    },
    updateSelected() {},
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-data {
  table-layout: fixed;
  width: 100%;
  overflow: auto;
  table {
    width: 100%;

    tr {
      position: relative;
      th,
      td {
        position: relative;
        padding: 0.5em;
        // cursor: pointer;
        background-color: #fff;
        padding: 7px 16px;
        font-size: 14px;
        border-bottom: 1px solid #e7e7e8;
        &.selection {
          width: 24px;
        }
      }
      th {
        text-align: left;
        background-color: #f1f2f3;
        color: #797c80;
        font-size: 12px;
        height: 56px;
      }
      td {
        height: 44px;
      }
      //tr hover
      &:hover {
        td {
          position: relative;
          // background-color:#eeeeee
          background-color: #eefffd;
        }
      }
    }
  }

  .pager {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    li {
      font-size: 12px;
      margin: 0 4px;
      border: 1px solid #00b0d0;
      color: #00b0d0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      cursor: pointer;
      &.active {
        background-color: #00b0d0;
        color: #fff;
      }
    }
  }
  &.mini {
    tr {
      th {
        height: 36px;
      }
      td {
        height: 16px;
      }
    }
  }
}
</style>
