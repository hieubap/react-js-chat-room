import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const InputComment = (props, ref) => {
  const [state, _setState] = useState({ row: 1, value: "" });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    reset: () => setState({ value: "", row: 1 }),
  }));

  return (
    <textarea
      rows={state.row}
      value={state.value}
      placeholder="Viết bình luận..."
      onChange={(e) => {
        setState({
          value: e.target.value,
          row: e.target.value?.length / 40 + 1,
        });
      }}
    ></textarea>
  );
};

export default forwardRef(InputComment);
