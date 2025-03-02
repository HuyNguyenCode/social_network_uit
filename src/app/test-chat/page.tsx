"use client";
import WaitingRoom from "@/components/waitingroom";
import ChatRoom from "@/components/chatroom";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";

const ChatTest = () => {
  const [conn, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<{ username: string; msg: string }[]>(
    []
  );

  const joinChatRoom = async (username: string, chatroom: string) => {
    try {
      const newConn = new HubConnectionBuilder()
        .withUrl("http://localhost:5120/chathub")
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect() // Tự động reconnect nếu mất kết nối
        .build();

      newConn.on("ReceiveSpecificMessage", (username, msg) => {
        console.log("Nhận tin nhắn từ server: ", username, msg);
        setMessages((prevMessages) => [...prevMessages, { username, msg }]);
      });

      await newConn.start();
      console.log("Kết nối SignalR thành công");

      await newConn.invoke("JoinSpecificChatRoom", {
        Username: username,
        ChatRoom: chatroom,
      });
      console.log(`Đã tham gia phòng: ${chatroom}`);
      setConnection(newConn);
    } catch (error) {
      console.error("Lỗi khi kết nối SignalR: ", error);
    }
  };

  // Cleanup connection khi component unmount
  useEffect(() => {
    return () => {
      if (conn) {
        conn.stop();
        console.log("Đã ngắt kết nối SignalR");
      }
    };
  }, [conn]);
  const sendMessage = async (messages: string) => {
    try {
      await conn?.invoke("SendMessage", messages);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <main>
        <ul>
          <li>
            <h1>Welcome to the chat app</h1>
          </li>
          <li>
            {!conn ? (
              <WaitingRoom joinChatRoom={joinChatRoom} />
            ) : (
              <ChatRoom messages={messages} sendMessage={sendMessage} />
            )}
          </li>
        </ul>
      </main>
    </div>
  );
};

export default ChatTest;
