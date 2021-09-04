<template>
  <div class="example-selector example-selector-component">
    <CustomSelectComponent
      :list="optionList"
      v-model:selected="selected"
      :placeholder="'Please select an example'"
      @change="updateSelected"
    />
    <pre v-if="selected === 'family'">
<span class="code-js-function">var</span> <span class="code-var">familyList</span> <span class="code-operator">=</span> [
  {
    role: <span class="code-string">"Son"</span>,
    name: <span class="code-string">"Ryan"</span>,
    age: <span class="code-number">55</span>,
    children: [
      {
        role: <span class="code-string">"Grandson"</span>,
        name: <span class="code-string">"Peter"</span>,
        age: <span class="code-number">32</span>,
        children: [
          {
            role: <span class="code-string">"Great granddaughter"</span>,
            name: <span class="code-string">"Lisa"</span>,
            age: <span class="code-number">4</span>,
          },
          {
            role: <span class="code-string">"Great grandson"</span>,
            name: <span class="code-string">"Jack"</span>,
            age: <span class="code-number">2</span>,
          },
        ],
      },
      {
        role: <span class="code-string">"Granddaughter"</span>,
        name: <span class="code-string">"Jane"</span>,
        age: <span class="code-number">31</span>,
      },
    ],
  },
  {
    role: <span class="code-string">"Daughter"</span>,
    name: <span class="code-string">"Mary"</span>,
    age: <span class="code-number">53</span>,
    children: [
      {
        role: <span class="code-string">"Granddauhter"</span>,
        name: <span class="code-string">"Cindy"</span>,
        age: <span class="code-number">31</span>,
      },
    ],
  },
];
    </pre>
    <pre v-if="selected === 'business'">
<span class="code-js-function">var</span> businessList <span class="code-operator">=</span> [
  {
    name: <span class="code-string">"Happy Farm"</span>,
    role: <span class="code-string">"Headquarter"</span>,
    inventoryContent: [
      {
        productName: <span class="code-string">"milk"</span>,
        count: <span class="code-number">20000</span>,
      },
      {
        productName: <span class="code-string">"egg"</span>,
        count: <span class="code-number">100000</span>,
      },
    ],
    subBusinessList: [
      {
        name: <span class="code-string">"Healthy-Foods"</span>,
        role: <span class="code-string">"Dealer"</span>,
        inventoryContent: [
          {
            productName: <span class="code-string">"milk"</span>,
            count: <span class="code-number">300</span>,
          },
          {
            productName: <span class="code-string">"egg"</span>,
            count: <span class="code-number">10000</span>,
          },
        ],
        subBusinessList: [
          {
            name: <span class="code-string">"Twelve-Eight"</span>,
            role: <span class="code-string">"Store"</span>,
            inventoryContent: [
              {
                productName: <span class="code-string">"milk"</span>,
                count: <span class="code-number">50</span>,
              },
            ],
          },
          {
            name: <span class="code-string">"Nutritious Life"</span>,
            role: <span class="code-string">"Store"</span>,
            inventoryContent: [
              {
                productName: <span class="code-string">"milk"</span>,
                count: <span class="code-number">40</span>,
              },
              {
                productName: <span class="code-string">"egg"</span>,
                count: <span class="code-number">120</span>,
              },
            ],
          },
        ],
      },
      {
        name: <span class="code-string">"Daily Energy"</span>,
        role: <span class="code-string">"Dealer"</span>,
        inventoryContent: [
          {
            productName: <span class="code-string">"milk"</span>,
            count: <span class="code-number">900</span>,
          },
          {
            productName: <span class="code-string">"egg"</span>,
            count: <span class="code-number">20000</span>,
          },
        ],
        subBusinessList: [
          {
            name: <span class="code-string">"Twelve-Eight"</span>,
            role: <span class="code-string">"Store"</span>,
            inventoryContent: {
              productName: <span class="code-string">"egg"</span>,
              count: <span class="code-number">100</span>,
            },
          },
          {
            name: <span class="code-string">"Urban24"</span>,
            role: <span class="code-string">"Store"</span>,
            inventoryContent: [
              {
                productName: <span class="code-string">"egg"</span>,
                count: <span class="code-number">75</span>,
              },
              {
                productName: <span class="code-string">"egg"</span>,
                count: <span class="code-number">112</span>,
              },
            ],
          },
        ],
      },
    ],
  },
];
    </pre>
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
        console.log(that);
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
      console.log("asd");
      this.$store.commit("SET_DATA", { selectedExample: value });
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
    if (this.dataX.selectedExample) {
      this.selected = this.dataX.selectedExample;
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
