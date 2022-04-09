import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const InputComment = (props, ref) => {
  const refText = useRef();
  const [state, _setState] = useState({ row: 1, value: "" });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    reset: () => setState({ value: "", row: 1 }),
  }));

  const autoGrow = () => {
    if (refText.current) {
      refText.current.style.height = "5px";
      refText.current.style.height = refText.current.scrollHeight - 2 + "px";
    }
  };

  return (
    <div className="textarea-comment">
      <textarea
        ref={refText}
        // rows={state.row}
        value={state.value}
        placeholder="Viết bình luận..."
        onInput={autoGrow}
        style={{ height: 14 }}
        onChange={(e) => {
          setState({
            value: e.target.value,
            row: e.target.value?.length / 40 + 1,
          });
        }}
      ></textarea>
    </div>
  );
};

export default forwardRef(InputComment);
