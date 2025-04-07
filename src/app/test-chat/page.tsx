/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const users = [
  { id: "08dd62a5-c7f9-48af-8811-0528eb1f3e51", name: "admin" },
  { id: "08dd62a6-9600-4a0d-86ad-ba9d0fcbec8c", name: "ngntu1234" },
  { id: "08dd642f-3db6-43fa-8158-af34b0bd9d42", name: "ngntu10" },
];

const ChatPage = () => {
  const [conn, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<{ username: string; msg: string }[]>(
    []
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [currentUser] = useState(users[0]);

  const joinChat = async (senderId: string, receiverId: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44371/chathub")
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
      connection.on("ReceiveMessage", (sender: string, msg: string) => {
        const senderUser = users.find((u) => u.id === sender);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username:
              sender === senderId
                ? currentUser.name
                : senderUser?.name || "Unknown",
            msg,
          },
        ]);
      });

      connection.on("LoadMessages", (loadedMessages: any[]) => {
        const formattedMessages = loadedMessages.map((m) => {
          const senderUser = users.find((u) => u.id === m.senderId);
          return {
            username:
              m.senderId === senderId
                ? currentUser.name
                : senderUser?.name || "Unknown",
            msg: m.content,
          };
        });
        setMessages(formattedMessages);
      });

      await connection.start();
      const roomId = [senderId, receiverId].sort().join("-");
      await connection.invoke("JoinRoom", roomId, senderId, receiverId);
      setConnection(connection);
    } catch (error) {
      console.error("Error joining chat:", error);
    }
  };

  const sendMessage = async () => {
    if (conn && selectedUser && messageInput.trim() !== "") {
      const senderId = currentUser.id;
      const receiverId = selectedUser;
      const roomId = [senderId, receiverId].sort().join("-");

      await conn.invoke(
        "SendMessage",
        roomId,
        senderId,
        receiverId,
        messageInput
      );

      setMessageInput("");
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUser(userId);
    joinChat(currentUser.id, userId);
  };

  return (
    <div>
      <h2>Chat Application</h2>
      <p>
        Logged in as: <strong>{currentUser.name}</strong>
      </p>{" "}
      {/* Hiển thị user hiện tại */}
      {!selectedUser ? (
        <div>
          <h3>Select a user to chat with</h3>
          <ul>
            {users
              .filter((user) => user.id !== currentUser.id)
              .map((user) => (
                <li key={user.id} onClick={() => handleSelectUser(user.id)}>
                  {user.name}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>
            Chat between <strong>{currentUser.name}</strong> and{" "}
            <strong>{users.find((u) => u.id === selectedUser)?.name}</strong>
          </h3>
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              border: "1px solid #ccc",
            }}
          >
            {messages.map((message, index) => (
              <div key={index} style={{ padding: "5px", marginBottom: "10px" }}>
                <strong>{message.username}: </strong>
                {message.msg}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
