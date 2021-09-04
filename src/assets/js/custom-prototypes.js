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
String.prototype.withinIndexList = function (startValue, endValue) {
  let str = this.toString();
  let list = [];
  let index = str.indexOf(startValue);
  return [str.indexOf(startValue), str.indexOf(endValue)];
};
