import { message } from "antd";
export default {
  state: {
    listAdd: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    addProduct: (payload, state) => {
      dispatch.shop.updateData({
        listAdd: [{ ...payload, soLuong: 1 }, ...state.shop.listAdd],
      });
    },
    changeProduct: (payload, state) => {
      const newListAdd = Object.assign([], state.shop.listAdd);
      const index = newListAdd.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        newListAdd[index] = payload;
      }

      dispatch.shop.updateData({
        listAdd: newListAdd,
      });
    },
    deleteProduct: (payload, state) => {
      dispatch.shop.updateData({
        listAdd: state.shop.listAdd.filter((item) => item.id != payload),
      });
    },
    onCreate: (payload, state) => {
      dispatch.shop.updateData({
        listAdd: [],
      });
    },
  }),
};
