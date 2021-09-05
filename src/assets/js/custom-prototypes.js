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
String.prototype.allIndexOf = function (findValue) {
  let str = this.toString();
  let list = [];
  let index = str.indexOf(findValue);
  while (index >= 0) {
    list.push(index);
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
    console.log(startLen, endLen);
    console.log(str, startIndex, endIndex);
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
  console.log(list);
  return list;
};
String.prototype.withinIndexList = function (startStr, endStr, isParentheses) {
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
    console.log(endIndex);
    if (startLen > endLen && endIndex >= 0 && isParentheses) {
      let index = 0;
      while (!done) {
        console.log(endIndex, findedStr, str);
        endIndex = str.indexOf(endStr, endIndex + 1);
        findedStr = str.substring(startIndex + 1, endIndex);
        let startLen = findedStr.allIndexOf(startStr).length;
        let endLen = findedStr.allIndexOf(endStr).length;
        if (startLen === endLen || endIndex < 0) {
          done = true;
        }
        index++;
      }
    }
    if (endIndex > 0) {
      list.push([startIndex + 1, endIndex]);
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
