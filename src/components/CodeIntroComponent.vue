<template>
  <div class="code-intro code-intro-component">
    <div class="code-title">
      <div class="code-name code code-function">{{ codeData.title }}</div>
      <p class="desc">{{ codeData.desc }}</p>
      <p class="note">{{ codeData.note }}</p>
    </div>
    <section class="arguments-intro">
      <div class="title">Arguments</div>
      <table>
        <tr>
          <th>Argument</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr
          v-for="(argData, index) in codeData.argumentList"
          :key="'argg' + index"
        >
          <td v-for="(data, key) in argData" :key="'arg' + index + key">
            <p :class="[key, { 'code-parameter': key === 'argument', 'code-reserved': key === 'type' }]">
              {{ data }}
            </p>
          </td>
        </tr>
      </table>
    </section>
    <section class="usage-intro" v-if="isRealTrue(codeData)">
      <div class="title">Usage</div>
      <div
        class="usage"
        v-for="(usg, index) in codeData.usages[dataX.selectedExampleType]"
        :key="'usage' + index"
      >
        <p class="desc">{{ usg.desc }}</p>
        <!-- <pre v-html="codeColorize(test)"></pre> -->
        <div class="code">
          <pre
            v-if="usg.code"
            v-html="
              codeColorize(
                usg.code.replace(
                  '$exampleList',
                  `${dataX.selectedExampleType}List`
                )
              )
            "
          ></pre>
          <div class="result" v-if="usg.code">
            <span style="margin-right: 1em">// => </span>
            <pre
              v-html="
                codeColorize(
                  JSON.stringify(
                    looseJsonParse(
                      usg.code.replace(
                        '$exampleList',
                        JSON.stringify(exampleList, null, '  ')
                      ),
                      codeData.title
                    ),
                    null,
                    '  '
                  ),
                  false
                )
              "
            ></pre>
          </div>
        </div>
        <p class="note" v-if="usg.note">{{usg.note.desc.replace("$ref", "")}}<a href="#">{{usg.note.ref}}</a></p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CodeIntroComponent",
  props: {
    codeName: {},
  },
  components: {},
  setup(props) {},
  data() {
    return {
      codeData: {},
      test: `tt.find(
  $exampleList, 
  item => item.productName === 'egg' && item.count < 150 , 
  ['subBusinessList', 'inventoryContent']
)`,
    };
  },
  watch: {},
  computed: {
    exampleList() {
      return this.dataX.listExamples[this.dataX.selectedExampleType].list;
    },
  },
  methods: {},

  async mounted() {
    console.log(this.dataX.codeExamples);
    this.codeData = this.dataX.codeExamples.find(
      code => code.title === this.codeName
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.desc{
  color: #ddd;
}
.code-title {
  background-color: #505050;
  position: sticky;
  top: -1px;
  margin-bottom: 1em;
  border-bottom: 1px solid #a7a7a7;
  .desc {
    letter-spacing: 1px;
  }
  p {
    padding-bottom: 0.25em;
  }
}
.arguments {
  li {
    display: flex;
    align-items: center;
    p {
      flex-shrink: 0;
      margin-right: 0.25em;
    }
  }
  .arg-name {
    width: 150px;
  }
  .type {
    width: 120px;
  }
  .note {
    // margin-left: 10px;
  }
}
.code-intro {
  font-size: 15px;
}
.code-function {
  font-size: 24px;
  margin-bottom: 0.25em;
}

.note {
  font-size: 13px;
  color: #ddd;
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
    margin-bottom: 0.5em;
    > pre {
      white-space: pre-wrap;
      font-size: 16px;
      padding: 4px 8px;
      background-color: #505050;
    }
  }
  .note{
    font-size: 12px;
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
  color: #ccc;
  padding: 8px;
  overflow: auto;
  pre {
  }
}
</style>
