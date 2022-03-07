import React from "react";
import { useSelector } from "react-redux";

import ReceivedMessage from "./ReceivedMessageCell";

import SentMessageCell from "./SentMessageCell";

const Conversation = ({ conversationData, selectedUser }) => {
  const { auth } = useSelector((state) => state.auth);

  return (
    <div className="gx-chat-main-content" id="id-content-chat-message">
      {conversationData.map((conversation, index) =>
        conversation.idUser === auth?.userId ? (
          <SentMessageCell key={index} conversation={conversation} />
        ) : (
          <ReceivedMessage
            key={index}
            conversation={conversation}
            user={selectedUser}
          />
        )
      )}
    </div>
  );
};

export default Conversation;
