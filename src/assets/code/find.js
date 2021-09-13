export default {
  title: "find",
  desc: "Get first finded item in nested list",
  argumentList: [
    {
      label: "list",
      type: "Array",
    },
    {
      label: "function",
      type: "Function",
    },
    {
      label: "childrenKeyName",
      type: "String",
    },
  ],
  usages: {
    family: [
      {
        desc: "Get Great Granddaughter’s data",
        code: `tt.find($exampleList, (item, index) => item.role === "Great granddaughter", "children")`,
      },
    ],
    business: [
      {
        desc: "Get Nutritious Life's data",
        code: `tt.find($exampleList, item => item.name === "Nutritious Life", "subBusinessList")`,
      },
    ],
  },
};
