import { createApp } from "vue";
import axios from "axios";
import { mapGetters, mapState } from "vuex";

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
    colorize(code) {
      return code;
    },
    codeColorize(code, skip) {
      if (skip) {
        return code;
      }
      let operatorList = ["+", "=", "-", "*", "!", "/"];
      let seperatorList = [":", ",", ".", "(", ")"];
      let _seperatorList = [...seperatorList, ...operatorList];
      let jsFunctionList = ["=>"];
      let _code = code;
      let stringPartialList = _code.split(",");
      let functionPartialList = stringPartialList.filter(val =>
        val.includes("=>")
      );

      window.str2 = `tt.find(familyList, (item, index, qq) => aaa(item, index).bbb(item,index).role === "Great granddaughter", "children")`;
      let b = str2.withinIndexList("=>", ",", true, null, [null, "("]);
      console.log(b);
      b.forEach(withinIndexList => {
        let start = withinIndexList[0];
        let end = withinIndexList[1];
        let withinString = str2.substring(start, end);
        console.log(withinString);
      });
      return;
      // console.log(functionPartialList)

      /* jsFunctionList.forEach(value => {
        _code = _code.replaceAll(
          value,
          `<span class="code-js-function">${value}</span>`
        );
      }); */
      function renderFunctionNameColor(str) {
        let matchedIndexList = _code.withinIndexList(".", "(", false).reverse();
        matchedIndexList.forEach(withinIndexList => {
          let start = withinIndexList[0];
          let end = withinIndexList[1];
          let isClassName =
            _code.substring(start - 6, end).indexOf('class="code') >= 0;
          if (!isClassName && _code.substring(end + 1, end + 2) !== ":") {
            _code = _code.insert(end, `</span>`);
            _code = _code.insert(start, `<span class="code-function-name">`);
          }
        });
      }
      // renderFunctionNameColor(_code); //OOO
      function renderArrowFunctionArgColor() {
        let matchedIndexList = _code.withinIndexList(",", "=>", true, null, [
          ")",
          null,
        ]);
        let argList = [];
        matchedIndexList.forEach(withinIndexList => {
          let startIndex = withinIndexList[0];
          let endIndex = withinIndexList[1];
          let withinString = _code.substring(startIndex, endIndex);
          let argStr = withinString
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll(" ", "");

          argList = argStr.split(",");

          _code = _code.insert(endIndex, "</span>");
          _code = _code.insert(startIndex, '<span class="code-parameter">');
        });
        // console.log(matchedIndexList);
        let _matchedIndexList = _code.withinIndexList("=>", ",", true, null, [
          null,
          "(",
        ]);
        //render args inside arrow function
        _matchedIndexList.forEach(withinIndexList => {
          let startIndex = withinIndexList[0];
          let endIndex = withinIndexList[1];
          let withinString = _code.substring(startIndex, endIndex);
          console.log(withinString);
          let withinStartIndexList = withinString
            .withinIndexList("(", ")", true)
            .reverse();

          // within Parentheses
          withinStartIndexList.forEach(withinIndexList => {
            console.log(withinStartIndexList);
            let _startIndex = withinIndexList[0] + startIndex;
            let _endIndex = withinIndexList[1] + startIndex;
            console.log(_code.substring(_startIndex, _endIndex));
            let _argList = _code.substring(_startIndex, _endIndex).split(",");
            _argList.forEach(arg => {
              console.log(argList.includes(arg.trim()));
            });
          });
          // console.log(withinString.substring())
        });
      }
      renderArrowFunctionArgColor(_code);

      function renderFunctionArgColor(str) {
        let matchedIndexList = _code.withinIndexList("(", ")", true).reverse();
        matchedIndexList.forEach(withinIndexList => {
          let startIndex = withinIndexList[0];
          let endIndex = withinIndexList[1];
          // console.log(str.substring(startIndex,endIndex))
          let nextSeperatorIndex = -1;
          for (let i = endIndex; i < str.length; i++) {
            // console.log(i)
          }
        });
      }
      renderFunctionArgColor(_code);
      function renderNumericColor(str) {
        _seperatorList.forEach(seperator => {
          // let nextSpeprator =
        });
      }
      function renderStringColor(str) {
        let matchedIndexList = str.allIndexOf('"');
        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        let chunkedIndexList = chunk(matchedIndexList, 2).reverse();
        chunkedIndexList.forEach(withinIndexList => {
          let start = withinIndexList[0];
          let end = withinIndexList[1];
          let isClassName =
            _code.substring(start - 6, end).indexOf('class="code') >= 0;
          if (!isClassName && _code.substring(end + 1, end + 2) !== ":") {
            _code = _code.insert(end + 1, `</span>`);
            _code = _code.insert(start, `<span class="code-string">`);
          }
        });
      }
      renderStringColor(_code);

      let seperatorIndexList = [];
      seperatorList.forEach(key => {
        seperatorIndexList = seperatorIndexList
          .concat(_code.allIndexOf(key))
          .bubbleSort();
      });
      seperatorIndexList.reverse().forEach(index => {
        _code = _code.insert(index + 1, `</span>`);
        _code = _code.insert(index, `<span class="code-seperator">`);
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
    ...mapGetters(["selectedExampleList"]),
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
