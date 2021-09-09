<template>
  <div class="example-selector example-selector-component">
    <CustomSelectComponent
      :list="optionList"
      v-model:selected="selected"
      :placeholder="'Please select an example'"
      @change="updateSelected"
    />
    <input type="text" />
    <pre
      v-html="codeColorize(JSON.stringify(selectedExampleList, null, '  '))"
    ></pre>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import PreComponent from "./PreComponent.vue";

export default {
  name: "ExampleListSelectorComponent",
  props: {
    codeName: {},
  },
  components: { PreComponent },
  data() {
    let that = this;
    return {
      selected: "",
      get test() {
        return "asd";
      },
      examples: {},
    };
  },
  watch: {
    optionList(list) {
      this.selected = list[0].value;
    },
    selected(value) {
      this.$store.commit("SET_DATA", { selectedExampleName: value });
    },
  },
  computed: {
    optionList() {
      let list = [];
      for (let key in this.dataX.codeExamples[this.codeName]) {
        list.push({ label: this.capitalize(key), value: key });
      }
      return list;
    },
  },
  methods: {
    updateSelected() {},
  },
  async mounted() {
    if (this.optionList) {
      this.selected = this.optionList[0].value;
    }
    if (this.dataX.selectedExampleName) {
      this.selected = this.dataX.selectedExampleName;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.example-selector {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  pre {
    overflow: auto;
  }
}
</style>
