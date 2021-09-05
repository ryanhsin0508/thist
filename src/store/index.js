import { createStore } from "vuex";
let defaultState = () => ({
  dataX: {
    listExamples: {},
    codeExamples: {},
    selectedExampleName: "",
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
  getters: {
    selectedExampleList: state => {
      return state.dataX.selectedExampleName
        ? state.dataX.listExamples[state.dataX.selectedExampleName].list
        : [];
    },
  },
  actions: {},
  modules: {},
});
