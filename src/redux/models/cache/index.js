import dataCache from "utils/data-cache";

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
