import dataCache from "@src/utils/data-cache";

export default {
  state: {
    historySearch: dataCache.read("history-search") || [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    saveHistory: ({ value, isDelete }, state) => {
      const listHistory = [value, ...state.cache.historySearch];
      let newHistory = [];
      if (isDelete) {
        newHistory = listHistory.filter((item) => item != value);
      } else {
        const set = new Set();
        for (let i = 0; i < listHistory.length; i++) {
          set.add(listHistory[i]);
        }
        newHistory = Array.from(set).filter((item) => item != "");
      }

      dispatch.cache.updateData({
        historySearch: newHistory,
      });
      dataCache.save("history-search", newHistory);
    },
  }),
};
