import { createApp } from "vue";
import axios from "axios";
import { mapState } from "vuex";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/reset.css";
import "@/assets/scss/main.scss";
import "@fortawesome/fontawesome-pro/css/all.css";
import Common from "@/components/Common";
import CodeExamples from "@/components/CodeExamples";
import CodeIntroComponent from "@/components/CodeIntroComponent.vue";
import "@/assets/js/thist.js";
import "@/assets/js/custom-prototypes.js";
const app = createApp(App);
app.config.globalProperties.axios = axios;

for (let component in Common) {
  app.component(component, Common[component]);
}
for (let component in CodeExamples) {
  app.component(component, CodeExamples[component]);
}
app.mixin({
  components: { CodeIntroComponent },
  data() {
    return {
      windowWidth: undefined,
    };
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    createOptionsBy(list, labelKeyName, valueKeyName, renderFunction) {
      if (!list) {
        return [];
      }
      let optionList = [];
      list.forEach((item, index) => {
        let _item = {
          ...item,
          label: item[labelKeyName],
          value: item[valueKeyName],
        };
        if (renderFunction) {
          _item = {
            ..._item,
            ...renderFunction(item, index),
          };
        }
        optionList.push(_item);
      });
      return optionList;
    },
    codeColorize(code) {
      let operatorList = ["+", "=", "-", "*", "!", "/"];
      let seperatorList = [" ", ",", ".", "(", ")", ...operatorList];
      let jsFunctionList = ["=>"];
      let _code = code;
      let stringPartialList = _code.split(",");
      let functionPartialList = stringPartialList.filter(val =>
        val.includes("=>")
      );
      // console.log(functionPartialList)
      jsFunctionList.forEach(value => {
        _code = _code.replaceAll(
          value,
          `<span class="code-js-function">${value}</span>`
        );
      });

      //render function name color
      let funcNameEndList = _code.allIndexOf("(");
      funcNameEndList.forEach(endIndex => {
        let _index = endIndex;
        let startIndex = -1;
        while (startIndex === -1 && _index >= 0) {
          _index--;
          let char = _code.substr(_index, 1);
          if (seperatorList.includes(char)) {
            startIndex = _index;
          }
          if (_index === 0) {
            startIndex = 0;
          }
          console.log(_index);
        }
        let functionName = _code.substring(startIndex, endIndex + 1);
        _code = _code.replaceAll(
          functionName,
          `<span class="code-function-name">${functionName.substr(
            0,
            functionName.length - 1
          )}</span>${functionName.substr(functionName.length - 1)}`
        );
      });
      console.log(funcNameEndList);
      function renderFunctionColor(str) {
        let argumentsRange = [0, str.indexOf("=>")];
        let argsStr = str.substring(...argumentsRange).replaceAll(" ", "");
        let matchedIndexList = str.allWithinIndex(argsStr);
        let readyList = [];
        matchedIndexList.forEach(withinIndexList => {
          let nextChar = str.substring(
            withinIndexList[1],
            withinIndexList[1] + 1
          );
          let isEndWithSeperator = seperatorList.includes(nextChar);
          if (isEndWithSeperator) {
            readyList.push(
              str.substring(withinIndexList[0], withinIndexList[1] + 1)
            );
          }
        });
        readyList.forEach(value => {
          let seperator = value.substr(value.length - 1);
          console.log(seperator);
          _code = _code.replaceAll(
            value,
            `<span class="code-parameter">${value.substr(
              0,
              value.length - 1
            )}</span>${value.substr(value.length - 1)}`
          );
        });
      }

      console.log(renderFunctionColor(functionPartialList[0]));
      function findAllIndex() {}

      function codeInsideDoubleQuote(str, indexList) {
        let _indexList = indexList ? indexList : [];
        let startIndex = str.indexOf('"');
        if (startIndex < 0) {
          return _indexList;
        }
        let endIndex = str.substr(startIndex + 1).indexOf('"') + startIndex + 2;
        _indexList.push(str.substring(startIndex, endIndex));
        if (endIndex < str.length) {
          _indexList = codeInsideDoubleQuote(
            str.substr(endIndex + 1),
            _indexList
          );
        }
        return _indexList;
      }
      codeInsideDoubleQuote(code).forEach(str => {
        _code = _code.replace(str, `<span class="code-string">${str}</span>`);
      });
      return _code;
    },
    looseJsonParse(obj) {
      return Function('"use strict";return (' + obj + ")")();
    },
    onWindowResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapState(["dataX"]),
    tt() {
      return tt;
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", this.onWindowResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.onWindowResize);
  },
});
app.use(store).use(router).mount("#app");
