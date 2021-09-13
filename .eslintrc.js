module.exports = {
  root: true,
  env: {
    node: false,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-v-model-argument": 0,
    "vue/no-unused-components": 0,
    "vue/no-v-for-template-key": 0,
    "vue/no-multiple-template-root": 0,
    "no-undef": 0,
    "no-unused-vars": 0,
    "vue/no-unused-vars": 0,
    "no-useless-escape": 0,
    "no-unreachable": 0,
    "vue/no-parsing-error": 0,
    "vue/valid-v-for":0
  },
};
