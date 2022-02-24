export default [
  {
    title: "find",
    desc: "Returns first finded item in nested list",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "callback",
        type: "Function",
        desc: "Object in list that matches condition",
      },
      {
        argument: "childrenKeyName",
        type: "String or Array",
        desc: "Indicate where next level's list is under.",
      },
      {
        argument: "findDeep",
        type: "Boolean",
        desc: "Set true if find condition is under array of the item",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Get first finded child whose age is under 35",
          code: `tt.find(
  $exampleList,
  item => item.age < 35,
  'children'
)`,
        },
        {
          desc: "Get first finded child whose age is under 5 and father is Peter",
          code: `tt.find(
  $exampleList, 
  (item, index, list, parent) => {
    return (
      item.age < 5 && 
      parent.name === 'Peter'
    )
  },
  'children'
)`,
        },
      ],
      productLine: [
        {
          desc: "Get Urban24's data",
          code: `tt.find(
  $exampleList,
  item => item.name === 'Urban24',
  'subBusinessList'
)`,
        },
        {
          desc: "Find business that eggs' count is below 150",
          code: `tt.find(
  $exampleList, 
  item => item.inventory.find(
    _item => _item.productName === 'egg' && 
    _item.count < 150
  ), 
  'subBusinessList'
)`,
        },
        {
          desc: `Or if you don't know the item you want to find is under "inventory", you can use "findDeep" option.`,
          code: `tt.find(
  $exampleList, 
  item => item.productName === 'egg' &&
  item.count < 150, 
  'subBusinessList',
  true
)`,
        },
      ],
    },
  },
  {
    title: "filter",
    desc: "Returns a array that includes all finded items",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "callback",
        type: "Function",
        desc: "Object in list that matches condition",
      },
      {
        argument: "childrenKeyName",
        type: "String or Array",
        desc: "Indicate which array in the list you want to deep search. If not given, it will search whole existed array in the list, which may cause performance issue",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Get all of members whose ages are under 30",
          code: `tt.filter(
  $exampleList,
  item => item.age < 30,
  'children'
)
`,
          note: {
            desc: "From this part, we don't know the relative relationships from the result. For further usage, please reference",
            ref: "renderItems",
          },
        },
        {
          desc: "Get member who has more than 2 siblings",
          code: `tt.filter($exampleList,
  (item, index, list) => {
    return list.length > 2
  },
  'children'
)
  `,
        },
      ],
      productLine: [
        {
          desc: "Get All Dealers' Data",
          code: `tt.filter(
  $exampleList,
  item => item.role === 'dealer',
  'subBusinessList' 
)`,
        },
        {
          desc: `Filter "stores" that milks' count is below 500`,
          code: `tt.filter(
  $exampleList, 
  (item, index, list, parent) => 
  item.productName === 'milk' &&
  item.count < 500 &&
  parent.role === 'store',
  'subBusinessList',
  true
)`,
        },
      ],
    },
  },
  {
    title: "totalLevel",
    desc: "Get total level of nested list",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "childrenKeyName",
        type: "String",
        desc: "Indicate where next level's list is under.",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "",
          code: `tt.totalLevel(
  $exampleList,
  'children'
)`,
        },
      ],
      productLine: [
        {
          desc: `Get total level of nested list`,
          code: `tt.totalLevel(
  $exampleList,
  'subBusinessList'
)`,
        },
      ],
    },
  },
  {
    title: "length",
    desc: "Get all nested list length",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "childrenKeyName",
        type: "String",
        desc: "Indicate where next level's list is under.",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "",
          code: `tt.length(
  $exampleList,
  'children'
)`,
        },
      ],
      productLine: [
        {
          desc: `Get all nested list length`,
          code: `tt.length(
  $exampleList,
  'subBusinessList'
)`,
        },
      ],
    },
  },
  {
    title: "getValueListByKey",
    desc: "Get all values by designated key",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "keyName",
        type: "String",
        desc: "Designated key you want to get.",
      },
      {
        argument: "childrenKeyName",
        type: "String",
        desc: "Indicate where next level's list is under.",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Get all family members' name",
          code: `tt.getValueListByKey(
  $exampleList,
  'name',
  'children'
)`,
        },
      ],
      productLine: [
        {
          desc: `Get all nested list length`,
          code: `tt.length(
  $exampleList,
  'subBusinessList'
)`,
        },
      ],
    },
  },
  {
    title: "flatten",
    desc: "Flatten children array",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "childrenKeyName",
        type: "String",
        desc: "Indicate where next level's list is under.",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Flatten the list",
          code: `tt.flatten(
  $exampleList,
  'children'
)`,
        },
      ],
      productLine: [
        {
          desc: `Flatten the list`,
          code: `tt.flatten(
  $exampleList,
  'subBusinessList'
)`,
        },
      ],
    },
  },
  {
    title: "renderItems",
    desc: "Add / Adjust / Compute items in object",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "The list to process",
      },
      {
        argument: "childrenKeyName",
        type: "String",
        desc: "Indicate where next level's list is under.",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Add children count to each data",
          code: `tt.renderListItem(
  $exampleList,
  item => {
    item.childrenCount = 
      item.children && 
      item.children.length
    return item
  },
  'children'
)`,
        },
        {
          desc: "Add clarified parent info (familyLine) to each data",
          code: `tt.renderListItem(
  $exampleList,
  (item, index, list, parent) => {
    item.parentName = parent && parent.name
    if (parent) {
      item.familyLine = 
        parent.familyLine + 
        " > " + 
        item.name
    } else {
      item.familyLine = item.name
    }
    return item
  },
  "children"
)`,
        },
      ],
      productLine: [
        {
          desc: `Get all nested list length`,
          code: `tt.length(
  $exampleList,
  'subBusinessList'
)`,
        },
      ],
    },
  },
];
