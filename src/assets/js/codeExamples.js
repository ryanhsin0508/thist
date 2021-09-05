export default {
  find: {
    family: {
      usageList: [
        {
          desc: "Get Great Granddaughter’s data",
          code: `tt.find($exampleList, (item, index) => item.role === "Great granddaughter", "children")`,
          result: `{
  role: "Great granddaughter",
  name: "Lisa",
  age: 4,
},
`,
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
