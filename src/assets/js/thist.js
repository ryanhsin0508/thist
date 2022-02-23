import { _ } from "core-js";
import { checkType } from "./custom-functions.js";
class Thist {
  find(list, findFunction, childrenKeyName, isFindDeep) {
    let _childrenList = [];
    if (childrenKeyName) {
      _childrenList =
        typeof childrenKeyName === "string"
          ? [childrenKeyName]
          : childrenKeyName;
    }
    function find(list, parent, level) {
      let _match = undefined;
      let _childrenKeyName = _childrenList[level];
      let _parent = parent ? parent : {};
      list.forEach((item, index) => {
        if (!_match) {
          if (findFunction(item, index, list, _parent)) {
            _match = item;
          } else if (isFindDeep) {
            for (let key in item) {
              if (
                checkType(item[key]) === "array" &&
                item[key].length &&
                key !== _childrenKeyName
              ) {
                if (find(item[key], item, level)) {
                  _match = item;
                }
              }
            }
          }
          if (!_childrenKeyName) {
            for (let key in item) {
              if (
                checkType(item[key]) === "array" &&
                item[key].length &&
                key !== _childrenKeyName
              ) {
                let findedItem = find(item[key], item, level);
                if (findedItem) {
                  _match = findedItem;
                }
              }
            }
          } else {
            let hasChildren =
              item[_childrenKeyName] && item[_childrenKeyName].length;
            if (hasChildren) {
              _match = _match
                ? _match
                : find(item[_childrenKeyName], item, level);
            }
          }
          // let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
        }
      });
      return _match;
    }
    return find(list, null, 0);
  }
  filter(list, findFunction, childrenKeyName, isFindDeep) {
    let _childrenList =
      typeof childrenKeyName === "string" ? [childrenKeyName] : childrenKeyName;
    let _matchList = [];
    function find(list, parent, level, isDeep) {
      let _childrenKeyName = _childrenList[level];
      let _match = undefined;
      let _parent = parent ? parent : {};
      list.forEach((item, index) => {
        if (findFunction(item, index, list, _parent)) {
          let _item = { ...item };
          delete _item[childrenKeyName];
          _match = item;
          if (!isDeep) {
            _matchList.push(_item);
          }
        } else if (isFindDeep) {
          for (let key in item) {
            if (
              checkType(item[key]) === "array" &&
              item[key].length &&
              key !== _childrenKeyName
            ) {
              if (find(item[key], item, level, true)) {
                _matchList.push(item);
              }
            }
          }
        }
        let hasChildren =
          item[_childrenKeyName] && item[_childrenKeyName].length;
        if (hasChildren) {
          find(item[_childrenKeyName], item, level);
        }
        // let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
      });
      return _match;
    }
    find(list, null, 0);
    return _matchList;
  }

  totalLevel(list, nextListKeyName) {
    let totalLevel = 0;

    function checkLevel(list, level) {
      list.forEach(item => {
        totalLevel = totalLevel > level ? totalLevel : level;
        let hasNextList = item[nextListKeyName] && item[nextListKeyName].length;
        if (hasNextList) {
          checkLevel(item[nextListKeyName], level + 1);
        }
      });
    }
    checkLevel(list, 0);
    return totalLevel;
  }
  combineNestedListByIndexList(list, childrenKeyName, indexList) {
    let findedList = [];
    function findList(list, level) {
      list.forEach((item, index) => {
        let isMatchIndex = index === Number(indexList[level]);
        if (isMatchIndex) {
          findedList.push(_.omit(item, childrenKeyName));
        }
        let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
        if (hasChildren && indexList[level + 1] && isMatchIndex) {
          findList(item[childrenKeyName], level + 1);
        }
      });
    }
    findList(list, 0);

    let combinedList = this.regroupToNestedList(findedList, childrenKeyName);
    return combinedList;
  }
  createAllId(list) {
    let _list = JSON.parse(JSON.stringify(list));
    let index = 0;
    let __list = this.renderItems(_list, item => {
      item.nestedListId = index;
      index++;
      return item;
    });
    console.log(__list);
    return __list;
  }
  createThistId(list, childrenKeyName) {
    let _list = JSON.parse(JSON.stringify(list));
    function createId(list, parentIndex, modifier) {
      list.forEach((item, index) => {
        if (checkType(item) === "object") {
          for (let key in item) {
            let _modifier;
            if (key !== childrenKeyName) {
              _modifier = key;
            }
            let _index =
              parentIndex !== undefined
                ? parentIndex + "_" + index
                : index + "";
            _index = modifier ? `${parentIndex}_${modifier}_${index}` : _index;
            item.nestedListId = _index;
            if (checkType(item[key]) === "array" && item[key].length) {
              item[key] = createId(item[key], _index, _modifier);
            }
          }
        }
      });
      return list;
    }
    return createId(_list);
  }
  createId(list, childrenKeyName, parentIndex, modifier) {
    let _list =
      parentIndex !== undefined ? list : JSON.parse(JSON.stringify(list));
    _list.forEach((item, index) => {
      for (let key in item) {
        let _modifier = undefined;
        if (key !== childrenKeyName) {
          _modifier = key;
        }
        let _index =
          parentIndex !== undefined ? parentIndex + "_" + index : index + "";
        _index = modifier ? _index + `_${modifier}` : _index;
        item.nestedListId = _index;
        if (checkType(item[key]) === "array" && item[key].length) {
          item[key] = this.createId(
            item[key],
            childrenKeyName,
            _index,
            _modifier
          );
        }
      }
    });
    return _list;
  }
  renderItems(list, renderFunction) {
    let _list = list;
    _list.forEach((item, index) => {
      let _item = renderFunction(item, index, list, parent);
      for (let key in item) {
        if (checkType(item[key]) === "array" && item[key].length) {
          item[key] = this.renderItems(item[key], renderFunction);
        }
      }
    });
    return _list;
  }
  findNestedListItemWithParent(list, childrenKeyName, findKeyName, findValue) {
    let clonedList = _.cloneDeep(list);
    let _list = this.createId(clonedList, childrenKeyName);
    let findedItem = this.findItem(
      _list,
      findKeyName,
      findValue,
      childrenKeyName
    );
    if (!findedItem) {
      return;
    }
    let levelIndexList = findedItem.nestedListId.split("_");
    let nestedList = this.combineNestedListByIndexList(
      list,
      childrenKeyName,
      levelIndexList
    );
    return nestedList;
  }
  //flattenNestedList
  flatten(list, childrenKeyName, flattenList) {
    let flattenNestedList = [];
    this.renderListItem(
      list,
      item => {
        let _item = { ...item };
        // delete _item[childrenKeyName];
        flattenNestedList.push(_item);
        return _item;
      },
      childrenKeyName
    );
    this.renderListItem(flattenNestedList, item => {
      delete item[childrenKeyName];
    });
    return flattenNestedList;
  }
  //getAllNestedListLength
  length(list, childrenKeyName) {
    let length = 0;
    function sumList(list) {
      list.forEach(item => {
        length++;
        if (item[childrenKeyName] && item[childrenKeyName].length) {
          sumList(item[childrenKeyName]);
        }
      });
    }
    sumList(list);
    return length;
  }
  getMaxByKey(list, keyName, childrenKeyName, max) {
    let _max = max ? max : list[0][keyName];
    list.forEach(item => {
      if (item[keyName] > _max) {
        _max = item[keyName];
      }
      console.log(_max, max, item.name);
      if (this.hasChildren(item, childrenKeyName)) {
        _max = this.getMaxByKey(
          item[childrenKeyName],
          keyName,
          childrenKeyName,
          _max
        );
      }
    });
    return _max;
  }
  getMinByKey(list, keyName, childrenKeyName, min) {
    let _min = min ? min : list[0][keyName];
    list.forEach(item => {
      if (item[keyName] < _min) {
        _min = item[keyName];
      }
      console.log(_min, min, item.name);
      if (this.hasChildren(item, childrenKeyName)) {
        _min = this.getMinByKey(
          item[childrenKeyName],
          keyName,
          childrenKeyName,
          _min
        );
      }
    });
    return _min;
  }
  //getValueListByKey
  getValueListByKey(list, findKeyName, childrenKeyName, valueList) {
    let _valueList = valueList ? valueList : [];
    list.forEach(item => {
      if (item[findKeyName]) {
        _valueList.push(item[findKeyName]);
      }
      if (childrenKeyName && this.hasChildren(item, childrenKeyName)) {
        _valueList = this.getValueListByKey(
          item[childrenKeyName],
          findKeyName,
          childrenKeyName,
          _valueList
        );
      }
    });
    return _valueList;
  }
  hasKey(list, keyName, childrenKeyName) {
    let _boolean = false;
    list.forEach(item => {
      if (item[keyName]) {
        _boolean = true;
      } else if (this.hasChildren(item, childrenKeyName)) {
        _boolean = this.hasKey(item[childrenKeyName], keyName, childrenKeyName);
      }
    });
    return _boolean;
  }
  hasChildren(item, childrenKeyName) {
    return (
      childrenKeyName && item[childrenKeyName] && item[childrenKeyName].length
    );
  }
  getChildrenLength(list, childrenKeyName, containsGrandson, length) {
    let _length = length ? length : 0;
    list.forEach(item => {
      if (this.hasChildren(item, childrenKeyName)) {
        _length++;
        if (containsGrandson) {
          this.getChildrenLength(item[childrenKeyName], true, _length);
        }
      }
    });
    return _length;
  }
  getMatchedLength(list, findKeyName, findValue) {
    let length = 0;
    list.forEach(item => {
      if (item[findKeyName] == findValue) {
        length++;
      }
    });
    return length;
  }
  removeListItem(list, childrenKeyName, renderedList) {
    list.forEach((item, index) => {});
    return;
  }

  renderListItem(list, renderFunction, childrenKeyName) {
    let that = this;
    let level = -1;
    function renderList(list, parent) {
      level++;
      let renderedList = [];
      let _parent = parent ? parent : undefined;
      list.forEach((item, index) => {
        let _item = renderFunction(item, index, list, _parent);
        if (_item && _item[childrenKeyName]) {
          // delete _item[childrenKeyName];
        }
        renderedList.push(_item);
        if (childrenKeyName && that.hasChildren(_item, childrenKeyName)) {
          renderedList[renderedList.length - 1][childrenKeyName] = renderList(
            _item[childrenKeyName],
            _item
          );
        }
      });
      return renderedList;
    }
    return renderList(list);
  }
  regroupToNestedList(list, childrenKeyName) {
    let clonedList = _.cloneDeep(list);
    let itemIndex = 0;
    function regroupList(list) {
      let currentItem = list[itemIndex];
      let nextItem = list[itemIndex + 1];
      itemIndex++;
      if (nextItem) {
        currentItem[childrenKeyName] = regroupList(list);
      }
      return [currentItem];
    }
    let regroupedList = regroupList(clonedList);
    return regroupedList;
  }
  removeListChildren(list, childrenKeyName) {
    return this.renderListItem(list, item => {
      let _item = { ...item };
      delete _item[childrenKeyName];
      return _item;
    });
  }
  sortByList(list, refList, refKeyName) {
    let sortedList = [];
    this.renderListItem(refList, item => {
      if (list.includes(item[refKeyName])) {
        sortedList.push(item[refKeyName]);
      }
    });
    return sortedList;
  }
  sumByKeyList(list, keyList) {
    let total = 0;
    keyList.forEach(key => {
      if (list[key]) {
        total += list[key];
      }
    });
    return total;
  }
}
window.tt = new Thist();
export default tt;
