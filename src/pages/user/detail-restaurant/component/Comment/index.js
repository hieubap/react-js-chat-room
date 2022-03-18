import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { getImg } from "@src/utils/common";
import reviewProvider from "@src/data-access/review-provider";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Comment = ({ display }) => {
  const [content, setContent] = useState("");
  const [numStar, setNumStart] = useState(5);

  const {
    review: { _getList: getListComment },
  } = useDispatch();

  const { idRes } = useSelector((state) => state.resManager);
  const { _listData } = useSelector((state) => state.review);
  const { userId } = useSelector((state) => state.auth?.auth);

  const onClick = () => {
    reviewProvider
      ._post({ idRes, content, numStar, idUser: userId })
      .then((res) => {
        if (res && res.code === 0) {
          setContent("");
          message.success("Viết đánh giá thành công");
          getListComment({ idRes, size: 999 });
        }
      });
  };

  return (
    <div className={display ? "" : "tab-not-visible"}>
      <div
        className="home-product"
        style={{
          padding: "5% 10%",
          position: "relative",
          minHeight: 600,
        }}
      >
        <img
          style={{
            width: "100%",
            height: 600,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          src={getImg()}
        />
        <div
          className="row sm-gutter"
          style={{
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "40%",
              backgroundColor: "#222",
              position: "relative",
            }}
          >
            <div
              style={{
                padding: 10,
                fontSize: 20,
                textAlign: "center",
                fontWeight: 500,
                color: "white",
              }}
            >
              Viết đánh giá
            </div>
            <Input.TextArea
              placeholder="Nhập nội dung đánh giá"
              value={content}
              onChange={(e) => setContent(e.target?.value)}
              rows={10}
            ></Input.TextArea>
            <div style={{ padding: 5 }}>
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <i
                  onClick={() => {
                    setNumStart(idx + 1);
                  }}
                  className="home-product-item__star--gold fas fa-star"
                  style={{
                    color: idx < numStar ? "var(--star-gold-color)" : "#ccc",
                    margin: "0 2px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                paddingTop: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" onClick={onClick}>
                Gửi đánh giá
              </Button>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              padding: "10px 20px",
              overflowY: "scroll",
              backgroundColor: "white",
              position: "relative",
              maxHeight: 400,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <i
                  className="home-product-item__star--gold fas fa-star"
                  style={{
                    margin: "0 2px",
                    fontSize: 30,
                  }}
                />
              ))}
            </div>

            {_listData?.map((item) => (
              <div style={{ padding: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ borderRadius: "50%", overflow: "hidden" }}>
                    <img style={{ width: 40, height: 40 }} src={getImg()} />
                  </div>
                  <div style={{ marginLeft: 10 }}>
                    <div style={{ fontWeight: "bold", color: "crimson" }}>
                      {item.userDTO?.name}
                    </div>
                    <div style={{ color: "dodgerblue" }}>
                      {moment(item.createdAt).format("DD/MM/YYYY HH:mm")}
                    </div>
                  </div>
                </div>
                <div style={{ paddingLeft: 50 }}>
                  <div>
                    <div style={{ padding: 5 }}>
                      {[1, 2, 3, 4, 5].map((_, idx) => (
                        <i
                          className="home-product-item__star--gold fas fa-star"
                          style={{
                            color:
                              idx < item.numStar
                                ? "var(--star-gold-color)"
                                : "#ccc",
                            margin: "0 2px",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
