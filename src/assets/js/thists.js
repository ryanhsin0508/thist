class Thists {
  find(list, findFunction, childrenKeyName) {
    let match = undefined;
    list.forEach(item => {
      if (findFunction(item)) {
        match = item;
      } else if (!match && childrenKeyName) {
        let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
        if (hasChildren) {
          match = this.find(
            item[childrenKeyName],
            findFunction,
            childrenKeyName
          );
        }
      }
    });
    return match
  }
  findItem(list, findKeyName, findValue, childrenKeyName) {
    let match = undefined;
    list.forEach(item => {
      if (item[findKeyName] === findValue) {
        match = item;
      } else if (!match && childrenKeyName) {
        let hasChildren = item[childrenKeyName] && item[childrenKeyName].length;
        if (hasChildren) {
          match = this.findItem(
            item[childrenKeyName],
            findKeyName,
            findValue,
            childrenKeyName
          );
        }
      }
    });
    return match;
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
  createId(list, nextListKey, newList, parentItem) {
    let _newList = newList ? newList : [];
    list.forEach((item, index) => {
      let nextList =
        item[nextListKey] && item[nextListKey].length
          ? item[nextListKey]
          : false;
      let nestedListId = parentItem
        ? parentItem.nestedListId + "_" + index
        : index.toString();
      _newList[index] = {
        ...item,
        nestedListId,
      };
      if (nextList) {
        _newList[index][nextListKey] = this.createId(
          item[nextListKey],
          nextListKey,
          _newList[index][nextListKey],
          _newList[index]
        );
      }
    });
    return _newList;
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
      console.log(_max, max, item.name)
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
      console.log(_min, min, item.name)
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
          delete _item[childrenKeyName];
        }
        renderedList.push(_item);
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
