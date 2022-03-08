import { getImg } from "@src/utils";
import { Button, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Info = ({ display }) => {
  const { _dataFilter } = useSelector((state) => state.resManager);
  const { joinTeam } = useDispatch().team;

  const history = useHistory();

  return (
    <div
      style={{ position: "relative" }}
      className={display ? "" : "tab-not-visible"}
    >
      <img style={{ width: "100%" }} src={getImg(_dataFilter.avatar)} />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
          opacity: 0.6,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "27%",
          backgroundColor: "#eee",
          // opacity: 0.7,
          width: "46%",
          height: "46%",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <div
          style={{
            border: "1px solid ",
            height: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "50px 0",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: 24 }}>
            {_dataFilter.name}
          </div>
          <div style={{ fontSize: 18 }}>Địa chỉ: {_dataFilter.address}</div>
          <div style={{ fontSize: 16, color: "#ffc107" }}>
            {_dataFilter.numberStar}
            <i className="home-product-item__star--gold fas fa-star" />
          </div>
          <div style={{ fontSize: 16, color: "#198754" }}>
            {_dataFilter.numberComment} Lượt đánh giá
          </div>
          <div style={{ fontSize: 16, color: "#0d6efd" }}>
            {_dataFilter.numberLike || 0} Lượt ưa thích
          </div>
          <Button
            onClick={() => {
              joinTeam().then((res) => {
                if (res && res.code === 0) {
                  history.push("/fsocial/chat?id=" + res.data?.id);
                } else {
                  message.error(res.message);
                }
              });
            }}
            type="primary"
          >
            Vào nhóm đi ăn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
