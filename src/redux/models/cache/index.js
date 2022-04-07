import dataCache from "@utils/data-cache";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  state: {
    historySearch: dataCache.read("history-search") || [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({}),
};
