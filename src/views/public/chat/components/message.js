import React, { useMemo } from "react";
import { connect } from "react-redux";
import { getImg } from "@utils/common";

const listEmoji = [
  "https://static.xx.fbcdn.net/images/emoji.php/v9/tf3/1.5/16/2764.png",
  "https://static.xx.fbcdn.net/images/emoji.php/v9/te7/1.5/32/1f606.png",
  "https://static.xx.fbcdn.net/images/emoji.php/v9/td4/1.5/32/1f62e.png",
  "https://static.xx.fbcdn.net/images/emoji.php/v9/t1f/1.5/32/1f620.png",
  "https://static.xx.fbcdn.net/images/emoji.php/v9/tf/1.5/32/1f44d.png",
];

const Message = ({
  data = {},
  front,
  end,
  numberLike = 2,
  auth,
  sendEmoji,
}) => {
  const emojiIcon = useMemo(() => {
    const setEmoji = new Set();
    for (let i = 0; i < data.listEmoji?.length; i++) {
      setEmoji.add(data.listEmoji[i].type);
      if (setEmoji.length > 2) break;
    }
    return Array.from(setEmoji);
  }, [data.listEmoji]);

  const listImage = data?.type === 2 ? JSON.parse(data.content) : [];

  return (
    <div
      className={`content-message-item ${
        front
          ? end
            ? "content-message-item-mid"
            : "content-message-item-front"
          : end
          ? "content-message-item-end"
          : ""
      } ${
        auth.userId === data.fromId
          ? "content-message-item-send"
          : "content-message-item-receive"
      } ${
        data?.listEmoji?.length && !data?.listLastSeen?.length
          ? "content-message-item-react"
          : ""
      }`}
    >
      {auth.userId !== data.fromId && (
        <div className="main-center-top-img">
          {!end && <img src={getImg(data?.avatar)} />}
        </div>
      )}

      <div className="wrapper-data">
        <div className={`user-name-send`}>
          {auth.userId !== data.fromId && !front && data.fullName}
        </div>
        {data?.type === 2 ? (
          <div className="list-image">
            {listImage.map((item, idx) => (
              <div key={idx} className="list-image-item">
                <img
                  onLoad={function (e) {
                    const { className, width, height } = e.target;
                    e.target.className = `${className} ${
                      width > height ? "auto-w" : "auto-h"
                    }`;
                  }}
                  src={getImg(item)}
                  className="content-message-item_image"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={`wrapper-data-content`}>
            {data.content}
            {data?.listEmoji?.length > 0 && (
              <div
                className={`react-message ${
                  auth.userId === data.fromId ? "react-message-send" : ""
                }`}
              >
                <div>
                  {emojiIcon?.map((i, j) => (
                    <img key={j} src={listEmoji[i - 1]} />
                  ))}
                </div>
                <div>{data?.listEmoji?.length}</div>
              </div>
            )}
            <div
              className={`react-message-option ${
                auth.userId == data.fromId && "react-message-option-send"
              }`}
            >
              {listEmoji.map((item, key) => (
                <div key={key} className="react-message-option-wrapper">
                  <img
                    className="react-message-option-status"
                    src={item}
                    onClick={() =>
                      sendEmoji({ type: key + 1, messageId: data.id })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`list-last-seen ${
            auth.userId === data.fromId && "list-last-seen-send"
          } ${data?.listLastSeen?.length > 0 ? "list-last-seen-like" : ""}`}
        >
          {data?.listLastSeen?.map((item, idx) => (
            <div key={idx} className="list-last-seen-item">
              <div className="list-last-seen-item-child">
                <img src={getImg(item?.account?.avatar)} />
              </div>
            </div>
          ))}
          {!!data?.listLastSeen?.length && (
            <div className="list-last-seen-item list-last-seen-item-content">
              Đã xem
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ auth: { auth } }) => ({ auth }),
  ({ socket: { sendEmoji } }) => ({ sendEmoji })
)(Message);
