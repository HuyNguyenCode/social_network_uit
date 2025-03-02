import React from "react";
import MessageContainer from "@/components/MessageContainer";
import SendMessageForm from "@/components/SendMessageForm";
interface ChatRoomProps {
  messages: any[];
  sendMessage: (msg: string) => void;
}

const ChatRoom = ({ messages, sendMessage }: ChatRoomProps) => {
  return (
    <div>
      <ul>
        <li>ChatRoom</li>
        <li>
          <MessageContainer messages={messages}></MessageContainer>
        </li>
        <li>
          <SendMessageForm sendMessage={sendMessage}></SendMessageForm>
        </li>
      </ul>
    </div>
  );
};

export default ChatRoom;
