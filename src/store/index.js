import { createStore } from "vuex";
let defaultState = () => ({
  dataX: {
    listExamples: {},
    codeExamples: {},
    selectedExample: "",
  },
});
export default createStore({
  state: defaultState(),
  mutations: {
    SET_DATA(state, payload) {
      for (let key in payload) {
        state.dataX[key] = payload[key];
      }
    },
  },
  actions: {},
  modules: {},
});
