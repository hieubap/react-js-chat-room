import { toast } from "react-toastify";
import dataCache from "@utils/data-cache";

export default ({
  // BẮT BUỘC
  fetchProvider, // phải là provider kết hợp từ base-provider
  storeName, // tên store
  title = "",

  initStore = {},
  ignoreCache,
  customEffect = () => ({}),
}) => ({
  state: {
    listData: [],
    totalElements: 0,
    params: { page: 0, size: 10 },
    ...initStore,
    ...(ignoreCache ? {} : dataCache.read(`_store_${storeName}`)),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    search: (payload = {}, state) => {
      const newParams = { ...state[storeName].params, ...payload };
      dispatch[storeName].updateData({
        params: newParams,
      });

      return new Promise((resolve, reject) => {
        fetchProvider
          .search(newParams)
          .then((res) => {
            if (res && res.code === 0 && res.data) {
              dispatch[storeName].updateData({
                listData: res.data,
                totalElements: res.totalElements,
              });
            }
            resolve(res);
          })
          .catch((e) => reject(e));
      });
    },
    // payload có id là put còn không thì là post
    save: (payload) => {
      const callApi = payload.id ? fetchProvider.put : fetchProvider.post;
      return new Promise((resolve, reject) => {
        callApi(payload, payload.id)
          .then((res) => {
            if (res && res.code === 0 && res.data) {
              dispatch[storeName].search();
            } else if (res && res.code === 401) {
              window.location.href = "/login";
            } else {
              toast.error(res.message);
            }
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    delete: (payload, state) => {
      return new Promise((resolve, reject) => {
        fetchProvider
          .delete(payload)
          .then((res) => {
            if (res && res.code === 0) {
              dispatch[storeName].search();
            } else if (res && res.code === 401) {
              window.location.href = "/login";
            } else {
              toast.error(res.message);
            }
            resolve(res);
          })
          .catch((e) => reject(e));
      });
    },
    ...customEffect({ dispatch }),
  }),
});
