"use client"
import { useState } from "react";

interface WaitingRoomProps {
  joinChatRoom: (username: string, chatroom: string) => void;
}

const WaitingRoom = ({ joinChatRoom }: WaitingRoomProps) => {
  const [username, setUserName] = useState<string>("");
  const [chatroom, setChatRoom] = useState<string>("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        joinChatRoom(username, chatroom);
      }}
    >
      <ul>
        <li>
          <input
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            placeholder="ChatRoom"
            onChange={(e) => setChatRoom(e.target.value)}
          />
        </li>
        <li>
          <hr />
          <button type="submit"> Join</button>
        </li>
      </ul>
    </form>
  );
};

export default WaitingRoom;
