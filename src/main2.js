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
import "@/assets/js/thists.js";
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
      let operatorList = [
        "+",
        "=",
        // "-",
        // "*",
        // "!",
        // "/",
        // ">",
        // "<",
        // "return",
        // "if",
        // "else",
      ];
      let seperatorList = [":", ",", ".", "(", ")"];
      let reservedList = ["=>", "function"];
      let _seperatorList = [...seperatorList, ...operatorList, ...reservedList];
      let _code = code;
      let stringPartialList = _code.split(",");
      let functionPartialList = stringPartialList.filter(val =>
        val.includes("=>")
      );

      window.str2 = `tt.find(familyList, (item, index, qq) => aaa(item, index).bbb(item, index, qq).role === "Great granddaughter", "children")`;
      console.log("QQ");
      let b = str2.withinIndexList("(", ")", true, null, ["(", ")"]);
      console.log(b);
      b.forEach(withinIndexList => {
        let start = withinIndexList[0];
        let end = withinIndexList[1];
        let withinString = str2.substring(start, end);
        console.log(withinString);
      });
      // return _code;
      // console.log(functionPartialList)
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

      function isWithinStringByIndex(index, startString, endString) {
        let withinStringList = _code.withinIndexList(
          startString,
          endString,
          true
        );
        let _boolean = false;
        withinStringList.forEach(indexList => {
          if (index >= indexList[0] && index <= indexList[1]) {
            _boolean = true;
          }
        });
        return _boolean;
      }
      function renderArrowFunctionArgColor() {
        let argList = [];
        function renderArgs(matchedIndexList, definedArgList) {
          matchedIndexList.forEach(withinIndexList => {
            let startIndex = withinIndexList[0] - 1;
            let endIndex = withinIndexList[1];
            let withinString = _code.substring(startIndex, endIndex);
            //get argList
            let argTextIndexList = withinString.withinIndexList(
              ",",
              "=>",
              true,
              startIndex,
              ["(", ")"],
              true
            );
            argTextIndexList.forEach(withinIndexList => {
              let startIndex = withinIndexList[0];
              let endIndex = withinIndexList[1];
              let _withinString = _code.substring(startIndex, endIndex);
              let argStr = _withinString.replaceAll(/[ ()=>]/g, "");
              argList = definedArgList ? definedArgList : argStr.split(",");
              console.log(argList);
            });
            let reversedArgList = argList.reverse();
            let argIndexList = [];
            reversedArgList.forEach(arg => {
              let findedStartIndexList = withinString.allIndexOf(arg).reverse();
              findedStartIndexList.forEach((_startIndex, _index) => {
                argIndexList.push([_startIndex, _startIndex + arg.length]);
                console.log(arg, findedStartIndexList);
                let __endIndex = _startIndex + arg.length;
                /* _code = _code.insert(startIndex + __endIndex, "</span>");
                _code = _code.insert(
                  startIndex + _startIndex,
                  '<span class="code-parameter">'
                ); */
              });
            });
            argIndexList = argIndexList.bubbleSortFromLastIndex();
            argIndexList.reverse().forEach(indexList => {
              console.log(indexList);
              _code = _code.insert(indexList[1] + startIndex, "</span>");
              _code = _code.insert(
                indexList[0] + startIndex,
                '<span class="code-parameter">'
              );
            });
          });
        }
        //render defined args in arrow function
        let matchedIndexList = _code
          .withinIndexList(",", ",", true, null, ["(", ")"])
          .reverse();
        renderArgs(matchedIndexList);
        //render defined args in es5 function
        matchedIndexList = _code.withinIndexList("function", "{");
        renderArgs(matchedIndexList);

        //render args inside arrow function
        matchedIndexList = _code.withinIndexList(
          "=>",
          ",",
          true,
          null,
          ["(", ")"],
          true
        );
        renderArgs(matchedIndexList, argList);
        // matchedIndexList = _code.withinIndexList("{", "}", true);
        matchedIndexList.forEach(withinIndexList => {
          // console.log(_code.substring(withinIndexList[0], withinIndexList[1]));
        });
      }
      renderArrowFunctionArgColor(_code);
      function renderFunctionNameColor(str) {
        let matchedIndexList = _code.allIndexOf("(");
        matchedIndexList.reverse().forEach(matchedIndex => {
          let _endIndex = matchedIndex;
          let _startIndex = matchedIndex;

          while (!_seperatorList.includes(_code[_startIndex - 1])) {
            _startIndex--;
          }
          while (_code[_startIndex] === " ") {
            _startIndex++;
          }
          let _withinString = _code.substring(_startIndex, _endIndex);
          if (reservedList.includes(_withinString)) {
            return;
          }
          _code = _code.insert(_endIndex, `</span>`);
          _code = _code.insert(_startIndex, `<span class="code-function">`);
        });
        return;
      }
      renderFunctionNameColor(_code); //OOO

      function renderNumericColor(str) {
        let regEx = /\d/g;
        let array;
        let numberIndexList = [];
        while ((array = regEx.exec(_code)) !== null) {
          numberIndexList.push(regEx.lastIndex - 1);
        }
        numberIndexList.reverse().forEach(startIndex => {
          if (_code[startIndex - 1].match(regEx)) {
            return;
          }
          let endIndex = startIndex;
          while (_code[endIndex].match(regEx)) {
            endIndex++;
          }
          if (
            !isWithinStringByIndex(startIndex, 'class="code-string"', "</span>")
          ) {
            _code = _code.insert(endIndex, `</span>`);
            _code = _code.insert(startIndex, `<span class="code-number">`);
          }
        });
      }
      renderNumericColor();

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

      let operatorIndexList = [];
      operatorList.forEach(op => {
        operatorIndexList = _code.allIndexOf(op);
        operatorIndexList.reverse().forEach(index => {
          let skip = false;
          if (op === "=") {
            if (_code[index + 1] === ">") {
              skip = true;
            }
          }
          if (
            !skip &&
            !isWithinStringByIndex(index, "<span class", "</span>") &&
            !isWithinStringByIndex(index, "class", "code")
          ) {
            console.log(op);

            _code = _code.insert(index + 1, `</span>`);
            _code = _code.insert(index, `<span class="code-operator">`);
          }
        });
      });
      let reservedIndexList = [];
      let reservedData = {};
      reservedList.forEach(word => {
        let wordLen = word.length;
        reservedIndexList = _code.allIndexOf(word);
        reservedIndexList.reverse().forEach(index => {
          if (!isWithinStringByIndex(index, "<span class", "</span>")) {
            _code = _code.insert(index + wordLen, `</span>`);
            _code = _code.insert(index, `<span class="code-reserved">`);
          }
        });
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
