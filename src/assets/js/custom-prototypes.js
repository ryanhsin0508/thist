Array.prototype.bubbleSort = function () {
  let arr = this;
  let toIndex = arr.length;

  while (toIndex > 1) {
    toIndex--;
    for (let i = 0; i < toIndex; i++) {
      if (arr[i] > arr[i + 1]) {
        let tempValue = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tempValue;
      }
    }
  }
  return arr;
};
Array.prototype.bubbleSortFromLastIndex = function () {
  let arr = this;
  let toIndex = arr.length;

  while (toIndex > 1) {
    toIndex--;
    for (let i = 0; i < toIndex; i++) {
      if (arr[i][arr[i].length - 1] > arr[i + 1][arr[i].length - 1]) {
        let tempValue = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tempValue;
      }
    }
  }
  return arr;
};
String.prototype.allIndexOf = function (findValue, withStr, override) {
  let str = this.toString();
  let list = [];
  let index = str.indexOf(findValue);

  while (override ? index > 0 : index >= 0) {
    list.push(withStr ? index + findValue.length : index);
    index = str.indexOf(findValue, index + 1);
  }
  return list;
};
String.prototype.within = function (start, end, isParentheses) {
  let str = this.toString();
  let startIndex = str.indexOf(start);
  let endIndex = str.indexOf(end);
  let findedStr = str.substring(startIndex + 1, endIndex);
  let len = str.allIndexOf(start).length - 1;
  if (!isParentheses) {
    return findedStr;
  }
  for (let i = 0; i < len; i++) {
    endIndex = str.indexOf(end, endIndex + 1);
  }
  findedStr = str.substring(startIndex, endIndex + 1);
  return endIndex >= 0 ? findedStr : "";
};
// tt.find(list, (item, index) => item.role() === "Great granddaughter", "children")
String.prototype.withins = function (startStr, endStr, isParentheses) {
  let str = this.toString();
  let startStrLen = startStr.length;
  let startIndex = str.indexOf(startStr);
  let endIndex = str.indexOf(endStr);
  let withinString = str.substring(startIndex, endIndex);
  return withinString;
};
String.prototype.withinIndexList = function (
  startStr,
  endStr,
  isParentheses,
  offset,
  skipList,
  trim
) {
  let str = this.toString();
  let _offset = offset ? offset : 0;
  let _skipList = skipList ? skipList : undefined;
  let startStrLen = startStr.length;
  let endStrLen = endStr.length;
  let list = [];
  let startIndexList = str.allIndexOf(startStr, true);
  startIndexList.forEach(startIndex => {
    let _startIndex = startIndex;
    let endIndex = str.indexOf(endStr, startIndex);
    if (_skipList && endIndex >= 0) {
      let noData = false;
      let withinWrap = false;
      let text = str.substring(startIndex, endIndex);
      let index = 0;

      while (
        index < 22 &&
        text.includes(skipList[1]) &&
        !text.includes(skipList[0])
      ) {
        return;
      }

      while (
        (index < 99 &&
          text.includes(skipList[0]) &&
          !text.includes(skipList[1])) ||
        (text.allIndexOf(skipList[0]).length - 1 >
          text.allIndexOf(skipList[1]).length &&
          !noData)
      ) {
        index++;
        endIndex = str.indexOf(endStr, endIndex + endStrLen);
        if (endIndex < 0) {
          console.log("ERR");
          noData = true;
        }
        text = str.substring(startIndex, endIndex);
      }
      if (
        text.includes(skipList[0]) &&
        text.includes(skipList[1]) &&
        text.indexOf(skipList[1]) < text.indexOf(skipList[0])
      ) {
        return;
      }
      list.forEach(indexList => {
        if (_startIndex > indexList[0] && _startIndex < indexList[1]) {
          withinWrap = true;
        }
        let a = indexList[0];
      });
      if (isParentheses) {
        if (!withinWrap) {
          list.push([_startIndex + _offset, endIndex + _offset]);
        }
        // list.push([_startIndex, endIndex]);
      } else {
        list.push([_startIndex + _offset, endIndex + _offset]);
      }
    } else if (endIndex > 0) {
      //no skipList
      if (isParentheses) {
        let text = str.substring(_startIndex, endIndex);
        if (trim) {
          let startChar = str[_startIndex];
          let endChar = str[endIndex - 1];
          while (startChar && startChar === " ") {
            _startIndex++;
            startChar = str[_startIndex];
          }
          while (endChar === " ") {
            endIndex--;
            endChar = [endIndex - 1];
          }
        }
        if (!text.includes(startStr)) {
          list.push([_startIndex + _offset, endIndex + _offset]);
        }
      } else {
        list.push([_startIndex + _offset, endIndex + _offset]);
      }
    }
  });
  return list;
};
String.prototype.nextChar = function (findValue, skip) {
  let str = this.toString();
  let len = findValue.length;
  let startList = str.allIndexOf(findValue);
  let nextChar = "";
  startList.forEach(startIndex => {
    let endIndex = startIndex + len;
    nextChar = str[endIndex];
    if (skip) {
      while (nextChar === skip) {
        endIndex++;
        nextChar = str[endIndex];
      }
    }
  });
  return nextChar;
};
String.prototype.allWithinIndex = function (findValue) {
  let str = this.toString();
  let len = findValue.length;
  let list = [];
  let index = str.indexOf(findValue);
  while (index >= 0) {
    list.push([index, index + findValue.length]);
    index = str.indexOf(findValue, index + 1);
  }
  return list;
};
String.prototype.insert = function (index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }

  return string + this;
};
