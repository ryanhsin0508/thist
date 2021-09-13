<template>
  <div class="example-selector example-selector-component" ref="component">
    <CustomSelectComponent
      :list="optionList"
      v-model:selected="selected"
      :placeholder="'Please select an example'"
    />
    <input
      type="text"
      :value="JSON.stringify(selectedExampleList)"
      hidden
      ref="input"
    />

    <div class="json" v-if="false">
      <pre><code v-html="codeColorize(JSON.stringify(selectedExampleList, null, '  '))"></code></pre>
    </div>
    <div class="json">
      <NestedListComponent
        :indent="18"
        :list="selectedExampleList"
        :nextListKey="childrenKeyName"
        :isShowControl="true"
      />
    </div>
    <button class="button flat no-border" @click="copyText">Copy Array</button>
    <transition name="fade">
      <span class="popup-tip" v-if="showTip">Copied</span>
    </transition>
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
      showTip: false,
      componentOffsetTop: 0,
    };
  },
  watch: {
    "dataX.listExamples"() {},
    optionList(list) {
      if (!this.selected) {
        this.selected = list[0].value;
      }
    },
    selected(value) {
      this.$store.commit("SET_DATA", { selectedExampleType: value });
    },
  },
  computed: {
    optionList() {
      let list = [];
      for (let key in this.dataX.listExamples) {
        list.push({ label: this.capitalize(key), value: key });
      }
      return list;
    },
  },
  methods: {
    copyText() {
      this.showTip = true;

      var text = this.$refs.input;

      /* Select the text field */
      text.select();
      text.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(text.value);
      setTimeout(() => {
        this.showTip = false;
      }, 1000);
      /* Alert the copied text */
    },
  },
  async mounted() {
    if (this.isRealTrue(this.optionList) && !this.dataX.selectedExampleType) {
      this.selected = this.optionList[0].value;
    }
    if (this.dataX.selectedExampleType) {
      this.selected = this.dataX.selectedExampleType;
    }
    
    /* console.log(this.$store.state)
    let res = await this.$store.dispatch("getCodeData")
    console.log(res.data) */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.example-selector {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  .json {
    overflow: auto;
    margin-bottom: 20px;
  }
}
</style>
