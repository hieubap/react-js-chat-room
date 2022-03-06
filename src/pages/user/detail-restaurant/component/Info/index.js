import React from "react";
import { data } from "../../data";
import Product from "../product";

const Info = ({ display }) => {
  return (
    <div className={display ? "" : "tab-not-visible"}>
      <img />
    </div>
  );
};

Info.propTypes = {};

export default Info;
