<template>
  <div class="code-intro code-intro-component">
    <div class="code-title">
      <div class="code-name code code-function-name">{{ title }}</div>
      <p class="desc">{{ desc }}</p>
    </div>
    <section class="arguments-intro">
      <div class="title">Arguments</div>
      <ul class="arguments">
        <li v-for="(arg, index) in argumentList" :key="'arg' + index">
          <span class="code-parameter">{{ arg.label }}: </span
          ><span class="code-js-function">{{ arg.type }}</span>
        </li>
      </ul>
    </section>
    <section class="usage-intro">
      <div class="title">Usage</div>
      <div class="usage" v-for="(usg, index) in usageList" :key="'usg' + index">
        <p class="desc">{{ usg.desc }}</p>
        <div class="code">
          <div
            v-if="usg.code"
            v-html="
              codeColorize(
                usg.code.replace(
                  '$exampleList',
                  `${dataX.selectedExampleName}List`
                ),
                true
              )
            "
          ></div>
          <div class="test" v-html="codeColorize(test)"></div>
          

          <div class="result" v-if="usg.code">
            <span style="margin-right: 1em">// => </span>
            <pre
              >{{
                JSON.stringify(
                  looseJsonParse(
                    usg.code.replace(
                      "$exampleList",
                      JSON.stringify(exampleList, null, "  ")
                    )
                  ),
                  null,
                  "  "
                )
              }}
            </pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CodeIntroComponent",
  props: {
    title: {},
    desc: {},
    argumentList: {},
  },
  components: {},
  data() {
    return {
      test: `tt.find(familyList, (item, index, qq) => item.role === "Great granddaughter" && item - qq < 5, "ch1ildren", function(bbb){

        var a = "QQQ"
       return bbb
      })`,
    };
  },
  watch: {},
  computed: {
    exampleList() {
      return this.dataX.listExamples[this.dataX.selectedExampleName].list;
    },
    usageList() {
      return this.dataX.selectedExampleName
        ? this.dataX.codeExamples[this.title][this.dataX.selectedExampleName]
            .usageList
        : [];
    },
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.code-title {
  background-color: #505050;
  position: sticky;
  top: 0;
  margin-bottom: 1 em;
}
.code-intro {
  font-size: 15px;
}
.code-function-name {
  font-size: 24px;
  margin-bottom: 0.25em;
}
.desc {
  color: #ddd;
  letter-spacing: 1px;
  padding-bottom: 0.25em;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5em;
}
.usage {
  margin-bottom: 2em;
  > .code {
    border: 1px solid #a7a7a7;
    border-radius: 5px;
    padding: 5px 10px;
  }
}
section {
  margin-bottom: 1em;
}
li {
  margin-left: 10px;
}
.result {
  display: flex;
  font-size: 12px;
  margin-top: 1em;
  color: #ccc;
  pre {
    margin-top: 2px;
  }
}
</style>
