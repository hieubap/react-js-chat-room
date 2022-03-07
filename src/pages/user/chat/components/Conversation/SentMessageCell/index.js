import React from "react";
import { Avatar } from "antd";

const SentMessageCell = ({ conversation }) => {
  return (
    <div className="gx-chat-item gx-flex-row-reverse">
      <div className="gx-size-40 gx-align-self-end" style={{ width: 40 }}></div>
      <div className="gx-bubble-block">
        <div className="gx-bubble">
          <div className="gx-message">{conversation.content}</div>
          <div className="gx-time gx-text-muted gx-text-right gx-mt-2">
            {conversation.sentAt}
          </div>
        </div>
      </div>

      {/* <Avatar
        className="gx-size-40 gx-align-self-end"
        src="https://via.placeholder.com/150x150"
        alt={conversation.name}
      /> */}
    </div>
  );
};

export default SentMessageCell;
