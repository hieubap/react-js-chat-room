import React from "react";

const CircularProgress = ({ className }) => (
  <div className={`loader ${className}`}>
    <img
      src={require("./loader.svg").default}
      alt="loader"
      style={{ height: 60 }}
    />
  </div>
);
export default CircularProgress;
CircularProgress.defaultProps = {
  className: "",
};
