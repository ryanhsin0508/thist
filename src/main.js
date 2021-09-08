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
      let operatorList = ["+", "=", "-", "*", "!", "/", "return", "if", "else"];
      let seperatorList = [":", ",", ".", "(", ")"];
      let _seperatorList = [...seperatorList, ...operatorList];
      let jsFunctionList = ["=>", "function"];
      let _code = code;
      let stringPartialList = _code.split(",");
      let functionPartialList = stringPartialList.filter(val =>
        val.includes("=>")
      );

      window.str2 = `tt.find(familyList, (item, index, qq) => aaa(item, index).bbb(item, index, qq).role === "Great granddaughter", "children")`;
      console.log("QQ");
      let b = str2.withinIndexList(
        "(",
        ")",
        true,
        null,
        ["(",")"]
      );
      console.log(b);
      b.forEach(withinIndexList => {
        let start = withinIndexList[0];
        let end = withinIndexList[1];
        let withinString = str2.substring(start, end);
        console.log(withinString);
      });
      // return _code;
      // console.log(functionPartialList)

      function renderArrowFunctionArgColor() {
        let argList = [];
        function renderArgs(matchedIndexList, definedArgList) {
          console.log(matchedIndexList)
          matchedIndexList.forEach(withinIndexList => {
            let startIndex = withinIndexList[0];
            let endIndex = withinIndexList[1];  
            let withinString = _code.substring(startIndex, endIndex);
            console.log(withinString);
            //get argList
            // withinString.withinIndexList("(")









            return 
            let argStr = withinString
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll(" ", "");

            argList = definedArgList
              ? definedArgList
              : argStr.split(",").reverse();
            argList.forEach(arg => {
              let _arg = arg.trim();
              let findedStartIndexList = withinString
                .allIndexOf(_arg)
                .reverse();
              findedStartIndexList.forEach(_startIndex => {
                let nextChar = withinString.nextChar(arg, " ");
                let __endIndex = _startIndex + _arg.length;
                
                if (nextChar === ".") {
                  _code = _code.insert(startIndex + __endIndex, "</span>");
                  _code = _code.insert(
                    startIndex + _startIndex,
                    '<span class="code-parameter">'
                  );
                }
              });
            });
            let withinParenthesesList = withinString
              .withinIndexList("(", ")", true)
              .reverse();
            withinParenthesesList.forEach(withinIndexList => {
              let _startIndex = withinIndexList[0] + startIndex;
              let _endIndex = withinIndexList[1] + startIndex;
              let _withinString = _code.substring(_startIndex, _endIndex);
              let _argList = _code
                .substring(_startIndex, _endIndex)
                .split(",")
                .reverse();
              _argList.forEach(arg => {
                let _arg = arg.trim();
                if (argList.includes(_arg)) {
                  let findedStartIndexList = _withinString
                    .allIndexOf(_arg)
                    .reverse();
                  findedStartIndexList.forEach(__startIndex => {
                    let __endIndex = __startIndex + _arg.length;
                    /* _code = _code.insert(_startIndex + __endIndex, "</span>");
                    _code = _code.insert(
                      _startIndex + __startIndex,
                      '<span class="code-parameter">'
                    ); */
                  });
                }
              });
            });
          });
        }
        //render defined args in arrow function
        let matchedIndexList = _code.withinIndexList(",", ",", true, null, ["(",")"]).reverse();
        renderArgs(matchedIndexList);
        //render defined args in es5 function
        // matchedIndexList = _code.withinIndexList("function", "{");
        // renderArgs(matchedIndexList);

        //render args inside arrow function
        /* matchedIndexList = _code.withinIndexList(
          "=>",
          ",",
          true,
          null,
          ["(",")"],
          true
        ); */
        // renderArgs(matchedIndexList, argList);
        // matchedIndexList = _code.withinIndexList("{", "}", true);
        matchedIndexList.forEach(withinIndexList => {
          // console.log(_code.substring(withinIndexList[0], withinIndexList[1]));
        });
        console.log();
        /* _matchedIndexList.forEach(withinIndexList => {
          let startIndex = withinIndexList[0];
          let endIndex = withinIndexList[1];
          let withinString = _code.substring(startIndex, endIndex);
          console.log(withinString);

          argList.forEach(arg => {
            let matchedIndexList = withinString.allIndexOf(arg).reverse();
            matchedIndexList.forEach(_startIndex => {
              //_startIndex === 0;
              let nextChar = withinString.nextChar(arg, " ");
              console.log(_startIndex);
              let _endIndex = _startIndex + startIndex + arg.length;
              if (nextChar === ".") {
                _code = _code.insert(_endIndex, "</span>");
                _code = _code.insert(
                  _startIndex + startIndex,
                  '<span class="code-parameter">'
                );
              }
            });
            console.log(matchedIndexList);
          });
          // within Parentheses
          return
          let withinParenthesesList = withinString
            .withinIndexList("(", ")", true)
            .reverse();
          withinParenthesesList.forEach(withinIndexList => {
            let _startIndex = withinIndexList[0] + startIndex;
            let _endIndex = withinIndexList[1] + startIndex;
            let _withinString = _code.substring(_startIndex, _endIndex);
            let _argList = _code
              .substring(_startIndex, _endIndex)
              .split(",")
              .reverse();
            _argList.forEach(arg => {
              let _arg = arg.trim();
              if (argList.includes(_arg)) {
                let findedStartIndexList = _withinString
                  .allIndexOf(_arg)
                  .reverse();
                findedStartIndexList.forEach(__startIndex => {
                  let __endIndex = __startIndex + _arg.length;
                  _code = _code.insert(_startIndex + __endIndex, "</span>");
                  _code = _code.insert(
                    _startIndex + __startIndex,
                    '<span class="code-parameter">'
                  );
                });
              }
            });
          });
          // console.log(withinString.substring())
        }) */
      }
      renderArrowFunctionArgColor(_code);
      function renderFunctionNameColor(str) {
        let matchedIndexList = _code.withinIndexList(".", "(", false).reverse();
        matchedIndexList.forEach(withinIndexList => {
          let start = withinIndexList[0];
          let end = withinIndexList[1];
          let isClassName =
            _code.substring(start - 6, end).indexOf('class="code') >= 0;
          if (!isClassName && _code.substring(end + 1, end + 2) !== ":") {
            _code = _code.insert(end, `</span>`);
            _code = _code.insert(start, `<span class="code-func-name">`);
          }
        });
      }
      // renderFunctionNameColor(_code); //OOO
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
      jsFunctionList.forEach(value => {
        _code = _code.replaceAll(
          value,
          `<span class="code-js-func">${value}</span>`
        );
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
