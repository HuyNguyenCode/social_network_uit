import React from "react";

interface Message {
  msg: string;
  username: string;
}

interface MessageContainerProps {
  messages: Message[];
}

const MessageContainer = ({ messages }: MessageContainerProps) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <table key={index}>
          <tr>
            <td>
              {msg.msg} - {msg.username}
            </td>
          </tr>
        </table>
      ))}
    </div>
  );
};

export default MessageContainer;
