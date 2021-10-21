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
        :isShowDebug="false"
      />
    </div>
    <button class="button flat no-border" @click="copyText">Copy Data</button>
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
      componentTop: 0,
      offsetTop: 0,
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
      console.log("QQQW");
      this.$store.commit("SET_DATA", { selectedExampleType: value });
      localStorage.setItem("thistSelectedExample", value);
    },
    "windowInfo.scrollTop"(scrollTop) {
      let componentHeight = this.$refs.component.getBoundingClientRect().height;
      let distance = window.innerHeight / 2 - componentHeight / 2;
      let offsetY = this.offsetTop - distance;
      if (scrollTop - offsetY > 0) {
        // this.componentTop = scrollTop - offsetY + 30;
        //
      } else {
        // this.componentTop = 0;
      }
    },
  },
  computed: {
    optionList() {
      let list = [];
      for (let key in this.dataX.listExamples) {
        list.push({ label: this.dataX.listExamples[key].title, value: key });
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
    onMouseWheel(e) {
      console.log("QQQ");
    },
  },
  async mounted() {
    this.offsetTop = this.$refs.component.offsetTop;
    if (this.isRealTrue(this.optionList) && !this.dataX.selectedExampleType) {
      if (localStorage.getItem("thistSelectedExample")) {
        this.selected = localStorage.getItem("thistSelectedExample");
      } else {
        this.selected = this.optionList[0].value;
      }
    }
    if (this.dataX.selectedExampleType) {
      this.selected = this.dataX.selectedExampleType;
    }
    /* let thresholdArr = [];
    for (let i = 0; i < 100; i++) {
      thresholdArr.push(i / 100);
    }
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          console.log(entry.intersectionRatio);
        });
      },
      { root: null, rootMargin: "0px", threshold: thresholdArr }
    );
    observer.observe(this.$refs.component); */
    /* console.log(this.$store.state)
    let res = await this.$store.dispatch("getCodeData")
    console.log(res.data) */
  },
  beforeUnmount() {
    this.$refs.component.removeEventListener("onmousewheel", this.onMouseOver);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
