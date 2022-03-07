import dataCache from "@src/utils/data-cache";
import { message } from "antd";
export default ({
  initState = {},
  customEffect = () => ({}),
  ignoreCache,

  // BẮT BUỘC
  fetchProvider, // phải là provider kết hợp từ base-provider
  storeName, // tên store
  title = "",
}) => ({
  state: {
    _listData: [],
    _totalElements: null,
    _page: 0,
    _size: 10,
    _dataEdit: {},
    _dataFilter: {},
    _dataSearch: {}, // chứa các param khi search api
    ...initState,
    ...(ignoreCache ? {} : dataCache.read(`_store_${storeName}`)),
  },
  reducers: {
    updateData(state, payload = {}) {
      if (!ignoreCache) {
        dataCache.save(`_store_${storeName}`, { ...state, ...payload });
      }

      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    // xem chi tiết bản ghi theo id
    _detail: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        fetchProvider
          ._detail(payload)
          .then((res) => {
            if (res && res.code === 0) {
              const {
                data: _dataFilter,
                totalElements: _totalElements,
                pageNumber: _page,
                pageSize: _size,
              } = res;

              dispatch[storeName].updateData({
                _dataFilter,
                _totalElements,
                _page,
                _size,
              });
              resolve(_dataFilter);
            }
          })
          .catch((err) => {
            message.error(err?.message?.toString());
            reject(err);
          });
      });
    },
    // lấy danh sách
    _getList: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        fetchProvider
          ._search(payload)
          .then((res) => {
            const {
              data: _listData,
              totalElements: _totalElements,
              message: _message,
              pageNumber: _page,
              pageSize: _size,
              numberOfElements,
            } = res;

            if (res.code === 0) {
              dispatch[storeName].updateData({
                _listData,
                _totalElements,
                _page,
                _size,
                _dataSearch: payload,
              });
            } else {
              message.error(_message);
            }

            resolve(res);
          })
          .catch((err) => {
            message.error(err?.message?.toString());
            reject(err);
          });
      });
    },
    _createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        if (state[storeName]?._dataEdit?.id || payload.id) {
          fetchProvider
            ._put(
              {
                ...payload,
                id: state[storeName]?._dataEdit?.id || payload.id,
              },
              state[storeName]?._dataEdit?.id || payload.id
            )
            .then((res) => {
              if (res && res.code === 0) {
                dispatch[storeName].updateData({
                  _dataEdit: {},
                });
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          fetchProvider
            ._post(payload)
            .then((res) => {
              if (res.code === 0) {
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    _onDelete: (payload, state) => {
      const { page, size } = state[storeName];
      return new Promise((resolve, reject) => {
        fetchProvider
          ._delete(payload)
          .then((res) => {
            if (res && res.code === 0) {
              message.success(`Xóa ${title} thành công`);
              dispatch[storeName]._getList({ page, size });
            } else {
              message.error(`Xóa ${title} không thành công`);
            }
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    ...customEffect({ dispatch }),
  }),
});
