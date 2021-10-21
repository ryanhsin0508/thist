import { createStore } from "vuex";
import axios from "axios";

let defaultState = () => ({
  dataX: {
    listExamples: {},
    codeExamples: {},
    selectedCodeName: "",
    selectedExampleType: "",
    codeData: {},
    isShowSidebar:false
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
    selectedExampleList: state =>
      state.dataX.selectedExampleType
        ? state.dataX.listExamples[state.dataX.selectedExampleType].list
        : [],
    childrenKeyName: state => {
      let keyName = ""
      if(state.dataX.selectedExampleType === 'family'){
        keyName = 'children'
      }
      if(state.dataX.selectedExampleType === 'business'){
        keyName = 'subBusinessList'
      }
      return keyName
    },
  },
  actions: {
    async getExamples() {
      let res = await axios.get("/examples.json");
      console.log(res.data);
      return res;
    },
    async getCodeData({ state, commit }, codeName) {
      let res = await axios.get(`/code/${codeName}.json`);
      return res;
    },
  },
  modules: {},
});
