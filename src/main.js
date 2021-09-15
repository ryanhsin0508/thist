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
import CodeIntroComponent from "@/components/CodeIntroComponent.vue";
import "@/assets/js/custom-prototypes.js";
import * as ttFn from "@/assets/js/custom-functions.js";
import "@/assets/js/thists.js";
import { _ } from "core-js";
const app = createApp(App);
app.config.globalProperties.axios = axios;
app.config.globalProperties.ttFn = ttFn;
for (let component in Common) {
  app.component(component, Common[component]);
}
app.mixin({
  components: { CodeIntroComponent },
  data() {
    return {
      windowInfo: {
        windowWidth: undefined,
        scrollTop: 0,
        componentOffsetTop: 0,
      },
    };
  },
  methods: {
    isRealFalse(data) {
      let isRealFalse = false;
      if (typeof data === "boolean") {
        return !data;
      }
      if (data === null) {
        return true;
      }
      if (typeof data === "object") {
        isRealFalse = Object.keys(data).length === 0;
      } else if (typeof data === "string") {
        isRealFalse = data === "";
      } else {
        isRealFalse = data === undefined || data === null || isNaN(data);
      }
      return isRealFalse;
    },
    isRealTrue(data) {
      return !this.isRealFalse(data);
    },
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
      if (!code) {
        return;
      }
      if (skip) {
        return code;
      }
      let a = `tt.find(familyList, (item, index, qq) => item.role === "Great granddaughter" && item - qq < 5, "ch1ildren", function(bbb){
        { var a = "QQQ" }
       return bbb
      }),`;
      let arr = a.withinIndexList("function", "}", true, 0, ["{", "}"]);
      arr.forEach(withinIndexList => {
        let startIndex = withinIndexList[0];
        let endIndex = withinIndexList[1];
        let withinString = a.substring(startIndex, endIndex, true, 0, [
          "(",
          ")",
        ]);
      });

      // return code;
      let operatorList = [
        ">=",
        "<=",
        "+",
        "=",
        "-",
        "*",
        "!",
        "/",
        ">",
        "<",
        "return",
        "if",
        "else",
        "&",
      ];
      let seperatorList = [":", ",", ".", "(", ")", "{", "}", "[", "]"];
      let reservedList = ["=>", "function", "var", "let"];
      let _seperatorList = [...seperatorList, ...operatorList, ...reservedList];
      let _code = code;
      let stringPartialList = _code.split(",");

      function renderStringColor(str, quote) {
        let matchedIndexList = str.allIndexOf(quote);
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
          if (!isClassName && _code[end + 1] !== ":") {
            _code = _code.insert(end + 1, `</&nbsp;span>&nbsp;`);
            _code = _code.insert(start, `&nbsp;<span class="code-string">`);
          }
        });
      }
      renderStringColor(_code, '"');
      renderStringColor(_code, "'");

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
      function renderFunctionArgColor() {
        let argList = [];
        function renderArgs(matchedIndexList) {
          matchedIndexList.forEach(withinIndexList => {
            let startIndex = withinIndexList[0];
            let endIndex = withinIndexList[1];
            let withinString = _code.substring(startIndex, endIndex);
            //get argList
            let arrowIndex =
              withinString.indexOf("=>") >= 0
                ? withinString.indexOf("=>")
                : withinString.indexOf("{");
            if (arrowIndex > 0) {
              let codeBeforeArrow = withinString.substring(0, arrowIndex);
              let argStr = codeBeforeArrow.replaceAll(/[\n ()=>]/g, "");
              argList = argStr.split(",");
            }
            let reversedArgList = argList.reverse();
            let argIndexList = [];
            reversedArgList.forEach(arg => {
              let findedStartIndexList = withinString
                .allIndexOf(arg, null, true)
                .reverse();
              findedStartIndexList.forEach((_startIndex, _index) => {
                argIndexList.push([_startIndex, _startIndex + arg.length]);
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
              _code = _code.insert(
                indexList[1] + startIndex,
                "</&nbsp;span>&nbsp;"
              );
              _code = _code.insert(
                indexList[0] + startIndex,
                '&nbsp;<span class="code-parameter">'
              );
            });
          });
        }
        //render defined args in arrow function
        let matchedIndexList = _code
          .withinIndexList(",", ",", true, null, ["(", ")"])
          .reverse();

        renderArgs(matchedIndexList);

        matchedIndexList = _code.withinIndexList("function", "}", true, 0, [
          "{",
          "}",
        ]);

        renderArgs(matchedIndexList);

        //render defined args in es5 function
      }
      renderFunctionArgColor(_code);

      function renderFunctionNameColor(str) {
        let matchedIndexList = _code.allIndexOf("(");
        matchedIndexList.reverse().forEach(matchedIndex => {
          let _endIndex = matchedIndex;
          let _startIndex = matchedIndex;
          let untilList = [" ", ..._seperatorList];
          while (!untilList.includes(_code[_startIndex - 1])) {
            _startIndex--;
          }
          while (_code[_startIndex] === " ") {
            _startIndex++;
          }
          let _withinString = _code.substring(_startIndex, _endIndex);
          if (
            reservedList.includes(_withinString) ||
            operatorList.includes(_withinString)
          ) {
            return;
          }
          _code = _code.insert(_endIndex, `</&nbsp;span>&nbsp;`);
          _code = _code.insert(
            _startIndex,
            `&nbsp;<span class="code-function">`
          );
        });
        return;
      }
      renderFunctionNameColor(_code);

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
            !isWithinStringByIndex(
              startIndex,
              'class="code-string"',
              "</&nbsp;span>&nbsp;"
            )
          ) {
            _code = _code.insert(endIndex, `</&nbsp;span>&nbsp;`);
            _code = _code.insert(
              startIndex,
              `&nbsp;<span class="code-number">`
            );
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
        _code = _code.insert(index + 1, `</&nbsp;span>&nbsp;`);
        _code = _code.insert(index, `&nbsp;<span class="code-seperator">`);
      });

      let reservedIndexList = [];
      let reservedData = {};
      reservedList.forEach(word => {
        let wordLen = word.length;
        reservedIndexList = _code.allIndexOf(word);
        reservedIndexList.reverse().forEach(index => {
          if (
            !isWithinStringByIndex(index, "<span class", "</&nbsp;span>&nbsp;")
          ) {
            _code = _code.insert(index + wordLen, `</&nbsp;span>&nbsp;`);
            _code = _code.insert(index, `&nbsp;<span class="code-reserved">`);
          }
        });
      });
      let operatorIndexList = [];
      operatorList.forEach(op => {
        let opLen = op.length;
        operatorIndexList = _code.allIndexOf(op);
        operatorIndexList.reverse().forEach(index => {
          let skip = false;
          if (op === "-") {
            if (
              _code.substring(index - 23, index) === `&nbsp;<span class="code`
            )
              return;
          }
          if (op === "=") {
            if (_code[index + 1] === ">") {
              skip = true;
            }
          }
          if (op === "&") {
            if (_code.substr(index, 6).includes("&nbsp") && !_code.substr(index, 6).includes("&&")) {
              return;
            }
          }
          if (op === "/") {
            // return
          }
          if (op === "return") {
            //
          }
          if (
            !skip &&
            !isWithinStringByIndex(
              index,
              "&nbsp;<span class",
              "</&nbsp;span>&nbsp;"
            ) &&
            !isWithinStringByIndex(index, "class", "code") &&
            !isWithinStringByIndex(
              index,
              "<span class",
              "</&nbsp;span>&nbsp;"
            ) &&
            _code.substring(index - 6, index) !== "&nbsp;" &&
            _code.substring(index, index + 6) !== ">&nbsp" &&
            _code.substring(index, index + 6) !== "/&nbsp"
          ) {
            _code = _code.insert(index + opLen, `</&nbsp;span>&nbsp;`);
            _code = _code.insert(index, `&nbsp;<span class="code-operator">`);
          }
        });
      });
      _code = _code.replaceAll("&nbsp;", "");
      return _code;
    },
    looseJsonParse(obj, codeName) {
      console.time(codeName);
      let a = Function('"use strict";return (' + obj + ")")();
      console.timeEnd(codeName);
      return a;
    },
    onWindowResize() {
      this.windowInfo.windowWidth = window.innerWidth;
    },
    onWindowScroll() {
      this.windowInfo.scrollTop = window.scrollY;
    },
  },
  computed: {
    ...mapState(["dataX"]),
    ...mapGetters(["selectedExampleList", "childrenKeyName"]),
    tt() {
      return tt;
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", this.onWindowResize);
    window.addEventListener("scroll", this.onWindowScroll);
    this.$nextTick(() => {
      if (this.$refs.component) {
        this.windowInfo.componentOffsetTop = this.$refs.component.offsetTop;
      }
    });
  },
  unmounted() {
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("scroll", this.onWindowScroll);
  },
});
app.use(store).use(router).mount("#app");
