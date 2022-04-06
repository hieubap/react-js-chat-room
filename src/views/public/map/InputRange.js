import { Input, Spin } from "antd";
import React, { useRef, useState } from "react";

const InputRange = ({ scope, onChange = () => {} }) => {
  const [state, _setState] = useState({ spinning: false });
  const refTimeout = useRef();

  const handleChange = (e) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
      _setState({ ...state, spinning: true });
    }
    refTimeout.current = setTimeout(() => {
      _setState({ ...state, spinning: false });
      onChange(e);
    }, 1000);
  };

  return (
    <div
      className="group-info input-scope"
      style={{
        bottom: 10,
        left: window.screen.width / 2 - 200,
        width: 300,
        display: scope ? "flex" : "none",
      }}
    >
      <div className="input">
        <Input
          type="number"
          //   ref={refInputRange}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Nhập bán kính (km)"
        />
      </div>

      <div style={{ lineHeight: 2 }}>
        <b>(Km)</b>
      </div>

      <div style={{ paddingTop: 7 }}>
        <Spin spinning={state.spinning} />
      </div>

      {/* className="btn-blue"
        onClick={() => {
          const e = refInputRange.current.input.value;
          setState({ range: parseFloat(e) });
        }}
      >
        Chọn
      </Loading> */}
    </div>
  );
};

export default InputRange;
