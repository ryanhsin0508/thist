import { _ } from "core-js";
import { checkType } from "./custom-functions.js";
class Thists {
  find(list, findFunction, childrenKeyName) {
    let _childrenKeyName =
      typeof childrenKeyName === "string" ? [childrenKeyName] : childrenKeyName;
    function find(list, parent) {
      let _match = undefined;
      let _parent = parent ? parent : {};
      list.forEach((item, index) => {
        if (!_match && findFunction(item, index, list, _parent)) {
          _match = item;
        } else if (!_match) {
          if (!childrenKeyName) {
            _childrenKeyName = [];
            for (let key in item) {
              if (checkType(item[key]) === "array" && item[key].length)
                _childrenKeyName.push(key);
            }
          }
          _childrenKeyName.forEach(_childrenKeyName => {
            let hasChildren =
              item[_childrenKeyName] && item[_childrenKeyName].length;
            if (hasChildren) {
              _match = _match ? _match : find(item[_childrenKeyName], item);
            }
          });
          // let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
        }
      });
      return _match;
    }
    return find(list);
  }
  findItems(list, findFunction, childrenKeyName, matchList) {
    let _matchList = matchList ? matchList : [];
    let _subList =
      typeof childrenKeyName === "string" ? [childrenKeyName] : childrenKeyName;
    list.forEach((item, index) => {
      if (findFunction(item, index, list)) {
        let _item = { ...item };
        delete _item[childrenKeyName];
        _matchList.push(_item);
      }
      let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
      if (hasChildren) {
        this.findItems(
          item[childrenKeyName],
          findFunction,
          childrenKeyName,
          _matchList
        );
      }
    });
    return _matchList;
  }

  totalLevel(list, nextListKeyName) {
    let totalLevel = 0;

    function checkLevel(list, level) {
      list.forEach(item => {
        let nextList = item[nextListKeyName] && item[nextListKeyName].length;
        if (nextList) {
          totalLevel = totalLevel > level + 1 ? totalLevel : level + 1;
          checkLevel(item[nextListKeyName], totalLevel);
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
  createId(list, childrenKeyName, parentIndex, modifier) {
    let _list =
      parentIndex !== undefined ? list : JSON.parse(JSON.stringify(list));
    _list.forEach((item, index) => {
      for (let key in item) {
        let _modifier;
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
      let _item = renderFunction(item, index);
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
  flattenNestedList(list, childrenKeyName, flattenList) {
    let flattenNestedList = [];
    this.renderListItem(
      list,
      item => {
        let _item = { ...item };
        delete _item[childrenKeyName];
        flattenNestedList.push(_item);
        return _item;
      },
      childrenKeyName
    );
    return flattenNestedList;
  }
  getAllNestedListLength(list, childrenKeyName) {
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
      if (this.hasChildren(item, childrenKeyName)) {
        _valueList = this.getValueListByKey(
          item[childrenKeyName],
          findKeyName,
          childrenKeyName,
          _valueList
        );
      }
    });
    return _valueList;
    // => ["Ryan", "Peter", "Lisa"]
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
  filter(list, childrenKeyName, filterFunc) {
    let _list = JSON.parse(JSON.stringify(list));
    let filteredList = _list.filter(item => filterFunc(item));
    _list.forEach((item, index) => {
      if (childrenKeyName && this.hasChildren(item, childrenKeyName)) {
        item[childrenKeyName] = this.filter(
          item[childrenKeyName],
          childrenKeyName,
          filterFunc
        );
      }
    });
    return filteredList;
  }
  renderListItem(list, renderFunction, childrenKeyName) {
    let that = this;
    let level = -1;
    function renderList(list) {
      level++;
      let renderedList = [];
      list.forEach(item => {
        let _item = renderFunction(item);
        if (_item && _item[childrenKeyName]) {
          // delete _item[childrenKeyName];
        }
        renderedList.push(_item);
        console.log(renderedList);
        if (childrenKeyName && that.hasChildren(item, childrenKeyName)) {
          renderedList[renderedList.length - 1][childrenKeyName] = renderList(
            item[childrenKeyName]
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
window.tt = new Thists();
export default tt;
