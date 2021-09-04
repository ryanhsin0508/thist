export default {
  find: {
    family: {
      usageList: [
        {
          desc: "Get Great Granddaughter’s data",
          code: `tt.find($exampleList, item => item.role === "Great granddaughter", "children")`,
          result: `{
  role: "Great granddaughter",
  name: "Lisa",
  age: 4,
},
`,
        },
        {
          desc: "Get Jack's data",
          code: `tt.find($exampleList, item => item.name === "Jack", "children")`,
          result: `{
  role: "Great grandson",
  name: "Jack",
  age: 2,
}`,
        },
      ],
    },
    business: {
      usageList: [{
        desc: "Get Nutritious Life's data",
        code: `tt.find($exampleList, item => item.name === "Nutritious Life", "subBusinessList")`
      }],
    },
  },
};
