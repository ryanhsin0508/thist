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
        desc: "Indicate which array in the list you want to search. If not given, it will search whole existed array in the list, which may cause performance issue",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Get child whose age is under 35",
          code: "tt.find($exampleList, item => item.age < 30, 'children')",
        },
        {
          desc: "Get child whose age is under 5 and father is Peter",
          code: `tt.find($exampleList, 
  (item, index, list, parent) => {
    return parent.name === 'Peter'
  },
  'children'
)`,
        },
      ],
      business: [
        {
          desc: "Get Nutritious Life's data",
          code: "tt.find($exampleList, item => item.name === 'Nutritious Life', 'subBusinessList')",
        },
        {
          desc: "Find business that eggs' count is below 150",
          code: `tt.find(
  $exampleList, 
  item => item.productName === 'egg' && item.count < 150 , 
  ['subBusinessList', 'inventoryContent']
)`,
        },
      ],
    },
  },
  {
    title: "findItems",
    desc: "Returns a array that includes all finded items",
    note: "",
    argumentList: [
      {
        argument: "list",
        type: "Array",
        desc: "",
      },
      {
        argument: "callback",
        type: "Function",
        note: "Object in list that matches",
      },
      {
        argument: "childrenKeyName",
        type: "String or Array",
      },
    ],
    argumentNote: "",
    usages: {
      family: [
        {
          desc: "Get all of members whose age is under 30",
          code: `tt.findItems($exampleList, item => item.age < 30, 'children')
`,
          note: {
            desc: "From this part, we don't know relative relationships from the result. For further usage, please reference $ref",
            ref: "renderItems",
          },
        },
        {
          desc: "Get member who has sibling",
          code: `tt.findItems($exampleList,
  (item, index, list) => {
    return item.age < 35
  },
  'children'
)
  `,
        },
      ],
      business: [
        {
          desc: "Get Nutritious Life's data",
          code: "tt.find($exampleList, item => item.name === 'Nutritious Life', 'subBusinessList')",
        },
        {
          desc: "Find business that eggs' count is below 150",
          code: `tt.find(
  $exampleList, 
  item => item.productName === 'egg' && item.count < 150 , 
  ['subBusinessList', 'inventoryContent']
)`,
        },
      ],
    },
  },
];
