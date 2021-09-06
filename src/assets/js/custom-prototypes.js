Array.prototype.bubbleSort = function () {
  let arr = this;
  let toIndex = arr.length;

  while (toIndex > 1) {
    toIndex--;
    for (let i = 0; i < toIndex; i++) {
      // 如果前面的元素比後面的元素要大，則交換元素位置
      if (arr[i] > arr[i + 1]) {
        let tempValue = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tempValue;
      }
    }
  }
  return arr;
};
String.prototype.allIndexOf = function (findValue, withStr) {
  let str = this.toString();
  let list = [];
  let index = str.indexOf(findValue);
  while (index >= 0) {
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
  let list = [];
  let startIndexList = str.allIndexOf(startStr);
  startIndexList.forEach(startIndex => {
    let endIndex = str.indexOf(endStr, startIndex);
    let findedStr = str.substring(startIndex + 1, endIndex);
    let startLen = findedStr.allIndexOf(startStr).length;
    let endLen = findedStr.allIndexOf(endStr).length;
    let done = startLen === endLen;
    let index = 0;
    if (startLen > endLen && isParentheses) {
      while (!done) {
        endIndex = str.indexOf(endStr, endIndex + 1);
        findedStr = str.substring(startIndex + 1, endIndex);
        let startLen = findedStr.allIndexOf(startStr).length;
        let endLen = findedStr.allIndexOf(endStr).length;
        if (startLen === endLen || endLen < 0) {
          done = true;
        }
      }
    }
    list.push(findedStr);
    // findedStr = str.substring(startIndex, endIndex + 1);
  });
  return list;
};
String.prototype.withinIndexList = function (
  startStr,
  endStr,
  isParentheses,
  offset,
  skipList
) {
  let str = this.toString();
  let _offset = offset ? offset : 0;
  let _skipList = skipList ? skipList : [];
  let startStrLen = startStr.length;
  let list = [];
  let startIndexList = str.allIndexOf(startStr, true);
  startIndexList.forEach(startIndex => {
    let endIndex = str.indexOf(endStr, startIndex);
    let findedStr = str.substring(startIndex, endIndex);
    let startLen = findedStr.allIndexOf(startStr).length;
    let endLen = findedStr.allIndexOf(endStr).length;
    let done = startLen === endLen;
    console.log(startIndex, endIndex);
    if (startLen > endLen && endIndex >= 0 && !done && isParentheses) {
      let index = 0;
      while (!done) {
        console.log(endIndex, findedStr, str);
        endIndex = str.indexOf(endStr, endIndex + 1);
        findedStr = str.substring(startIndex, endIndex);
        startLen = findedStr.allIndexOf(startStr).length;
        endLen = findedStr.allIndexOf(endStr).length;
        if (startLen === endLen || endIndex < 0) {
          done = true;
        }
        index++;
      }
    }
    if (endIndex > 0) {
      let _startIndex = startIndex;
      let _endIndex = endIndex;
      let text = str.substring(startIndex + _offset, endIndex + _offset);
      console.log(text);
      if (_skipList.length) {
        let index = 0;
        let findOutside = function (value, findLeft, fromIndex) {
          if (findLeft) {
            _startIndex =
              str.lastIndexOf(startStr, _startIndex - startStrLen - 1) +
              startStrLen;
            text = str.substring(_startIndex, startIndex);
            startIndex = _startIndex
          } else {
            _endIndex = str.indexOf(endStr, _endIndex + 1);
            text = str.substring(endIndex, _endIndex);
            endIndex = _endIndex;
          }
          if (text.includes(value)) {
            findOutside(value, findLeft);
          }
        };
        skipList.forEach((value, index) => {
          if (text.includes(value)) {
            findOutside(value, index === 0);
          }
        });
      }
      list.push([_startIndex + _offset, _endIndex + _offset]);
    }
    // findedStr = str.substring(startIndex, endIndex + 1);
  });
  return list;
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
